import React, { useContext, useEffect } from "react";
import UserTable from "../Components/UserTable";
import { Button, Container } from "react-bootstrap";

type Props = {};

export const Home = (props: Props) => {
  useEffect(() => {}, []);
  return (
    <Container className="mt-5">
      <h1>Welcome to Energy Monitor</h1>
      <p>
        Monitor and manage your energy consumption with our innovative energy
        monitoring app.
      </p>
      <p>
        Keep track of your electricity usage, set goals to save energy, and
        contribute to a sustainable future.
      </p>
      <p>
        <Button variant="primary" href="#/dashboard">
          Get Started
        </Button>
      </p>
    </Container>
  );
};

export default Home;
