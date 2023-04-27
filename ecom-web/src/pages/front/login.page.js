import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { login } from "../../services/auth.service";
import { useNavigate } from "react-router-dom";

let defaultData = {
  email: "",
  password: "",
};
const LoginPage = () => {
  let [data, setData] = useState(defaultData);
  let [err, setErr] = useState(defaultData);
  let navigate = useNavigate();

  const handelSubmit = async (e) => {
    e.preventDefault();
    //  call axios
    try {
      let response = await login(data);
      // console.log(response);/
      if (response.status) {
        // console.log(response);
        toast.success(response.msg);
        navigate("/" + response.result.user.role[0]);
      } else {
        toast.error(response.msg);
      }
    } catch (msg) {
      toast.error(msg);
    }
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
    validateData(e.target);
  };

  const validateData = ({ name, value, required }) => {
    let err_msg = null;
    switch (name) {
      case "email":
        err_msg = required && !value ? "Email is required" : null;
        break;
      case "password":
        err_msg =
          required && !value
            ? "Password is required"
            : value.length < 8
            ? "Password must be atleast 8 characters"
            : null;
        break;
      default:
        break;
    }
    setErr({
      ...err,
      [name]: err_msg,
    });
  };

  useEffect(() => {
    let token = localStorage.getItem("auth_token");

    if (token) {
      let token = localStorage.getItem("auth_token");

      let user = JSON.parse(localStorage.getItem("auth_user"));

      if (!user || !token) {
        localStorage.clear();
      } else {
        navigate("/" + user.role[0]);
      }
    }
  }, [navigate]);
  return (
    <>
      <React.Fragment>
        <ToastContainer />
        <Container fluid>
          <Row>
            <Col sm={12} md={{ offset: 3, span: 6 }}>
              <h4 className="text-center">Login Page</h4>
              <hr />
              <Form onSubmit={handelSubmit}>
                <Form.Group className="row mb-3" controlId="email">
                  <Form.Label className="col mb-3">Email:</Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      required={true}
                      size={"sm"}
                      onChange={handleChange}
                    />
                    <em className="text-danger">{err?.email}</em>
                  </Col>
                </Form.Group>
                <Form.Group className="row mb-3" controlId="password">
                  <Form.Label className="col mb-3">Password:</Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="Enter your password"
                      required={true}
                      size={"sm"}
                      onChange={handleChange}
                    />
                    <em className="text-danger">{err?.password}</em>
                  </Col>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Remeber Me" />
                </Form.Group>
                <Form.Group>
                  <Button
                    variant="danger"
                    size="sm"
                    className="me-2"
                    type="reset"
                  >
                    Cancel
                  </Button>
                  <Button variant="success" type="submit" size="sm">
                    Login
                  </Button>
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    </>
  );
};

export default LoginPage;
