import axios from "axios";
import { log, time } from "console";
import React from "react";
import { Button, Container, Form } from "react-bootstrap";
import { redirect, useNavigate } from "react-router-dom";
import { User } from "../models/user";
import globlaUser from "../Api/GlobalUser";

type Props = {};
export const Login = (props: Props) => {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [validated, setValidated] = React.useState(false);

  const handleSubmit = (event: any) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      setValidated(true);
      handleLogin(email, password);
    }
  };

  const handleLogin = async (email: string, password: string) => {
    const userData = {
      email: email,
      password: password,
    };
    const url = "http://localhost:8080/user/login";
    await axios
      .post(url, userData)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setValidated(true);
          const user: User = response.data;
          localStorage.setItem("user", JSON.stringify(user));
          if (user.role === "user") {
            navigate("/profile/" + user.id);
          } else {
            navigate("/users");
          }
        } else {
          alert("Invalid email or password");
        }
      })
      .catch((error) => {
        setValidated(false);
        alert("Invalid email or password");
      });
  };

  return (
    <Container className="mx-auto w-50 mt-5  bg-info rounded border border-dark p-5">
      <Form noValidate validated={validated}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Please enter a email.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Please enter a password.
          </Form.Control.Feedback>
        </Form.Group>

        <div className="text-center">
          <Button
            variant="primary"
            type="button"
            className="mt-3"
            onClick={handleSubmit}
          >
            Login
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default Login;
