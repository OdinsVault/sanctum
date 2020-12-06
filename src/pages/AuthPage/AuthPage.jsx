import React, { Component } from "react";
import { Card, Col, Container, Tab, Tabs } from "react-bootstrap";
import SignInComponent from "../../components/SignInComponent/SignInComponent";
import SignUpComponent from "../../components/SignUpComponent/SignUpComponent";

export default class AuthPage extends Component {
  static state = {};

  render() {
    return (
      <Container>
        <Card className="ml-5 mr-5">
          <Tabs
            defaultActiveKey="home"
            transition={false}
            id="noanim-tab-example"
            className="ml-1"
          >
            <Tab eventKey="home" title="Sign up">
              <SignUpComponent />
            </Tab>
            <Tab eventKey="profile" title="Sign in">
              <SignInComponent />
            </Tab>
          </Tabs>
        </Card>
      </Container>
    );
  }
}
