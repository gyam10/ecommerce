import { AdminBreadCrumb } from "../../../../component/cms/breadcrumb.component";
import { createUser } from "../../../../services/user.service";
import UserForm from "./user-form.component";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const default_value = {
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
};

const UserCreate = () => {
  const navigate = useNavigate();
  const handleSubmit = async (data) => {
    try {
      let response = await createUser(data);
      if (response.status) {
        toast.success(response.msg);
        navigate("/admin/user");
      } else {
        toast.error(response.msg);
      }
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <>
      <div className="container-fluid px-4">
        <ToastContainer />
        <AdminBreadCrumb type="User" opt="Create" />

        <div className="card mb-4">
          <div className="card-body">
            <UserForm
              handleSubmit={handleSubmit}
              defaultData={default_value}
              edit={false}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default UserCreate;
