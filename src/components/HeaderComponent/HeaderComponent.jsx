import React, { Component } from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
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
              <Nav.Link href="/">HOME</Nav.Link>
              <Nav.Link href="/learn">LEARN</Nav.Link>
              <Nav.Link href="#pricing">PRACTICE</Nav.Link>
              <Nav.Link href="#pricing">COMPETE</Nav.Link>
              <Nav.Link href="#pricing">DOCS</Nav.Link>
              <Nav.Link href="#pricing">RESOURCE</Nav.Link>
              <Nav.Link href="#pricing">PRACTICE</Nav.Link>
            </Nav>
            <Form inline>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
              />
              <Button variant="outline-info">Search</Button>
            </Form>
          </div>
        </Navbar>
      </div>
    );
  }
}

export default HeaderComponent;
