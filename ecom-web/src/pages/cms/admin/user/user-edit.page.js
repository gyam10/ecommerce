import { AdminBreadCrumb } from "../../../../component/cms/breadcrumb.component";
import { updateUser, getUserById } from "../../../../services/user.service";
import UserForm from "./user-form.component";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";

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

const UserEdit = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(default_value);

  const handleSubmit = async (data) => {
    try {
      console.log("handdel", data);
      let response = await updateUser(data, params.id);

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

  const getUserDetails = useCallback(async () => {
    try {
      let id = params.id;
      let result = await getUserById(id);
      if (result.status) {
        setData(result.result);
      }
    } catch (error) {
      console.error("error:", error);
    }
  }, [params.id]);

  useEffect(() => {
    getUserDetails();
  }, [getUserDetails]);
  return (
    <>
      <div className="container-fluid px-4">
        <ToastContainer />
        <AdminBreadCrumb type="User" opt="Edit" />

        <div className="card mb-4">
          <div className="card-body">
            <UserForm
              handleSubmit={handleSubmit}
              defaultData={data}
              edit={true}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default UserEdit;
