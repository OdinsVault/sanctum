import React from "react";
import "./visualizerSpace.css";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";

var imports = [];
var functions = [];
var variables = [];
var conditions = [];
var classList;
var loops = [];
var dataTypes = ["integer", "float", "boolean", "string", "character"];

export class VisualizerSpace extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: this.props.getCodeData.code,
      codeData: this.props.getCodeData.codeData,
      codeOrder: this.props.getCodeData.codeOrder,
      lineNumber: this.props.getCodeData.lineNumber,
    };

    imports = [];
    variables = [];
    loops = [];
    classList = {};

    this.getKeyIn = this.getKeyIn.bind(this);
    this.getPrint = this.getPrint.bind(this);
    this.getExternals = this.getExternals.bind(this);
    this.getFunctions = this.getFunctions.bind(this);
    this.getVariables = this.getVariables.bind(this);
    this.getConditions = this.getConditions.bind(this);
    this.getLoops = this.getLoops.bind(this);
    this.getClassName = this.getClassName.bind(this);

    this.getFunctions();
  }

  getKeyIn() {
    return "none";
  }

  getPrint() {
    var line = this.state.lineNumber;
    var data = "";
    if (line > 0) {
      var codeData = this.state.codeData[0].Value;
      var code = this.state.code[line+1];
      if (code.includes("print")) {
        var dataId = code.slice(code.lastIndexOf("print(")+6, code.lastIndexOf(");"));
        for(var key in codeData){
          if(key === dataId){
            data = codeData[key];
            break;
          }
        }
      }
    }
    return data;
  }

  getExternals() {
    var line = this.state.lineNumber;
    var data = "";
    if (line >= 0) {
      var code = this.state.code[line];
      if (code.includes("import")) {
        data = code.slice(7, code.lastIndexOf(";"));
      }
    }
    imports.push(data);
    return imports;
  }

  getFunctions() {
    functions = [];
    var code = this.state.code;
    for (var i = 0; i < code.length; i++) {
      var inputData = [];
      if (code[i].includes("function")) {
        var name = code[i].substring(
          code[i].lastIndexOf("function ") + 9,
          code[i].lastIndexOf("(")
        );

        var fin = code[i]
          .substring(code[i].lastIndexOf("in: ") + 3, code[i].lastIndexOf(")"))
          .replace(/ /g, "")
          .split(",");

        for (var j = 0; j < fin.length; j++) {
          for (var k = 0; k < dataTypes.length; k++) {
            if (fin[j].includes(dataTypes[k])) {
              inputData.push({
                type: dataTypes[k],
                name: fin[j].substring(dataTypes[k].length),
              });
            }
          }
        }

        var fout = code[i].substring(
          code[i].lastIndexOf("out: ") + 5,
          code[i].lastIndexOf(" {")
        );
        var data = {
          line: i+1,
          name: name,
          in: inputData,
          out: fout,
          value: null,
        };
        //console.log(data);
        functions.push(data);
      }
    }

    return functions;
  }

  getVariables() {
    var line = this.state.lineNumber;
    var code = this.state.code;
    var type = [];
    for (var l in code) {
      for (var t in dataTypes) {
        if (code[l].includes(dataTypes[t]) && l > 0) {
          type.push({
            line: l,
            type: dataTypes[t],
          });
          break;
        }
      }
    }

    var typeRender = [];
    for (var tp in type) {
      if (type[tp].line <= line) {
        typeRender.push(type[tp].type);
      }
    }

    if (line > 0) {
      var codeData = this.state.codeData[0].Value;
      var data = [];
      for (var key in codeData) {
        var count = 0;
        data.push({
          name: key,
          type: typeRender[count],
          value: codeData[key],
        });
        count++;
      }

      variables.push({
        line: line,
        data: data,
      });
    }
    return variables;
  }

  getConditions() {
    var line = this.state.lineNumber;
    var code = this.state.code;
    var codeOrder = this.state.codeOrder;
    var render = [];
    var val = "";
    var notTraversed = conditions.filter((i) => i.line === line).length === 0;

    if (line > 0 && notTraversed) {
      if (code[line].includes("if")) {
        var cond = code[line].substring(
          code[line].lastIndexOf("(") + 1,
          code[line].lastIndexOf("){")
        );

        for (var l = 0; l < codeOrder.length; l++) {
          if (codeOrder[l] === line) {
            val = codeOrder[l + 1] === line + 1 ? "true" : "false";
            break;
          }
        }

        var data = {
          condition: cond,
          value: val,
          line: line,
        };
        conditions.push(data);

        /* for (var op in operators) {
          for (var sub in subConditions) {
            if (subConditions[sub].includes(operators[op])) {
              var str = subConditions[sub].split(operators[op]);
              subConditions = [];
              for(var s in str){
                subConditions.push(str[s].trim());
              }
            }
          }
        } */
      }
    }
    render = conditions.filter((i) => i.line <= line);
    return render;
  }

  getLoops() {
    var line = this.state.lineNumber;
    var code = this.state.code;
    var range, start, endId, end, nextId, nextVal, data;
    var next = "";

    if (code[line].includes("repeat")) {
      range = code[line]
        .slice(
          code[line].lastIndexOf("range:") + 6,
          code[line].lastIndexOf("next") - 2
        )
        .trim();
      start = parseInt(range.slice(0, range.lastIndexOf("to")).trim());
      endId = range.slice(range.lastIndexOf("to") + 3).trim();
      end = variables[0].data.filter((i) => i.name === endId)[0].value;
      nextId = code[line]
        .slice(
          code[line].lastIndexOf("integer") + 7,
          code[line].lastIndexOf("; range:")
        )
        .trim();
      nextVal = parseInt(
        code[line].slice(
          code[line].lastIndexOf("next:") + 5,
          code[line].lastIndexOf("){")
        )
      );

      data = {
        line: line,
        range: range,
        start: start,
        end: end,
        next: next,
      };
    }
    if (variables.length !== 0) {
      var id = variables[0].data.filter((i) => i.name === nextId);
      if (id.length !== 0) {
        next = id[0].value + nextVal;
        data.next = next;
      }
    }

    loops.push(data);
    //console.log(loops);

    if (loops[0] !== undefined) {
      return loops;
    } else {
      return [];
    }
  }

  getClassName() {
    var funcClass,
      varClass,
      ifClass,
      printClass,
      loopClass = "table-not-highlight";
    var code = this.state.code;
    var line = this.state.lineNumber;
    var codeData = this.state.codeData;
    if (code[line] !== undefined) {
      funcClass = code[line].includes("function") 
      ? "table-highlight" 
      : "table-not-highlight";
      ifClass = code[line].includes("if")
        ? "table-highlight"
        : "table-not-highlight";
      loopClass = code[line].includes("repeat")
        ? "table-highlight"
        : "table-not-highlight";
      printClass = code[line+1].includes("print")
        ? "table-highlight"
        : "table-not-highlight"
      if (line > 0) {
        varClass =
          codeData[0].Value.length !== 0
            ? "table-highlight"
            : "table-not-highlight";
      }

      classList = {
        function: funcClass,
        variable: varClass,
        condition: ifClass,
        loop: loopClass,
        print: printClass,
      };
      //console.log(classList);
    }
  }

  render() {
    this.getClassName();
    return (
      <div>
        <h3 class="h3 text-center pb-3">Visualization Panel</h3>
        <Row>
          <Col className="col-6">
            <p className="p text-center p-box">
              Keyboard input: {this.getKeyIn()}
            </p>
          </Col>
          <Col className="col-6">
            <p className={classList.print + " p text-center p-box"}>
              Print: {this.getPrint()}
            </p>
          </Col>
        </Row>
        <Row>
          <Col className="col-12">
            <div className="p text-center py-1 mb-3 p-box">
              External Libraries:
              {this.getExternals().map((lib, i) => (
                <p key={i}>{lib}</p>
              ))}
            </div>
          </Col>
        </Row>

        <div>
          <p className="p text-center">Program Area:</p>
          {this.getFunctions().map((func, i) => (
            <Row key={i}>
              <Col className="col-12">
                <div className="p text-center p-3 p-box">
                  <Row className="mb-2">
                    <Col className="col-6">
                      <div
                        className={
                          classList.function + " table-responsive table-outer"
                        }
                      >
                        <Table className="table-bordered text-light table-func">
                          <thead>
                            <tr>
                              <th scope="col" colspan="2">
                                Function :
                              </th>
                              <th scope="col" colspan="4">
                                {func.name}
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td colspan="1">Parameter</td>
                              <td colspan="1">Data type</td>
                              <td colspan="1">Name</td>
                              <td colspan="1">Value</td>
                            </tr>
                            <tr>
                              <td colspan="1">In</td>
                              <td colspan="1">
                                {func.in.map((obj) => (
                                  <p className="p-0 m-0">{obj.type}</p>
                                ))}
                              </td>
                              <td colspan="1">
                                {func.in.map((obj) => (
                                  <p className="p-0 m-0">{obj.name}</p>
                                ))}
                              </td>
                              <td colspan="1">
                                {func.in.map((obj) => (
                                  <p className="p-0 m-0">{obj.value}</p>
                                ))}
                              </td>
                            </tr>
                            <tr>
                              <td colspan="1">Out</td>
                              <td colspan="1">{func.out}</td>
                              <td colspan="1"></td>
                              <td colspan="1"></td>
                            </tr>
                          </tbody>
                        </Table>
                      </div>
                    </Col>
                    <Col className="col-6">
                      <div
                        className={
                          classList.variable + " table-responsive table-outer"
                        }
                      >
                        <Table className="table-bordered text-light table-var">
                          <thead>
                            <tr>
                              <th scope="col" colspan="6">
                                Variables and Constants:
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td colspan="2">Data type</td>
                              <td colspan="2">Name</td>
                              <td colspan="2">Value</td>
                            </tr>
                            {this.getVariables().map((line) =>
                              line.data.map((data, i) => (
                                <tr key={i}>
                                  <td colspan="2">{data.type}</td>
                                  <td colspan="2">{data.name}</td>
                                  <td colspan="2">{data.value}</td>
                                </tr>
                              ))
                            )}
                          </tbody>
                        </Table>
                      </div>
                    </Col>
                  </Row>

                  <Row>
                    <Col className="col-6">
                      <div
                        className={
                          classList.condition + " table-responsive table-outer"
                        }
                      >
                        <Table className="table-bordered text-light table-if">
                          <thead>
                            <tr>
                              <th scope="col" colspan="6">
                                IF conditions :
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td colspan="4">Condition</td>
                              <td colspan="2">Result</td>
                            </tr>
                            {this.getConditions().map((line) => (
                              <tr>
                                <td colspan="4">{line.condition}</td>
                                <td colspan="2">{line.value}</td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </div>
                    </Col>
                    <Col className="col-6">
                      <div
                        className={
                          classList.loop + " table-responsive table-outer"
                        }
                      >
                        <Table className="table-bordered text-light table-loop">
                          <thead>
                            <tr>
                              <th scope="col" colspan="6">
                                Loops :
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td colspan="3">Range</td>
                              <td colspan="1">Start Value</td>
                              <td colspan="1">End Value</td>
                              <td colspan="1">Next</td>
                            </tr>
                            {this.getLoops().map((data) => (
                              <tr>
                                <td colspan="3">{data.range}</td>
                                <td colspan="1">{data.start}</td>
                                <td colspan="1">{data.end}</td>
                                <td colspan="1">{data.next}</td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          ))}
        </div>
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-JEW9xMcG8R+pH31jmWH6WWP0WintQrMb4s7ZOdauHnUtxwoG2vI5DkLtS3qm9Ekf"
          crossorigin="anonymous"
        ></script>
      </div>
    );
  }
}
