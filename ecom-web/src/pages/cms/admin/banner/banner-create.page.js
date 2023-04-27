import { AdminBreadCrumb } from "../../../../component/cms/breadcrumb.component";
import { createLabel } from "../../../../services/label.service";
import BannerForm from "./banner-form.component";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const default_value = {
  title: "",
  link: "",
  status: "",
  type: "banner",
  image: "",
};

const BannerCreate = () => {
  const navigate = useNavigate();
  const handleSubmit = async (data) => {
    try {
      console.log("here", data);
      let response = await createLabel(data);
      // console.log("");
      if (response.status) {
        toast.success(response.msg);
        navigate("/admin/banner");
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
        <AdminBreadCrumb type="Banner" opt="Create" />

        <div className="card mb-4">
          <div className="card-body">
            <BannerForm
              handleSubmit={handleSubmit}
              defaultData={default_value}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default BannerCreate;
