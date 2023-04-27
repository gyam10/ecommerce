import { Button, Col, Form, Row } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { getCategoryByType } from "../../../../services/category.service";
import { getLabelByType } from "../../../../services/label.service";
import { getUserByRole } from "../../../../services/user.service";
import Select from "react-select";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const ProductForm = ({ handleSubmit, defaultData }) => {
  let logged_in_user = JSON.parse(localStorage.getItem("auth_user"));

  let [all_cats, setAllCats] = useState();
  let [all_brands, setAllBrands] = useState();
  let [all_seller, setAllSellers] = useState();
  let [loading, setLoading] = useState(true);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    status: Yup.string().required("Status is required"),
  });
  const formik = useFormik({
    initialValues: defaultData,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (values.brands) {
        values.brands = values.brands.map((item) => item.value);
      }
      handleSubmit(values);
    },
  });

  const getAllCategories = async () => {
    try {
      let result = await getCategoryByType();
      setAllCats(result.result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(!loading);
    }
  };

  const getAllBrands = async () => {
    try {
      let response = await getLabelByType("brand");
      let brand = response.result.map((item) => {
        return {
          label: item.title,
          value: item._id,
        };
      });
      setAllBrands(brand);
    } catch (error) {
      console.error(error);
    }
  };

  const getAllSeller = async () => {
    try {
      let all_users = await getUserByRole("seller");
      setAllSellers(all_users.result);
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    getAllCategories();
    getAllBrands();
    getAllSeller();
  }, [defaultData]);

  useEffect(() => {
    if (defaultData.title) {
      let prod_data = defaultData;
      console.log("Type:", typeof defaultData.seller);
      if (typeof defaultData["category"] === "string") {
        prod_data.category = defaultData["category"];
      } else {
        prod_data.category = defaultData.category._id;
      }
      if (typeof defaultData["brand"] === "object") {
        let brand = defaultData.brand;
        if (brand.title) {
          brand = { label: brand.title, value: brand._id };
        }
        prod_data.brand = brand;
      }
      if (typeof defaultData["seller"] === "string") {
        prod_data.seller = defaultData["seller"];
      } else {
        prod_data.seller = defaultData.seller._id;
      }
      if (prod_data.images) {
        prod_data.image = prod_data.images;
      }
      formik.setValues(prod_data);
    }
  }, [defaultData, loading]);

  return (
    <>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="row mb-3" controlId="title">
          <Form.Label className="col-sm-3">Title:</Form.Label>
          <Col sm={9}>
            <Form.Control
              size="sm"
              type="text"
              placeholder="Enter a product title."
              name="title"
              required={true}
              value={formik.values.title}
              onChange={formik.handleChange}
            />
            {formik.errors.title && (
              <em className="text-danger">{formik.errors.title}</em>
            )}
          </Col>
        </Form.Group>

        <Form.Group className="row mb-3" controlId="description">
          <Form.Label className="col-sm-3">Description:</Form.Label>
          <Col sm={9}>
            <CKEditor
              editor={ClassicEditor}
              data={formik.values.description}
              name="description"
              onChange={(event, editor) => {
                const data = editor.getData();
                formik.setValues({
                  ...formik.values,
                  description: data,
                });
              }}
              onReady={(e) => {
                console.log("here");
              }}
              onError={(e) => {
                console.log("error", e);
              }}
            />

            {formik.errors.description && (
              <em className="text-danger">{formik.errors.description}</em>
            )}
          </Col>
        </Form.Group>

        <Form.Group className="row mb-3" controlId="category">
          <Form.Label className="col-sm-3">Category:</Form.Label>
          <Col sm={9}>
            <Form.Select
              name="category"
              required
              onChange={formik.handleChange}
              size={"sm"}
              value={formik.values.category}
            >
              <option>--Select Any One</option>
              {all_cats &&
                all_cats.map((item, key) => (
                  <option value={item._id} key={key}>
                    {item.title}
                  </option>
                ))}
            </Form.Select>
            {formik.errors.category && (
              <em className="text-danger">{formik.errors.category}</em>
            )}
          </Col>
        </Form.Group>

        <Form.Group className="row mb-3" controlId="brand">
          <Form.Label className="col-sm-3">Brand:</Form.Label>
          <Col sm={9}>
            <Select
              name="brand"
              options={all_brands}
              onChange={(e) => {
                formik.setValues({
                  ...formik.values,
                  brand: e,
                });
              }}
              size="sm"
              value={formik.values.brand}
            >
              <option>--Select Any One</option>
              {all_cats &&
                all_cats.map((item, key) => (
                  <option value={item._id} key={key}>
                    {item.title}
                  </option>
                ))}
              {/* <option value="active">Active</option>
              <option value="inactive">Inactive</option> */}
            </Select>
            {formik.errors.brand && (
              <em className="text-danger">{formik.errors.brand}</em>
            )}
          </Col>
        </Form.Group>

        <Form.Group className="row mb-3" controlId="seller">
          <Form.Label className="col-sm-3">Seller:</Form.Label>
          <Col sm={9}>
            <Form.Select
              name="seller"
              required
              onChange={formik.handleChange}
              size={"sm"}
              value={formik.values.seller}
            >
              <option>--Select Any One</option>
              {all_seller &&
                all_seller.map((item, key) => (
                  <option value={item._id} key={key}>
                    {item.name}
                  </option>
                ))}
              {/* <option value="active">Active</option>
              <option value="inactive">Inactive</option> */}
            </Form.Select>
            {formik.errors.seller && (
              <em className="text-danger">{formik.errors.seller}</em>
            )}
          </Col>
        </Form.Group>

        <Form.Group className="row mb-3" controlId="price">
          <Form.Label className="col-sm-3">Price:</Form.Label>
          <Col sm={9}>
            <Form.Control
              size="sm"
              type="number"
              placeholder="Enter  product price."
              name="price"
              required
              min={0}
              value={formik.values.price}
              onChange={formik.handleChange}
            />
            {formik.errors.price && (
              <em className="text-danger">{formik.errors.price}</em>
            )}
          </Col>
        </Form.Group>

        <Form.Group className="row mb-3" controlId="discount">
          <Form.Label className="col-sm-3">Discount(%):</Form.Label>
          <Col sm={9}>
            <Form.Control
              size="sm"
              type="number"
              placeholder="Enter  product discount."
              name="discount"
              required
              min={0}
              max={95}
              value={formik.values.discount}
              onChange={formik.handleChange}
            />
            {formik.errors.discount && (
              <em className="text-danger">{formik.errors.discount}</em>
            )}
          </Col>
        </Form.Group>

        {logged_in_user && logged_in_user.role.includes("admin") ? (
          <Form.Group className="row mb-3" controlId="status">
            <Form.Label className="col-sm-3">Status:</Form.Label>
            <Col sm={9}>
              <Form.Select
                name="status"
                required
                onChange={formik.handleChange}
                size={"sm"}
                value={formik.values.status}
              >
                <option>--Select Any One</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </Form.Select>
              {formik.errors.status && (
                <em className="text-danger">{formik.errors.status}</em>
              )}
            </Col>
          </Form.Group>
        ) : (
          <></>
        )}

        <Form.Group className="row mb-3" controlId="is_featured">
          <Form.Label className="col-sm-3">Featured:</Form.Label>
          <Col sm={9}>
            <Form.Check
              size="sm"
              type="checkbox"
              label="Is featured"
              name="is_featured"
              value={1}
              onChange={formik.handleChange}
              checked={formik.values.is_featured}
            />
          </Col>
        </Form.Group>

        <Form.Group controlId="formFileSm" className="row mb-3">
          <Form.Label className="col-sm-3">Images:</Form.Label>

          <div className="col-sm-3">
            <Form.Control
              type="file"
              size="sm"
              name="image"
              multiple
              required={formik.values.image ? false : true}
              onChange={(e) => {
                formik.setValues({
                  ...formik.values,
                  image: Object.values(e.target.files),
                });
              }}
            />
          </div>
        </Form.Group>

        <Row>
          {formik.values.image ? (
            formik.values.image.map((img) => (
              <Col sm={1}>
                {typeof img === "string" ? (
                  <img
                    className="img img-fluid img-thumbnail mb-3"
                    alt=""
                    src={process.env.REACT_APP_IMAGE_URL + "/product/" + img}
                  />
                ) : (
                  <img
                    className="img img-fluid img-thumbnail mb-3"
                    alt=""
                    src={URL.createObjectURL(img)}
                  />
                )}
              </Col>
            ))
          ) : (
            <></>
          )}
        </Row>

        <Form.Group className="row mb-3" controlId="title">
          <Col sm={{ offset: 3, span: 9 }}>
            <Button variant="danger" size="sm" type="reset" className="me-2">
              <i className="fa fa-trash"></i> Cancel
            </Button>
            <Button variant="success" size="sm" type="submit" className="me-2">
              <i className="fa fa-paper-plane"></i> Submit
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </>
  );
};

export default ProductForm;
