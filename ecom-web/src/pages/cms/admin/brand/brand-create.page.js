import { AdminBreadCrumb } from "../../../../component/cms/breadcrumb.component";
import { createLabel } from "../../../../services/label.service";
import BrandForm from "./brand-form.component";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const default_value = {
  title: "",
  link: "",
  status: "",
  type: "brand",
  image: "",
};

const BrandCreate = () => {
  const navigate = useNavigate();
  const handleSubmit = async (data) => {
    try {
      console.log("here");
      let response = await createLabel(data);
      console.log("");
      if (response.status) {
        toast.success(response.msg);
        navigate("/admin/brand");
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
        <AdminBreadCrumb type="Brand" opt="Create" />

        <div className="card mb-4">
          <div className="card-body">
            <BrandForm
              handleSubmit={handleSubmit}
              defaultData={default_value}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default BrandCreate;
