import { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { toast } from "react-toastify";
import { AdminBreadCrumb } from "../../../../component/cms/breadcrumb.component";
import ActionButtons from "../../../../component/common/action-btns/action-buttons.component";

import {
  deleteLabelById,
  getLabelByType,
} from "../../../../services/label.service";

const BrandPage = () => {
  const deleteBrand = async (id) => {
    try {
      let response = await deleteLabelById(id);
      console.log(response);
      if (response.status) {
        toast.success(response.msg);
        getAllLabels();
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
      name: "Image",
      selector: (row) => row.image,
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
          onDeleteClick={deleteBrand}
          updatePath={"/admin/brand/" + row._id}
        />
      ),
    },
  ];

  const [data, setData] = useState();

  const getAllLabels = async () => {
    try {
      let result = await getLabelByType("brand");
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
    getAllLabels();
  }, []);

  return (
    <>
      <div className="container-fluid px-4">
        <AdminBreadCrumb
          createUrl={"/admin/brand/create"}
          type="Brand"
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
export default BrandPage;
