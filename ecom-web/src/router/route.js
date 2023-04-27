import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Front from "../pages/front";
import HomeLayout from "../pages/layout/home.layout";
import AdminLayout from "../pages/layout/admin.layout";
import AdminPages from "../pages/cms/admin/index";
import { Provider } from "react-redux";
import store from "../store";
const AdminPrivateRoute = ({ component }) => {
  let localUser = JSON.parse(localStorage.getItem("auth_user")) ?? null;
  if (!localUser) {
    return <Navigate to="/login" />;
  } else {
    let access_token = localStorage.getItem("auth_token");
    if (!access_token) {
      localStorage.removeItem("auth_user");
      return <Navigate to="/login" />;
    } else {
      return component;
    }
  }
};

const RoutingComponent = () => {
  return (
    <>
      <BrowserRouter>
        <Provider store={store}>
          <Routes>
            <Route path="/" element={<HomeLayout />}>
              <Route index element={<Front.HomePage />} />
              <Route path="/register" element={<Front.RegisterPage />}></Route>
              <Route path="/login" element={<Front.LoginPage />}></Route>
              <Route
                path="/category/:slug"
                element={<Front.CategoryDetailPage />}
              ></Route>
              <Route
                path="/product/:slug"
                element={<Front.ProductDetailPage />}
              />

              <Route path="*" element={<Front.ErrorPage />}></Route>
            </Route>
            {/* Admin Route */}
            <Route
              path="/admin"
              element={<AdminPrivateRoute component={<AdminLayout />} />}
            >
              <Route index element={<AdminPages.AdminDashboard />}></Route>
              {/* Banner */}
              <Route path="banner" element={<AdminPages.BannerPage />}></Route>
              <Route
                path="banner/create"
                element={<AdminPages.BannerCreate />}
              ></Route>
              <Route
                path="banner/:id"
                element={<AdminPages.BannerEdit />}
              ></Route>

              {/* Brand */}
              <Route path="brand" element={<AdminPages.BrandPage />}></Route>
              <Route
                path="brand/create"
                element={<AdminPages.BrandCreate />}
              ></Route>
              <Route
                path="brand/:id"
                element={<AdminPages.BrandEdit />}
              ></Route>

              {/* Category */}
              <Route
                path="category"
                element={<AdminPages.CategoryPage />}
              ></Route>
              <Route
                path="category/create"
                element={<AdminPages.CategoryCreate />}
              ></Route>
              <Route
                path="category/:id"
                element={<AdminPages.CategoryEdit />}
              ></Route>

              {/* User */}
              <Route path="user" element={<AdminPages.UserPage />}></Route>
              <Route
                path="user/create"
                element={<AdminPages.UserCreate />}
              ></Route>
              <Route path="user/:id" element={<AdminPages.UserEdit />}></Route>

              {/* Product */}
              <Route
                path="product"
                element={<AdminPages.ProductPage />}
              ></Route>
              <Route
                path="product/create"
                element={<AdminPages.ProductCreate />}
              ></Route>
              <Route
                path="product/:id"
                element={<AdminPages.ProductEdit />}
              ></Route>
            </Route>
          </Routes>
        </Provider>
      </BrowserRouter>
    </>
  );
};

export default RoutingComponent;
