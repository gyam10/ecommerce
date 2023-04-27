import { Button, Col, Form } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect } from "react";
import Select from "react-select";
const UserForm = ({ handleSubmit, defaultData, edit }) => {
  let roles = [
    { value: "admin", label: "Admin" },
    { value: "customer", label: "Buyer" },
    { value: "seller", label: "Seller" },
  ];

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Too Short Name!")
      .max(50, "Too Long Name!")
      .required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be 8 characters long")
      .required("Password is required"),
    role: Yup.object().nullable(),
  });
  const formik = useFormik({
    initialValues: defaultData,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (values.role) {
        values.role = values.role.map((item) => {
          return item.value;
        });
      }
      handleSubmit(values);
    },
  });

  useEffect(() => {
    if (defaultData) {
      let sel_roles = defaultData.role.map((item) => {
        return {
          value: item,
          label:
            item === "customer"
              ? "Buyer"
              : item === "admin"
              ? "Admin"
              : "Seller",
        };
      });

      formik.setValues({
        ...defaultData,
        address_shipping_address: defaultData?.address?.shipping.address,
        address_billing_address: defaultData?.address?.billing.address,
        address_shipping_house_no: defaultData?.address?.shipping.house_no,
        address_billing_house_no: defaultData?.address?.billing.house_no,
        role: sel_roles,
      });
    }
  }, [defaultData]);

  return (
    <>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="row mb-3" name="name">
          <Form.Label className="col mb-3"> Name:</Form.Label>
          <Col sm={9}>
            <Form.Control
              size={"sm"}
              type="name"
              required={true}
              className="name"
              value={formik.values.name}
              placeholder="Enter your full name"
              onChange={formik.handleChange}
            />
            {formik.errors.name && (
              <em className="text-danger">{formik.errors.name}</em>
            )}
          </Col>
        </Form.Group>
        {/* Email */}
        <Form.Group className="row mb-3" name="email">
          <Form.Label className="col mb-3">Email:</Form.Label>
          <Col sm={9}>
            <Form.Control
              size={"sm"}
              type="email"
              required={true}
              className="email"
              value={formik.values.email}
              readOnly={edit}
              placeholder="Enter your Email"
              onChange={(e) => {
                formik.setValues({
                  ...formik.values,
                  email: e.target.value,
                });
              }}
            />
            {formik.errors.email && (
              <em className="text-danger">{formik.errors.email}</em>
            )}
          </Col>
        </Form.Group>

        {!edit && (
          <Form.Group className="row mb-3" name="password">
            <Form.Label className="col mb-3">Password:</Form.Label>
            <Col sm={9}>
              <Form.Control
                size={"sm"}
                type="password"
                className="password"
                placeholder="Enter your password"
                required={true}
                onChange={formik.handleChange}
              />
              {formik.errors.password && (
                <em className="text-danger">{formik.errors.password}</em>
              )}
            </Col>
          </Form.Group>
        )}

        <Form.Group className="row mb-3" name="phone">
          <Form.Label className="col mb-3">Phone Number:</Form.Label>
          <Col sm={9}>
            <Form.Control
              size={"sm"}
              type="tel"
              required={true}
              className="phone"
              value={formik.values.phone}
              placeholder="Enter your Phone Number"
              onChange={formik.handleChange}
            />
            {formik.errors.phone && (
              <em className="text-danger">{formik.errors.phone}</em>
            )}
          </Col>
        </Form.Group>

        <Form.Group className="row mb-3" name="role-select">
          <Form.Label className="col mb-3" name="role-select">
            Role:
          </Form.Label>
          <Col sm={9}>
            <Select
              options={roles}
              isMulti
              className="form-control-sm"
              required
              value={formik.values.role}
              name="role"
              onChange={(selectedOptions) => {
                // console.log(selectedOptions);
                // let roles = [];
                // selectedOptions.forEach((item) => {
                //   roles.push(item.value);
                // // });
                // // console.log(roles);
                formik.setValues({
                  ...formik.values,
                  role: selectedOptions,
                });
              }}
            >
              {/* <option>Select roles</option>
              {roles &&
                roles.map((item, key) => {
                  <option value={item.value} key={key}>
                    {item.label}
                  </option>;
                })} */}
            </Select>
            {formik.errors.role && (
              <em className="text-danger">{formik.errors.role}</em>
            )}
          </Col>
        </Form.Group>

        <Form.Group className="row mb-3">
          <Form.Label className="col mb-3">Shipping Address:</Form.Label>
          <Col sm={6}>
            <Form.Control
              type="text"
              size={"sm"}
              className="address_shipping_address"
              placeholder="Shipping Address"
              value={formik.values.address_shipping_address}
              required={true}
              id="address_shipping_address"
              onChange={formik.handleChange}
            />
            {formik.errors.address_shipping_address && (
              <em className="text-danger">
                {formik.errors.address_shipping_address}
              </em>
            )}
          </Col>
          {/* <Form.Label className="col mb-3">House Number:</Form.Label> */}
          <Col sm={3}>
            <Form.Control
              type="number"
              size={"sm"}
              name="address_shipping_house_no"
              placeholder="House Number"
              required={true}
              value={formik.values.address_shipping_house_no}
              onChange={formik.handleChange}
            />
            {formik.errors.address_shipping_house_no && (
              <em className="text-danger">
                {formik.errors.address_shipping_house_no}
              </em>
            )}
          </Col>
        </Form.Group>

        <Form.Group className="row mb-3">
          <Form.Label className="col mb-3">Billing Address:</Form.Label>
          <Col sm={6}>
            <Form.Control
              type="text"
              size={"sm"}
              className="address_billing_address"
              placeholder="Billing Address"
              required={true}
              value={formik.values.address_billing_address}
              id="address_billing_address"
              onChange={formik.handleChange}
            />
            {formik.errors.address_billing_address && (
              <em className="text-danger">
                {formik.errors.address_billing_address}
              </em>
            )}
          </Col>
          {/* <Form.Label className="col mb-3">House Number:</Form.Label> */}
          <Col sm={3}>
            <Form.Control
              type="number"
              size={"sm"}
              name="address_billing_house_no"
              placeholder="House Number"
              required={true}
              value={formik.values.address_billing_house_no}
              onChange={formik.handleChange}
            />
            {formik.errors.address_billing_house_no && (
              <em className="text-danger">
                {formik.errors.address_billing_house_no}
              </em>
            )}
          </Col>
        </Form.Group>

        <Form.Group className="row mb-3" name="status">
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

        <Form.Group name="formFileSm" className="row mb-3">
          <Form.Label className="col-sm-3">Image:</Form.Label>

          <div className="col-sm-3">
            <Form.Control
              type="file"
              size="sm"
              name="image"
              onChange={(e) => {
                let file = e.target.files[0];
                formik.setValues({
                  ...formik.values,
                  image: file,
                });
              }}
            />
          </div>
          <div className="col-sm-3">
            {formik.values.image && typeof formik.values.image === "object" ? (
              <img
                src={
                  formik.values.image &&
                  URL.createObjectURL(formik.values.image)
                }
                alt=""
                className="img img-fluid"
              />
            ) : (
              <img
                src={
                  process.env.REACT_APP_IMAGE_URL +
                  "/user/" +
                  formik.values.image
                }
                alt=""
                className="img img-fluid"
              />
            )}
          </div>
        </Form.Group>

        <Form.Group className="row mb-3" name="title">
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

export default UserForm;
