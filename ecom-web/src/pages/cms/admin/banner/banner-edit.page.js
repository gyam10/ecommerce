import { AdminBreadCrumb } from "../../../../component/cms/breadcrumb.component";
import { updateLabel, getLabelById } from "../../../../services/label.service";
import BannerForm from "./banner-form.component";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";

const default_value = {
  title: "",
  link: "",
  status: "",
  type: "banner",
  image: "",
};

const BannerEdit = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(default_value);

  const handleSubmit = async (data) => {
    try {
      let response = await updateLabel(data, params.id);
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

  const getBannerDetails = useCallback(async () => {
    try {
      let id = params.id;
      let result = await getLabelById(id);
      if (result.status) {
        setData(result.result);
      }
    } catch (error) {
      console.error("error:", error);
    }
  }, [params.id]);

  useEffect(() => {
    getBannerDetails();
  }, [getBannerDetails]);
  return (
    <>
      <div className="container-fluid px-4">
        <ToastContainer />
        <AdminBreadCrumb type="Banner" opt="Edit" />

        <div className="card mb-4">
          <div className="card-body">
            <BannerForm handleSubmit={handleSubmit} defaultData={data} />
          </div>
        </div>
      </div>
    </>
  );
};
export default BannerEdit;
