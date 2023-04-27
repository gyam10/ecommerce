import { Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export const FooterComponent = () => {
  //
  return (
    <>
      <hr />
      <Navbar bg="dark" variant="dark">
        <Nav defaultActiveKey="/home" className="flex-column">
          <NavLink className="nav-link" to="/">
            Home
          </NavLink>
          <NavLink className="nav-link" to="/register">
            Register
          </NavLink>
          <NavLink className="nav-link" to="/login">
            Login
          </NavLink>
          {/* <NavLink className="nav-link" to="/about" disabled>
            About Us
          </NavLink> */}
        </Nav>
      </Navbar>
    </>
  );
};
