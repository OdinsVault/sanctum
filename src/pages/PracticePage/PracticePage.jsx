import React, { Component } from "react";
import { Image, Tab, Row, Nav, Col, Container } from "react-bootstrap";
import QuestionTile from "../../components/QuestionTile/QuestionTile";
import styles from "./PracticePage.module.css";
import { SpinnerDotted } from "spinners-react";

export default class PracticePage extends Component {
  state = {
    loading: true,
    levelCount: 0,
    response: [],
    levels: [],
  };

  componentDidMount() {
    fetch("https://salty-plateau-13975.herokuapp.com/questions/bylevel")
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          response: data,
          loading: false,
          levelCount: data.levelCount,
          levels: data.levels,
        });
      })
      .catch(console.log);
  }

  generateTabs() {
    var tabs = [];
    for (var i = 1; i < this.state.levelCount + 1; i++) {
      tabs.push(
        <Nav.Item>
          <Nav.Link eventKey={i}>Level {i}</Nav.Link>
        </Nav.Item>
      );
    }
    return tabs;
  }

  generateQuestionTileList() {
    var questionsArray = [];
    this.state.levels.map((level) => {
      questionsArray.push(
        <Tab.Pane eventKey={level.level}>
          {level.questions.map((question) => {
            return <QuestionTile question={question} />;
          })}
        </Tab.Pane>
      );
    });
    return questionsArray;
  }

  showSpinner() {
    return (
      <div className="align-content-center">
        <SpinnerDotted />
      </div>
    );
  }

  render() {
    return (
      <Container fluid style={{ backgroundColor: "black" }}>
        <div className={styles.container}>
          <Image src="assets/alliens_attack.jpg" fluid className={styles.img} />
          <div className={styles.content}>
            <h3>The earth is under attack!!</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Vestibulum vestibulum tempor gravida. In vitae sodales nisl.
              Maecenas purus justo, consequat nec nunc at, ornare rhoncus lacus.
              Ut ac ante erat. Suspendisse semper massa eu nisi malesuada, id
              volutpat lorem auctor. Ut fermentum ex id metus bibendum
              fermentum. Morbi tempus tristique orci, eget lobortis augue
              ullamcorper ac. Phasellus vitae neque tincidunt, ullamcorper dolor
              ac, ullamcorper sapien. Duis dictum eget dui eu efficitur. Cras
              efficitur erat vitae tellus lobortis, vel facilisis augue
              pulvinar.
            </p>
          </div>
        </div>
        <Container fluid style={{ marginTop: "2rem" }}>
          <Tab.Container id="left-tabs" defaultActiveKey="first">
            <Row>
              <Col sm={3} className={styles.levelChooser}>
                <h2 style={{ color: "white" }}>Levels</h2>
                <Nav variant="pills" className="flex-column">
                  {this.state.loading
                    ? this.showSpinner()
                    : this.generateTabs()}
                </Nav>
              </Col>
              <Col sm={9}>
                <Tab.Content>
                  {this.state.loading
                    ? this.showSpinner()
                    : this.generateQuestionTileList()}
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Container>
      </Container>
    );
  }
}
