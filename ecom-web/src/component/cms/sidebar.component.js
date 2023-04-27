import { NavLink } from "react-router-dom";

const AdminSideBarComponent = () => {
  let localUser = JSON.parse(localStorage.getItem("auth_user"));
  return (
    <>
      <div id="layoutSidenav_nav">
        <nav
          className="sb-sidenav accordion sb-sidenav-dark"
          id="sidenavAccordion"
        >
          <div className="sb-sidenav-menu">
            <div className="nav">
              <div className="sb-sidenav-menu-heading">Core</div>
              <NavLink className="nav-link" to="/admin">
                <div className="sb-nav-link-icon">
                  <i className="fas fa-tachometer-alt" />
                </div>
                Dashboard
              </NavLink>
              <NavLink className="nav-link" to="/admin/banner">
                <div className="sb-nav-link-icon">
                  <i className="fas fa-images" />
                </div>
                Banner
              </NavLink>
              <NavLink className="nav-link" to="/admin/brand">
                <div className="sb-nav-link-icon">
                  <i className="fas fa-b" />
                </div>
                Brand
              </NavLink>
              <NavLink className="nav-link" to="/admin/category">
                <div className="sb-nav-link-icon">
                  <i className="fas fa-sitemap" />
                </div>
                Category
              </NavLink>
              <NavLink className="nav-link" to="/admin/user">
                <div className="sb-nav-link-icon">
                  <i className="fas fa-users" />
                </div>
                Users
              </NavLink>
              <NavLink className="nav-link" to="/admin/product">
                <div className="sb-nav-link-icon">
                  <i className="fas fa-shopping-bag" />
                </div>
                Product
              </NavLink>
              <NavLink className="nav-link" to="/admin/order">
                <div className="sb-nav-link-icon">
                  <i className="fas fa-shopping-cart" />
                </div>
                Order
              </NavLink>
            </div>
          </div>
          <div className="sb-sidenav-footer">
            <div className="small">Logged in as:</div>
            {localUser.name.toUpperCase()}
          </div>
        </nav>
      </div>
    </>
  );
};

export default AdminSideBarComponent;
