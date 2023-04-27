import { Navbar, Container, Nav } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";

const MenuComponent = () => {
  const localUser = JSON.parse(localStorage.getItem("auth_user")) ?? null;
  let navigate = useNavigate();
  return (
    <Navbar bg="dark" variant="dark" sticky="top">
      <Container fluid>
        <Navbar.Brand href="/">Navbar</Navbar.Brand>
        <Nav className="me-auto">
          <NavLink className="nav-link" to="/">
            Home
          </NavLink>

          {!localUser && (
            <>
              <NavLink className="nav-link" to="/login">
                Login
              </NavLink>

              <NavLink className="nav-link me-5" to="/register">
                Register
              </NavLink>
            </>
          )}
        </Nav>
        <Nav>
          <NavLink to="/cart" className={"nav-link"}>
            Cart(0)
          </NavLink>
          {localUser && (
            <>
              <NavLink className="nav-link" to={"/" + localUser.role}>
                {localUser.name.toUpperCase()}
              </NavLink>
              <NavLink
                className="nav-link"
                to="/login"
                onClick={(e) => {
                  e.preventDefault();
                  localStorage.removeItem("auth_user");
                  localStorage.removeItem("auth_token");
                  navigate("/login");
                }}
              >
                Logout
              </NavLink>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default MenuComponent;
