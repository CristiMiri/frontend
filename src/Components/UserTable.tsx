import React from "react";
import { Button, Table } from "react-bootstrap";
import { User } from "../models/user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faUserPen,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import UserForm from "./UserForm";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Profile from "../Pages/Profile";

type Props = {
  users: User[];
  handleDeleteUser: (id: number) => void;
  handleUpdateUser: (user: User) => void;
  handleAddUser: () => void;

  handleSave: (user: User) => void;
};

const UserTable = ({
  users,
  handleDeleteUser,
  handleAddUser,
  handleUpdateUser,

  handleSave,
}: Props) => {
  const [show, setShow] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState<User>({
    id: -1,
    username: "",
    password: "",
    email: "",
    role: "",
  });
  const handleClose = () => setShow(false);
  const navigate = useNavigate();
  return (
    <>
      <div className="d-flex justify-content-end">
        <Button
          variant="success"
          className="mt-4 "
          onClick={() => {
            setShow(true);
          }}
        >
          Create user
          <FontAwesomeIcon icon={faUserPlus} />
        </Button>
      </div>
      <UserForm
        show={show}
        selectUser={selectedUser!}
        handleClose={handleClose}
        handleSave={handleSave}
      />
      <Table
        striped
        bordered
        hover
        onClick={() => {
          console.log("clicked");
        }}
      >
        <thead>
          <tr>
            <th></th>
            <th>Username</th>
            {/* <th>Password</th> */}
            <th>Email</th>
            <th>Role</th>
            {/* <th></th> Added a new table header column */}
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {users.map((User, index) => (
            <tr key={User.id}>
              <td>{index + 1}</td>
              <td
                onClick={() => {
                  setSelectedUser(User);
                  navigate("/profile/" + users[index].id + "");
                  console.log(users[index].id);
                }}
              >
                {User.username}
              </td>
              {/* <td>{User.password}</td> */}
              <td>{User.email || "N/A"}</td>
              <td>{User.role || "N/A"}</td>
              {/* <td className="w-10">
                <Button
                  className="me-2"
                  variant="danger"
                  onClick={() => handleDeleteUser(User.id || -1)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
                <Button
                  variant="warning"
                  className="me-2"
                  onClick={() => {
                    setSelectedUser(User);
                    setShow(true);
                    handleUpdateUser(User);
                  }}
                >
                  <FontAwesomeIcon icon={faUserPen} />
                </Button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default UserTable;
