import React, { Component } from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";

class HeaderComponent extends Component {
  render() {
    return (
      <div>
        <Navbar bg="dark" variant="dark">
          <div className="container-fluid ml-5 mr-5 ml-5 mr-5">
            <Navbar.Brand href="#home">Navbar</Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#features">Features</Nav.Link>
              <Nav.Link href="#pricing">Pricing</Nav.Link>
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
