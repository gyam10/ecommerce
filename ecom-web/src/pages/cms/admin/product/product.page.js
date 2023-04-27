import { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { toast } from "react-toastify";
import { AdminBreadCrumb } from "../../../../component/cms/breadcrumb.component";
import ActionButtons from "../../../../component/common/action-btns/action-buttons.component";
import {
  deleteProductById,
  getProductByType,
} from "../../../../services/product.service";
import NumberFormat from "react-number-format";

const ProductPage = () => {
  const deleteProduct = async (id) => {
    try {
      let response = await deleteProductById(id);
      console.log(response);
      if (response.status) {
        toast.success(response.msg);
        getAllProducts();
      } else {
        toast.error(response.msg);
      }
    } catch (error) {
      console.error("Delete", error);
    }
  };

  const columns = [
    {
      name: "Title",
      selector: (row) => row.title,
    },

    {
      name: "Category",
      selector: (row) => (row.category ? row.category.title : "-"),
    },
    {
      name: "Brand",
      selector: (row) => (row.brand ? row.brand.title : "-"),
    },
    {
      name: "Price",
      selector: (row) => (
        <NumberFormat
          value={row.after_discount}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"Nrp. "}
        />
      ),
    },
    {
      name: "Status",
      selector: (row) => row.status,
    },
    {
      name: "Is Featured",
      selector: (row) => (row.is_featured ? "Yes" : "No"),
    },
    {
      name: "Action",
      selector: (row) => (
        <ActionButtons
          id={row._id}
          onDeleteClick={deleteProduct}
          updatePath={"/admin/product/" + row._id}
        />
      ),
    },
  ];

  const [data, setData] = useState();

  const getAllProducts = async () => {
    try {
      let result = await getProductByType("product");
      // console.log("Prodsucr", result);
      if (result.status) {
        setData(result.result);
      } else {
        toast.error(result.msg);
      }
      return result;
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
      <div className="container-fluid px-4">
        <AdminBreadCrumb
          createUrl={"/admin/product/create"}
          type="Product"
          opt="Listing"
        />
        <Row>
          <Col sm={12}>
            <DataTable columns={columns} data={data} pagination />
          </Col>
        </Row>
      </div>
    </>
  );
};
export default ProductPage;
