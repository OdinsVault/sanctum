import React, { Component } from "react";
import {
  Button,
  Card,
  CardDeck,
  Col,
  Container,
  Image,
  Jumbotron,
} from "react-bootstrap";
import styles from "./HomePage.module.css";
import VisualiserService from "../../services/VisualizerService";

class HomeComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      code: "",
    };

    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onClickExecute = this.onClickExecute.bind(this);
  }
  onChangeHandler = (newValue) => {
    this.setState({
      code: newValue,
    });
  };
  onClickExecute = () => {
    console.log(this.state.code);
    VisualiserService.sendCodeSnippet(this.state.code).then((res) => {
      console.log(res.data);
    });
  };

  render() {
    return (
      <Container fluid="md">
        <Jumbotron className={styles.jumboStyle}>
          <Container fluid>
            <Col>
              <Image src="/assets/logo_vect.svg" className={styles.simplyImg} />
              <h1>Welcome to Simply!</h1>
              <p className="lead text-muted">
                Simply, a hastle free programming language for novice
                programmers to easily get into the world of programming. You can
                learn, practice and compete to polish you programming skills
                here...
              </p>
            </Col>
          </Container>
        </Jumbotron>
        <CardDeck className="mb-5 mt-0">
          <Card className={styles.cardWidth}>
            <Card.Img variant="top" src="/assets/learn_img.png" />
            <Card.Body>
              <Card.Title>Learn!</Card.Title>
              <Card.Text>
                Looking for a place to start coding? Here you will learn all the
                basic concepts you need to know when getting into programming...
              </Card.Text>
              <Button variant="primary">more</Button>
            </Card.Body>
          </Card>
          <Card className={styles.cardWidth}>
            <Card.Img variant="top" src="/assets/practice_img.png" />
            <Card.Body>
              <Card.Title>Practice!</Card.Title>
              <Card.Text>
                Know a bit of programming? Let's practice! You can practice the
                knowledge you have gained in a way you will never find anywhere
                else...
              </Card.Text>
              <Button variant="primary">more</Button>
            </Card.Body>
          </Card>
          <Card className={styles.cardWidth}>
            <Card.Img variant="top" src="/assets/compete_img.png" />
            <Card.Body>
              <Card.Title>Test Yourself!</Card.Title>
              <Card.Text>
                Wanna face a challange? Here you can compete with others and
                know where you can place youself amongst the best coders around
                the world...
              </Card.Text>
              <Button variant="primary">more</Button>
            </Card.Body>
          </Card>
        </CardDeck>
      </Container>
    );
  }
}

export default HomeComponent;
