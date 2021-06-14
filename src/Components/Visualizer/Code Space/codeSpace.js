import React from "react";
import "./codeSpace.scoped.css";
import "bootstrap/dist/css/bootstrap.css";
import alien from "./assets/spacep.png";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ReactHtmlParser from "react-html-parser";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStepBackward,
  faStop,
  faStepForward,
  faPlay,
  faBookOpen,
  faExclamationCircle,
  faFastForward,
  faFastBackward,
} from "@fortawesome/free-solid-svg-icons";

//var data = require("../code.json");
//var sourceMap = require("../sourceMap.json");
var comments = require("./assets/comments.json");

var currentLine = 0;
var codeOrder, interval;
var next,
  back = 0;
var repeat = 0;
var stop = true;
var dataTypes = ["integer", "float", "boolean", "string", "character"];
var keywords = [
  "function",
  "in",
  "out",
  "get",
  "global",
  "display",
  "input",
  "if",
  "else",
  "repeat",
  "range",
  "next",
  "return",
];
var commentTag = 0;
var commentNextClass = "btn-comment";
var commentBackClass = "btn-comment d-none";
var functionList = [];
var popoverClass = {
  all: "d-none",
  next: "disabled",
  back: "disabled",
};

export class CodeSpace extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      code: this.props.answerCode.toString().split("\n"),
      /* [
        "get io;",
        "",
        "global integer a = 5;",
        "",
        "function main(in: ) out: no {",
        "integer b = 4;",
        "integer sum = 0;",
        "if(a<b){",
        "sum = add(a,b);",
        "}",
        "if(a>b){",
        "repeat(integer i; range: 0 to 5; next: 1){",
        "sum = sum + i;",
        "}",
        "}",
        "display(sum);",
        "}",
        "",
        "function add(in: integer x, integer y) out: integer {",
        "return x + y;",
        "}",
        "function main(in: ) out: no {",
        "integer a = 3;",
        "integer b = 4;",
        "integer sum = 0;",
        "if(a<b){",
        "sum = a + b;",
        "}",
        "repeat(integer i; range: 0 to a; next:1){",
        "sum = sum + 1;",
        "}",
        'display("sum =" + sum);',
        "}",
      ], */
      currentLine: this.props.startLine,
      lineData: [],
      vizData: this.props.getVizData,
      commentData: (comments.welcome + comments.externals)
        .split(".")
        .filter((i) => i !== ""),
      commentTag: 0,
      popoverClass: "d-none",
      answerCode: this.props.answerCode.toString().split("\n"),
      runtimeData: JSON.parse(this.props.runtimeData),
      sourceMap: this.props.sourceMap,
    };

    //console.log(this.state.runtimeData[0]);
    repeat = 0;

    this.onClickNext = this.onClickNext.bind(this);
    this.onClickBack = this.onClickBack.bind(this);
    this.onClickStop = this.onClickStop.bind(this);
    this.onClickStart = this.onClickStart.bind(this);
    this.onComments = this.onComments.bind(this);
    this.onCommentNext = this.onCommentNext.bind(this);
    this.onCommentBack = this.onCommentBack.bind(this);
    this.onSkipFunction = this.onSkipFunction.bind(this);
    this.setPopoverClass = this.setPopoverClass.bind(this);
    this.highlightCode = this.highlightCode.bind(this);
    this.renderCode = this.renderCode.bind(this);

    this.mapCodeOrder();
    this.getFunctionList();
  }

  mapCodeOrder() {
    const data = this.state.runtimeData;
    const sourceMap = this.state.sourceMap;

    codeOrder = [];
    data.map((obj) => {
      var line = sourceMap.filter(
        (i) => i.Java === parseInt(obj.Line.slice(9))
      );
      codeOrder.push(line[0].Simply - 1);
    });
    //codeOrder[codeOrder.length-1] = codeOrder[codeOrder.length-1] - 2;
    /* codeOrder.pop();
    var last = codeOrder.pop();
    codeOrder.push(last-3); */
    //console.log(sourceMap);

    //console.log(codeOrder);
    next = codeOrder.indexOf(currentLine);
    back = next;

    //console.log(codeOrder);
  }

  highlightCode(line) {
    for (var i in keywords) {
      var text = "<span style='color: blue;'>" + keywords[i] + "</span>";
      line = line.replaceAll(
        new RegExp("\\b" + keywords[i] + "\\b", "g"),
        text
      );
    }
    for (var i in dataTypes) {
      var text = "<span style='color: red;'>" + dataTypes[i] + "</span>";
      line = line.replaceAll(
        new RegExp("\\b" + dataTypes[i] + "\\b", "g"),
        text
      );
    }
    return line;
  }

  renderCode(line) {
    if (line.includes("<")) {
      return line.slice(line.indexOf("<"));
    } else {
      return "";
    }
  }

  onClickNext() {
    var code = this.state.code;
    if (next < codeOrder.length - 1) {
      if (currentLine < codeOrder[0]) {
        var blank = 0;
        for (var i = currentLine; i < codeOrder[0] - 1; i++) {
          if (code[i + 1] === "") {
            blank++;
          } else {
            break;
          }
        }
        currentLine += blank + 1;
      } else {
        next++;
        back = next;
        currentLine = codeOrder[next];
      }
      repeat = 0;

      for (var i = 0; i < next; i++) {
        if (codeOrder[i] === codeOrder[next]) {
          repeat++;
        }
      }
      //console.log(currentLine);
    }
    commentTag = 0;
    this.onComments();
    this.onVisualizeData(currentLine, repeat);

    this.setState({
      currentLine: currentLine,
      commentTag: commentTag,
      popoverClass: popoverClass,
    });
  }

  onClickBack() {
    var code = this.state.code;
    if (currentLine <= codeOrder[0] && currentLine !== 0) {
      var blank = 0;
      //console.log(currentLine);
      for (var i = currentLine; i >= 0; i--) {
        if (code[i - 1] === "") {
          blank++;
        } else {
          break;
        }
      }
      currentLine -= blank + 1;
    } else if (back >= 1) {
      back--;
      next = back;
      currentLine = codeOrder[back];
    }
    if (codeOrder[back] !== codeOrder[back - 1]) {
      repeat = 0;
    } else {
      var count = 0;
      for (var i = back - 1; i > 0; i--) {
        if (codeOrder[back] === codeOrder[i]) {
          count++;
        } else {
          break;
        }
      }
      repeat = count;
    }
    commentTag = 0;

    this.onComments();
    this.onVisualizeData(currentLine, repeat);
    this.setState({
      currentLine: currentLine,
      commentTag: commentTag,
      popoverClass: popoverClass,
    });
  }

  onClickStop() {
    stop = true;
    clearInterval(interval);
  }

  onClickStart() {
    stop = false;
    this.onClickNext();
    if (!stop) {
      interval = setInterval(() => {
        if (next < codeOrder.length - 1) {
          this.onClickNext();
        } else {
          currentLine = 0;
          this.setState({ currentLine: currentLine });
          next = codeOrder.indexOf(currentLine);
          back = next;
          this.onClickStop();
        }
      }, 2000);
    }
  }

  getClassName(i) {
    if (
      i === currentLine &&
      (currentLine <= codeOrder[0] || currentLine === codeOrder[next])
    ) {
      return "highlight";
    } else {
      return "not-highlight";
    }
  }

  onVisualizeData(sourceLine, repeat) {
    const data = this.state.runtimeData;
    const sourceMap = this.state.sourceMap;
    //console.log(data);

    var source = sourceMap.filter((i) => i.Simply === sourceLine + 1);
    if (source !== undefined) {
      var newData = [];
      var lineData = [];
      if (sourceLine < codeOrder[0]) {
        newData = [];
        newData.push(data[0]);
      } else {
        /* for (var i in data) {
          console.log(data[i].Line);
          if (parseInt(data[i].Line.slice(9)) === source[0].Java) {
            newData.push(data[i]);
          }
        } */
        newData = data.filter(
                 (i) => parseInt(i.Line.slice(9)) === source[0].Java
               );
      }
      lineData.push(newData[repeat]);
      //console.log(lineData);

      this.handleVisualize(
        lineData,
        currentLine - 1,
        this.state.code,
        codeOrder
      );
      this.setState({ lineData: lineData });
    }
  }

  handleVisualize(data, line, code, order) {
    this.props.getCodeData(data, line, code, order);
  }

  onComments() {
    var line = currentLine;
    var code = this.state.code;
    var commentData = "";
    var funcName = "";

    if (line !== 0 && code[line]!==undefined) {
      if (code[line].includes("function")) {
        funcName = code[line].slice(
          code[line].lastIndexOf("function") + 9,
          code[line].lastIndexOf("in:") - 1
        );
        commentData = comments.insideFunctions + funcName + ".";
      }
    }

    if(code[line] !== undefined){

      if (code[line].includes("if") || code[line].includes("else")) {
        commentData += comments.conditions;
      } else if (code[line].includes("global")) {
        commentData += comments.globals;
      } else if (code[line].includes("repeat")) {
        commentData += comments.loops;
      } else if (code[line].includes("display")) {
        commentData += comments.prints;
      } else if (code[line].includes("input()")) {
        commentData += comments.keyins;
      } else if (code[line].includes("get ")) {
        commentData += comments.externals;
      } else if (code[line].includes("return ")) {
        commentData += comments.return;
      } else {
        for (var i in dataTypes) {
          if (code[line].includes(dataTypes[i])) {
            commentData +=
              comments.variables +
              " This variables is a " +
              dataTypes[i] +
              ". " +
              comments.varTable;
            break;
          }
        }
      }
    }
    var render = commentData.split(".").filter((i) => i !== "");
    this.setCommentClass(render);

    this.setState({ commentData: render });
  }

  onCommentNext() {
    var comments = this.state.commentData;
    if (commentTag !== comments.length - 1) {
      commentTag++;
    }
    this.setCommentClass(comments);
    this.setState({ commentTag: commentTag });
  }

  onCommentBack() {
    var comments = this.state.commentData;
    if (commentTag > 0) {
      commentTag--;
    }
    this.setCommentClass(comments);
    this.setState({ commentTag: commentTag });
  }

  setCommentClass(comments) {
    commentNextClass =
      commentTag === comments.length - 1 ? "btn-comment d-none" : "btn-comment";
    commentBackClass = commentTag === 0 ? "btn-comment d-none" : "btn-comment";
  }

  setPopoverClass() {
    var line = currentLine;
    var nextLine = codeOrder[codeOrder.indexOf(line) + 1];
    var prevLine = codeOrder[codeOrder.indexOf(line) - 1];

    for (var i = 0; i < functionList.length; i++) {
      if (i !== functionList.length - 1) {
        if (
          line <= functionList[i].endLine &&
          nextLine >= functionList[i + 1].startLine
        ) {
          popoverClass.next = "";
        } else {
          popoverClass.next = "disabled";
        }
      }
      if (i > 0) {
        if (
          prevLine >= functionList[i].startLine &&
          line <= functionList[i - 1].endLine
        ) {
          popoverClass.back = "";
        } else {
          popoverClass.back = "disabled";
        }
      }
      popoverClass.all =
        popoverClass.next !== "disabled" || popoverClass.back !== "disabled"
          ? "popover-row"
          : "d-none";
    }
    return popoverClass;
  }

  getFunctionList() {
    var code = this.state.code;
    var count = 0;
    functionList = [];

    for (var l in code) {
      if (code[l].includes("function ")) {
        functionList.push({
          name: code[l].slice(
            code[l].lastIndexOf("function") + 9,
            code[l].lastIndexOf("in:") - 1
          ),
          startLine: l,
          endLine: 0,
        });

        count++;
      }
    }

    for (var i = 0; i < count; i++) {
      if (i !== count - 1) {
        functionList[i].endLine = functionList[i + 1].startLine - 1;
      } else {
        functionList[i].endLine = code.length - 1;
      }
    }
    //console.log(functionList);
  }

  onSkipFunction(flag) {
    var func = 0;
    for (var i = 0; i < functionList.length - 1; i++) {
      if (
        currentLine >= functionList[i].startLine &&
        currentLine <= functionList[i].endLine
      ) {
        func = i;
        break;
      }
    }
    if (flag === "next") {
      var newLine = codeOrder
        .slice(codeOrder.indexOf(currentLine) + 1)
        .filter((i) => i < functionList[func].endLine)[0];
      next = codeOrder.indexOf(newLine) - 1;
      this.onClickNext();
    } else if (flag === "back") {
      var newLineList = codeOrder
        .slice(0, codeOrder.indexOf(currentLine) - 1)
        .filter((i) => i > functionList[func].startLine);
      //console.log(newLineList);
      var newLine = newLineList[newLineList.length - 1];
      back = codeOrder.indexOf(newLine) + 1;
      this.onClickBack();
    }
    var pClass = this.setPopoverClass();
    this.setState({ popoverClass: pClass });
  }

  render() {
    return (
      <div className="red-font">
        <Row>
          <Col className="col-12 pl-0">
            <ol>
              {this.state.code.map((line, i) => (
                <li className={this.getClassName(i)} key={i}>
                  {ReactHtmlParser(this.highlightCode(line))}
                  <span>{this.renderCode(line)}</span>
                </li>
              ))}
            </ol>
          </Col>
        </Row>

        <Row>
          <Col className="pr-0 pl-3">
            <Button className="btn-sm mb-3" onClick={this.onClickBack}>
              <FontAwesomeIcon icon={faStepBackward} />
            </Button>
          </Col>
          <Col className="p-0">
            <Button className="btn-sm mb-3" onClick={this.onClickStop}>
              <FontAwesomeIcon icon={faStop} />
            </Button>
          </Col>
          <Col className="p-0">
            <Button className="btn-sm mb-3" onClick={this.onClickStart}>
              <FontAwesomeIcon icon={faPlay} />
            </Button>
          </Col>
          <Col className="p-0">
            <Button className="btn-sm mb-3" onClick={this.onClickNext}>
              <FontAwesomeIcon icon={faStepForward} />
            </Button>
          </Col>
        </Row>
        <Row className={this.setPopoverClass().all}>
          <Col />
          <Col className="p-0">
            <Button
              className={this.setPopoverClass().back + " btn-sm mb-3"}
              onClick={() => this.onSkipFunction("back")}
            >
              <FontAwesomeIcon icon={faFastBackward} />
            </Button>
          </Col>
          <Col className="p-0">
            <Button
              className={this.setPopoverClass().next + " btn-sm mb-3"}
              onClick={() => this.onSkipFunction("next")}
            >
              <FontAwesomeIcon icon={faFastForward} />
            </Button>
          </Col>
          <Col>
            <div className="fade-animation">
              <div className="popup-div">
                <Row className="mr-2 ml-2">
                  <Col className="text-left pl-0 mt-0 pt-1">
                    <FontAwesomeIcon
                      icon={faExclamationCircle}
                      className="mr-2"
                    />
                    <strong>Warning: New Function</strong>
                  </Col>
                </Row>

                <Row className="mr-2 ml-2">
                  <p className="mb-0 pb-2">
                    If you click
                    {popoverClass.next === "" ? (
                      <FontAwesomeIcon
                        icon={faStepForward}
                        className="ml-2 mr-2"
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faStepBackward}
                        className="ml-2 mr-2"
                      />
                    )}
                    you will enter
                    <br /> a new function.
                    <br />
                    Click
                    {popoverClass.next === "" ? (
                      <FontAwesomeIcon
                        icon={faFastForward}
                        className="ml-2 mr-2"
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faFastBackward}
                        className="ml-2 mr-2"
                      />
                    )}
                    to skip!
                  </p>
                </Row>
              </div>
            </div>
          </Col>
        </Row>

        <Row>
          <Col className="col-2">
            <img className="img-alien" src={alien} alt="alien" />
          </Col>
          <Col className="col-10">
            <Card className="card text-light comment-box">
              <div className="card-body pb-2 pt-2 pl-2 pr-4">
                <h5 className="notes card-title">
                  Notes : <FontAwesomeIcon icon={faBookOpen} />
                </h5>
                <p>
                  {this.state.commentData.filter(
                    (comment, i) => i === commentTag
                  )}
                </p>
                <Row>
                  <Col className="text-left pr-0">
                    <Button
                      className={commentBackClass + " p-0 btn-cor"}
                      onClick={this.onCommentBack}
                    >
                      &#8810;<u>Prev</u>
                    </Button>
                  </Col>
                  <Col className="text-right p-0">
                    <Button
                      className={commentNextClass + " p-0 btn-cor"}
                      onClick={this.onCommentNext}
                    >
                      <u>Next</u>&#8811;
                    </Button>
                  </Col>
                </Row>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
