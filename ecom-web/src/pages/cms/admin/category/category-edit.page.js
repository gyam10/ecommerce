import { AdminBreadCrumb } from "../../../../component/cms/breadcrumb.component";
import {
  updateCategory,
  getCategoryById,
} from "../../../../services/category.service";
import CategoryForm from "./category-form.component";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";

const default_value = {
  title: "",
  status: "inactive",
  type: "category",
  image: "",
};

const CategoryEdit = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(default_value);

  const handleSubmit = async (data) => {
    try {
      let response = await updateCategory(data, params.id);
      if (response.status) {
        toast.success(response.msg);
        navigate("/admin/category");
      } else {
        toast.error(response.msg);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const getCategoryDetails = useCallback(async () => {
    try {
      let id = params.id;
      let result = await getCategoryById(id);
      if (result.status) {
        setData(result.result);
      }
    } catch (error) {
      console.error("error:", error);
    }
  }, [params.id]);

  useEffect(() => {
    getCategoryDetails();
  }, [getCategoryDetails]);
  return (
    <>
      <div className="container-fluid px-4">
        <ToastContainer />
        <AdminBreadCrumb type="Category" opt="Edit" />

        <div className="card mb-4">
          <div className="card-body">
            <CategoryForm handleSubmit={handleSubmit} defaultData={data} />
          </div>
        </div>
      </div>
    </>
  );
};
export default CategoryEdit;
