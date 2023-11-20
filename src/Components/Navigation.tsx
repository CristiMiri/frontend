import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
type Props = {};

export const Navigation = (props: Props) => {
  const globalUser = localStorage.getItem("user");
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/">
          <FontAwesomeIcon icon={faHouse} />
          Home
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/devices">Devices</Nav.Link>
          <Nav.Link href="/users">Users</Nav.Link>
        </Nav>

        <Nav.Link href="/login">
          <Button variant="outline-success">Login</Button>
        </Nav.Link>
        <Nav.Link href="/">
          <Button
            variant="outline-danger mx-2"
            onClick={() => {
              localStorage.removeItem("user");
            }}
          >
            Logout
          </Button>
        </Nav.Link>
      </Container>
    </Navbar>
  );
};

export default Navigation;
