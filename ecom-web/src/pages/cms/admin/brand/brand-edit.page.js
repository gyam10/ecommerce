import { AdminBreadCrumb } from "../../../../component/cms/breadcrumb.component";
import { updateLabel, getLabelById } from "../../../../services/label.service";
import BrandForm from "./brand-form.component";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";

const default_value = {
  title: "",
  link: "",
  status: "",
  type: "brand",
  image: "",
};

const BrandEdit = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(default_value);

  const handleSubmit = async (data) => {
    try {
      let response = await updateLabel(data, params.id);
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

  const getBrandDetails = useCallback(async () => {
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
    getBrandDetails();
  }, [getBrandDetails]);
  return (
    <>
      <div className="container-fluid px-4">
        <ToastContainer />
        <AdminBreadCrumb type="Brand" opt="Edit" />

        <div className="card mb-4">
          <div className="card-body">
            <BrandForm handleSubmit={handleSubmit} defaultData={data} />
          </div>
        </div>
      </div>
    </>
  );
};
export default BrandEdit;
