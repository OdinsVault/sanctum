import React from "react";
import MetaTags from "react-meta-tags";

import "./viz-layout.css";
import { CodeSpace } from "./Code Space/codeSpace";
//import {VisualizerSpace} from './Visualizer Space/visualizerSpace';
import { Visualizer } from "./Visualizer Space/Visualizer";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

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
    };

    this.handleCodeData = this.handleCodeData.bind(this);
    //this.handleVizData = this.handleVizData.bind(this);
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

  /* handleVizData(vizData) {
    this.setState({ vizData: vizData });
  } */

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

        <Navbar className="navbar navbar-dark d-none  bg-dark">
          <div className="container-fluid">
            <span className="navbar-brand mb-0 h1">Navbar</span>
          </div>
        </Navbar>

        <Container className="container container-fluid">
          <Row className="row p-2">
            <Col className="col-3 m-2 p-3 outer" id="codeSpace">
              <CodeSpace
                getCodeData={this.handleCodeData}
                /* getVizData={this.state.vizData}
                key={this.state.key} */
              />
            </Col>
            <Col className="col-8 m-2 p-3 outer" id="visualizer">
              <Visualizer
                getCodeData={this.state}
                key={this.state.key}
                /* getVizData={this.handleVizData} */
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

