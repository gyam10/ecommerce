import { AdminBreadCrumb } from "../../../../component/cms/breadcrumb.component";
import { createCategory } from "../../../../services/category.service";
import CategoryForm from "./category-form.component";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const default_value = {
  title: "",
  parent_id: "",
  status: "inactive",
  image: "",
  show_in_home: false,
  brands: null,
};

const CategoryCreate = () => {
  const navigate = useNavigate();
  const handleSubmit = async (data) => {
    try {
      console.log("here");
      let response = await createCategory(data);
      console.log("");
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
  return (
    <>
      <div className="container-fluid px-4">
        <ToastContainer />
        <AdminBreadCrumb type="Category" opt="Create" />

        <div className="card mb-4">
          <div className="card-body">
            <CategoryForm
              handleSubmit={handleSubmit}
              defaultData={default_value}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default CategoryCreate;
