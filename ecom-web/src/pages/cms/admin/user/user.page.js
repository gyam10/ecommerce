import { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { toast } from "react-toastify";
import { AdminBreadCrumb } from "../../../../component/cms/breadcrumb.component";
import ActionButtons from "../../../../component/common/action-btns/action-buttons.component";

import {
  deleteUserById,
  getUserByRole,
} from "../../../../services/user.service";

const UserPage = () => {
  const deleteUser = async (id) => {
    try {
      let response = await deleteUserById(id);
      console.log(response);
      if (response.status) {
        toast.success(response.msg);
        getAllUsers();
      } else {
        toast.error(response.msg);
      }
    } catch (error) {
      console.error("Delete", error);
    }
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Role",
      selector: (row) => row.role.join(", "),
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
          onDeleteClick={deleteUser}
          updatePath={"/admin/user/" + row._id}
        />
      ),
    },
  ];

  const [data, setData] = useState();

  const getAllUsers = async () => {
    try {
      let result = await getUserByRole("all");
      console.log(result);
      if (result.status) {
        let logged_in = JSON.parse(localStorage.getItem("auth_user"));
        let all_users = result.result.filter(
          (item) => item._id !== logged_in._id
        );
        setData(all_users);
        // setData(result.result);
      } else {
        toast.error(result.msg);
      }
      return result;
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <>
      <div className="container-fluid px-4">
        <AdminBreadCrumb
          createUrl={"/admin/user/create"}
          type="User"
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
export default UserPage;
