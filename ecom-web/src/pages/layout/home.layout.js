import { Outlet } from "react-router-dom";
import MenuComponent from "../../component/front/menu.component";
import "../../assets/css/home.css";
const HomeLayout = () => {
  return (
    <>
      <MenuComponent />
      <Outlet />
    </>
  );
};
export default HomeLayout;
