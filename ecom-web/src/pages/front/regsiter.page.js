import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { ToastContainer } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import { useFormik } from "formik";
import Select from "react-select";
const RegisterPage = () => {
  // Data receive
  // data validation
  // data submission
  let roles = [
    { value: "customer", label: "Buyer" },
    { value: "seller", label: "Seller" },
  ];

  const regiseterValidationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Too Short Name!")
      .max(50, "Too Long Name!")
      .required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be 8 characters long")
      .required("Password is required"),
    role: Yup.array()
      .of(Yup.string(["seller", "customer"]))
      .required("Role is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      image: "",
      role: [],
      address_shipping_address: "",
      address_shipping_house_no: "",
      address_billing_address: "",
      address_billing_house_no: "",
      phone: "",
    },
    validationSchema: regiseterValidationSchema,
    onSubmit: (values) => {
      if (values.role.length <= 0) {
        formik.setErrors({
          ...formik.errors,
          role: "Role is required",
        });
      }
    },
  });

  return (
    <>
      <Container>
        <ToastContainer />
        <Row>
          <Col sm={12} md={{ offset: 1, span: 9 }}>
            <h4 className="text-center">Register Page</h4>
            <hr />
            <Form onSubmit={formik.handleSubmit}>
              {/* Name */}
              <Form.Group className="row mb-3" controlId="name">
                <Form.Label className="col mb-3"> Name:</Form.Label>
                <Col sm={9}>
                  <Form.Control
                    size={"sm"}
                    type="name"
                    required={true}
                    className="name"
                    placeholder="Enter your full name"
                    onChange={formik.handleChange}
                  />
                  {formik.errors.name && (
                    <em className="text-danger">{formik.errors.name}</em>
                  )}
                </Col>
              </Form.Group>
              {/* Email */}
              <Form.Group className="row mb-3" controlId="email">
                <Form.Label className="col mb-3">Email:</Form.Label>
                <Col sm={9}>
                  <Form.Control
                    size={"sm"}
                    type="email"
                    required={true}
                    className="email"
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
              <Form.Group className="row mb-3" controlId="password">
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
              <Form.Group className="row mb-3" controlId="phone">
                <Form.Label className="col mb-3">Phone Number:</Form.Label>
                <Col sm={9}>
                  <Form.Control
                    size={"sm"}
                    type="tel"
                    required={true}
                    className="phone"
                    placeholder="Enter your Phone Number"
                    onChange={formik.handleChange}
                  />
                  {formik.errors.phone && (
                    <em className="text-danger">{formik.errors.phone}</em>
                  )}
                </Col>
              </Form.Group>

              <Form.Group className="row mb-3" controlId="role-select">
                <Form.Label className="col mb-3" controlId="role-select">
                  Role:
                </Form.Label>
                <Col sm={9}>
                  <Select
                    options={roles}
                    isMulti
                    className="form-control-sm"
                    required
                    name="role"
                    onChange={(selectedOptions) => {
                      let roles = [];
                      selectedOptions.forEach((item) => {
                        roles.push(item.value);
                      });
                      formik.setValues({
                        ...formik.values,
                        role: roles,
                      });
                    }}
                  ></Select>
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
                    type="text"
                    size={"sm"}
                    id="address_shipping_address_house_no"
                    placeholder="House Number"
                    required={true}
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
                    type="text"
                    size={"sm"}
                    className="house_no"
                    id="address_billing_address_house_no"
                    placeholder="House Number"
                    required={true}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.address_billing_house_no && (
                    <em className="text-danger">
                      {formik.errors.address_billing_house_no}
                    </em>
                  )}
                </Col>
              </Form.Group>
              <Form.Group controlId="formFileSm" className="row mb-3">
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
                  <img
                    src={
                      formik.values.image &&
                      URL.createObjectURL(formik.values.image)
                    }
                    alt=""
                    className="img img-fluid"
                  />
                </div>
              </Form.Group>
              {/* Buttons */}
              <Form.Group>
                <Button
                  variant="danger"
                  size="sm"
                  className="me-2"
                  type="reset"
                  onClick={formik.resetForm}
                >
                  Cancel
                </Button>
                <Button variant="success" type="submit" size="sm">
                  Register
                </Button>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default RegisterPage;
