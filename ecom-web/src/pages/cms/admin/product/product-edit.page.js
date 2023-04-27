import { AdminBreadCrumb } from "../../../../component/cms/breadcrumb.component";
import {
  updateProduct,
  getProductById,
} from "../../../../services/product.service";
import ProductForm from "./product-form.component";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";

const default_value = {
  title: "",
  status: "inactive",
  type: "product",
  image: "",
};

const ProductEdit = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(default_value);

  const handleSubmit = async (data) => {
    try {
      let response = await updateProduct(data, params.id);
      // console.log(result);
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

  const getProductDetails = useCallback(async () => {
    try {
      let id = params.id;
      let result = await getProductById(id);
      if (result.status) {
        setData(result.result);
      }
    } catch (error) {
      console.error("error:", error);
    }
  }, [params.id]);

  useEffect(() => {
    getProductDetails();
  }, [getProductDetails]);
  return (
    <>
      <div className="container-fluid px-4">
        <ToastContainer />
        <AdminBreadCrumb type="Product" opt="Edit" />

        <div className="card mb-4">
          <div className="card-body">
            <ProductForm handleSubmit={handleSubmit} defaultData={data} />
          </div>
        </div>
      </div>
    </>
  );
};
export default ProductEdit;
