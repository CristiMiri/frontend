import React, { useEffect, useState } from "react";
import { User } from "../models/user";
import DeviceTable from "../Components/DeviceTable";
import { Device, dummyDevices } from "../models/device";
import {
  Accordion,
  Button,
  Col,
  Container,
  Form,
  FormControl,
  FormGroup,
  Row,
} from "react-bootstrap";
import axios from "axios";
import { deleteDevice, getUserDevices, insertDevice } from "../Api/DeviceApi";
import { deleteUser, getUserById, updateUser } from "../Api/UserApi";
import { useParams } from "react-router-dom";
import { log } from "console";
import globlaUser from "../Api/GlobalUser";

type Props = {};

const Profile = (props: Props) => {
  const [editable, setEditable] = useState(false);
  const [formData, setFormData] = useState<User>({
    id: -1,
    username: "",
    password: "",
    email: "",
    name: "",
    role: "",
  });
  const [devices, setDevices] = useState<Device[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
    console.log(formData);
  };
  const { id } = useParams();
  useEffect(() => {
    getUserById(parseInt(id!)).then((data) => {
      setFormData(data);
    });
  }, []);
  const handleUpdateClick = () => {
    setEditable(true);
  };

  const handleSaveClick = () => {
    setEditable(false);
    const { id, username, password, email, name, role } = formData;
    console.log(formData);

    updateUser(formData).then((data) => {
      console.log(data);
    });
  };

  useEffect(() => {
    getUserById(parseInt(id!)).then((user) => {
      setFormData({ ...user });

      getUserDevices(parseInt(id!)).then((data) => {
        setDevices(data);
      });
    });
  }, []);

  return (
    <Container className="mx-auto mt-5  bg-info rounded border border-dark">
      <Row className="justify-content-between">
        <h2 className="col-6">Welcome {formData.name}</h2>
        <Col className="col-6 d-flex justify-content-end">
          {editable ? (
            <Button className="col-3 mx-1" onClick={handleSaveClick}>
              Save Changes
            </Button>
          ) : (
            <Button className="col-3 mx-1" onClick={handleUpdateClick}>
              Update Profile
            </Button>
          )}
          <Button
            className="col-3 mx-1 "
            variant="danger"
            onClick={() => {
              deleteUser(formData.id!).then((data) => {
                console.log(data);
              });
            }}
          >
            Delete Profile
          </Button>
        </Col>
      </Row>
      <Form className="mb-3">
        <Row className="mb-3">
          <FormGroup as={Col}>
            <Form.Label>Username</Form.Label>
            <FormControl
              type="text"
              name="username"
              defaultValue={formData.username}
              onChange={handleInputChange}
              // readOnly={!editable}
              readOnly
            />
          </FormGroup>

          <FormGroup as={Col}>
            <Form.Label>Password</Form.Label>
            <FormControl
              type="password"
              name="password"
              defaultValue={formData.password || ""}
              onChange={handleInputChange}
              readOnly={!editable}
            />
          </FormGroup>
        </Row>
        <Row className="mb-">
          <FormGroup as={Col}>
            <Form.Label>Email</Form.Label>
            <FormControl
              type="text"
              name="email"
              defaultValue={formData.email || ""}
              onChange={handleInputChange}
              readOnly={!editable}
            />
          </FormGroup>

          <FormGroup as={Col}>
            <Form.Label>Name</Form.Label>
            <FormControl
              type="text"
              name="name"
              defaultValue={formData.name || ""}
              onChange={handleInputChange}
              readOnly={!editable}
            />
          </FormGroup>

          <FormGroup as={Col}>
            <Form.Label>Role</Form.Label>
            <Form.Select
              name="role"
              disabled={!editable}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
            >
              <option selected={formData.role === "admin"} value="admin">
                Admin
              </option>
              <option selected={formData.role === "user"} value="user">
                User
              </option>
            </Form.Select>
          </FormGroup>
        </Row>
      </Form>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Owned Devices</Accordion.Header>
          <Accordion.Body>
            <DeviceTable devices={devices} handleDeleteDevice={() => void 0} />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
};

export default Profile;
