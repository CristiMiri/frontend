import React, { useState } from "react";
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  Modal,
  ModalBody,
  ModalFooter,
} from "react-bootstrap";
import { User } from "../models/user";

type Props = {
  show: boolean;
  selectUser: User;
  handleClose: () => void;
  handleSave: (user: User) => void;
};

const UserForm = ({ show, selectUser, handleClose, handleSave }: Props) => {
  const [validated, setValidated] = useState(false);
  const [user, setUser] = useState<User>(selectUser!);

  const handleSubmit = (event: any) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

  return (
    <Modal show={show} centered>
      <ModalBody>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <FormGroup>
            <Form.Label>Username</Form.Label>
            <FormControl
              type="text"
              name="username"
              required
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid username.
            </Form.Control.Feedback>
          </FormGroup>

          <FormGroup>
            <Form.Label>Password</Form.Label>
            <FormControl
              type="password"
              name="password"
              required
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid password.
            </Form.Control.Feedback>
          </FormGroup>

          <FormGroup>
            <Form.Label>Email</Form.Label>
            <FormControl
              type="text"
              name="email"
              required
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </FormGroup>

          <FormGroup>
            <Form.Label>Name</Form.Label>
            <FormControl
              type="text"
              name="name"
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
          </FormGroup>

          <FormGroup>
            <Form.Label>Role</Form.Label>
            <Form.Select
              aria-label="Role"
              name="role"
              onChange={(e) => setUser({ ...user, role: e.target.value })}
            >
              <option value="admin">Admin</option>
              <option selected value="user">
                User
              </option>
            </Form.Select>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="success"
          onClick={() => {
            user.role = user.role || "user";
            handleSave(user);
            handleClose();
          }}
        >
          Save changes
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default UserForm;
