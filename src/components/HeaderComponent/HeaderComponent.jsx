import React, { Component } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Header.CSS";

class HeaderComponent extends Component {
  render() {
    return (
      <div>
        <Navbar bg="light" variant="light">
          <div className="container-fluid ml-5 mr-5 ml-5 mr-5">
            <Navbar.Brand href="/">
              <img
                src="/assets/logo_vect-removebg.png"
                alt="logo_img"
                className="App-logo"
              />
            </Navbar.Brand>
            <Nav className="mr-auto">
              <Link to="/" className="nav-link">
                HOME
              </Link>
              <Link to="/learn" className="nav-link">
                LEARN
              </Link>
              <Link to="/practice" className="nav-link">
                PRACTICE
              </Link>
              <Link to="/learn" className="nav-link">
                COMPETE
              </Link>
              <Link to="/learn" className="nav-link">
                DOCS
              </Link>
              <Link to="/learn" className="nav-link">
                RESOURCE
              </Link>
            </Nav>
            <Button variant="outline-info" className="mr-3" href="/auth">
              Sign in
            </Button>
            <Button variant="primary" href="/auth">
              Sign up
            </Button>
          </div>
        </Navbar>
      </div>
    );
  }
}

export default HeaderComponent;
