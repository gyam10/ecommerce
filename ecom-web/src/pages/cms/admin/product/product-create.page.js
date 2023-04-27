import { AdminBreadCrumb } from "../../../../component/cms/breadcrumb.component";
import { createProduct } from "../../../../services/product.service";
import ProductForm from "./product-form.component";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const default_value = {
  title: "",
  category: "",
  status: "inactive",
  image: "",
  is_featured: false,
  brand: null,
  price: null,
  discount: null,
  description: "",
  seller: null,
};

const ProductCreate = () => {
  const navigate = useNavigate();
  const handleSubmit = async (data) => {
    try {
      // console.log("here");
      console.log("Submit", data);
      if (data.brand) {
        // data.brand = data.brand.map((item) => item.value);
        data.brand = data.brand.value;
      }
      console.log(data.brand);
      let response = await createProduct(data);

      if (response.status) {
        toast.success(response.msg);
        navigate("/admin/product");
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
        <AdminBreadCrumb type="Product" opt="Create" />

        <div className="card mb-4">
          <div className="card-body">
            <ProductForm
              handleSubmit={handleSubmit}
              defaultData={default_value}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default ProductCreate;
