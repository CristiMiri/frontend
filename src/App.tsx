import React, { useState } from "react";
import logo from "./logo.svg";
import Navigation from "./Components/Navigation";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

import { Home } from "./Pages/Home";
import { Login } from "./Pages/Login";

import DeviceForm from "./Components/DeviceForm";
import Register from "./Pages/Register";
import UserPage from "./Pages/UserPage";
import UserForm from "./Components/UserForm";
import Profile from "./Pages/Profile";
import { User, dummyUsers } from "./models/user";
import { createContext } from "react";
import DevicesPage from "./Pages/DevicesPage";

function App() {
  const [globalUser, setGlobalUser] = useState<User | null>(null);

  const permisions = globalUser?.role === "admin" ? true : false;
  return (
    <div className="App bg-info-subtle vh-100">
      <header className="App-header">
        <Router>
          <Navigation />
          <Routes>
            <Route path="/register" Component={Register} />
            <Route path="/users" Component={UserPage} />
            <Route path="/devices" Component={DevicesPage} />
            <Route path="/testing" Component={Login} />
            <Route path="/" Component={Home} />
            <Route path="/login" Component={Login} />
            <Route path="/profile/:id" Component={Profile} />
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
