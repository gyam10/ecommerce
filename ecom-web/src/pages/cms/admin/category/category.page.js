import { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { toast } from "react-toastify";
import { AdminBreadCrumb } from "../../../../component/cms/breadcrumb.component";
import ActionButtons from "../../../../component/common/action-btns/action-buttons.component";
import {
  deleteCategoryById,
  getCategoryByType,
} from "../../../../services/category.service";

const CategoryPage = () => {
  const deleteCategory = async (id) => {
    try {
      let response = await deleteCategoryById(id);
      console.log(response);
      if (response.status) {
        toast.success(response.msg);
        getAllCategories();
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
      name: "Parent",
      selector: (row) => (row.parent_id ? row.parent_id.title : "-"),
    },
    {
      name: "Brand",
      selector: (row) =>
        row.brands ? row.brands.map((item) => item.title).join(", ") : "-",
    },
    {
      name: "Status",
      selector: (row) => row.status,
    },
    {
      name: "Active",
      selector: (row) => (
        <ActionButtons
          id={row._id}
          onDeleteClick={deleteCategory}
          updatePath={"/admin/category/" + row._id}
        />
      ),
    },
  ];

  const [data, setData] = useState();

  const getAllCategories = async () => {
    try {
      let result = await getCategoryByType("category");
      console.log(result);
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
    getAllCategories();
  }, []);

  return (
    <>
      <div className="container-fluid px-4">
        <AdminBreadCrumb
          createUrl={"/admin/category/create"}
          type="Category"
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
export default CategoryPage;
