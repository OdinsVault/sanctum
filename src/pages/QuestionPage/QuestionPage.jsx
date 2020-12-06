import React, { Component } from "react";
import { Container, Breadcrumb, Card, Button, Row } from "react-bootstrap";
import AceEditor from "react-ace";
import styles from "./QuestionPage.module.css";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-eclipse";

export default class QuestionPage extends Component {
  state = {
    loading: true,
    question: [],
  };
  render() {
    // console.log(this.props.location.data.title);
    // const { data } = this.props.location;
    const data = {
      _id: "5fc5df9aac41713b613cd96e",
      title: "Question l3q1",
      description: "Helo i am the first question",
      inputs: "1,2,3,4",
      outputs: "12",
      difficulty: "Easy",
      level: "3",
      category: "string",
      __v: 0,
    };
    return (
      <Container>
        <Breadcrumb>
          <Breadcrumb.Item href="/practice">Practice</Breadcrumb.Item>
          <Breadcrumb.Item active>Question</Breadcrumb.Item>
        </Breadcrumb>
        <Card className="mt-3">
          <Card.Body>
            <Card.Title>{data.title}</Card.Title>
            <Card.Text>{data.description}</Card.Text>

            <h6>Sample Input</h6>
            <div className={styles.codeSmall}>
              <code>
                <p>{data.inputs}</p>
              </code>
            </div>
            <h6>Sample Output</h6>
            <div className={styles.codeSmall}>
              <code>
                <p>{data.outputs}</p>
              </code>
            </div>
          </Card.Body>
        </Card>

        <Card className="mt-3">
          <Card.Header>Answer</Card.Header>
          <AceEditor
            width="auto"
            mode="java"
            theme="eclipse"
            name="UNIQUE_ID_OF_DIV"
            editorProps={{ $blockScrolling: true }}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
            }}
          />
        </Card>
        <Row className="mt-3 mb-3 pr-3 pl-3 justify-content-end">
          <Button variant="light">Run Code</Button>
          <Button variant="success">Submit</Button>
        </Row>
      </Container>
    );
  }
}
