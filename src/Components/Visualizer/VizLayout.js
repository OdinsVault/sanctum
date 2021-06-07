import React from "react";
import MetaTags from "react-meta-tags";

import "./viz-layout.scoped.css";
import "bootstrap/dist/css/bootstrap.css";
import { CodeSpace } from "./Code Space/codeSpace";
import { Visualizer } from "./Visualizer Space/Visualizer";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Container";

var key = -1;

export class VizLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: [],
      codeData: [],
      lineNumber: -1,
      codeOrder: [],
      key: -1,
      vizData: null,
      answerCode: this.props.answerCode,
    };

    this.handleCodeData = this.handleCodeData.bind(this);
    console.log(this.state.answerCode);
  }

  handleCodeData(data, line, code, order) {
    key++;
    this.setState({
      code: code,
      codeData: data,
      lineNumber: line,
      codeOrder: order,
      key: key,
    });
  }

  render() {
    return (
      <div className="viz-wrapper">
        <MetaTags>
          <meta charset="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1"
          ></meta>
          <link rel="preconnect" href="https://fonts.gstatic.com"></link>
          <link
            href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300&display=swap"
            rel="stylesheet"
          ></link>
          <script
            src="https://kit.fontawesome.com/fbc9100e97.js"
            crossorigin="anonymous"
          ></script>
        </MetaTags>

        <Container className="container container-fluid py-4">
          <Row className="row p-2">
            <Col className="col-3 p-3 outer" id="codeSpace">
              <CodeSpace
                getCodeData={this.handleCodeData}
              />
            </Col>
            <Col className="col-8 p-3 outer" id="visualizer">
              <Visualizer
                getCodeData={this.state}
                key={this.state.key}
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

