import React from "react";
//import "./visualizerSpace.css";
import "./Visualizer.css";
import rocket from "../Code Space/assets/rocket.png";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import TabContent from "react-bootstrap/TabContent";

var imports = [],
  functions = [],
  variables = [],
  conditions = [],
  traversed = [],
  printData = [],
  loops = [],
  listData = [],
  globals = [],
  locals = [];
var classList;
var dataTypes = ["integer", "float", "boolean", "string", "character"];
var activeTab = 0;

export class Visualizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: this.props.getCodeData.code,
      codeData: this.props.getCodeData.codeData,
      codeOrder: this.props.getCodeData.codeOrder,
      lineNumber: this.props.getCodeData.lineNumber,
      vizData: null,
      activeTab: 0,
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
    this.handleSelect = this.handleSelect.bind(this);
    this.switchTab = this.switchTab.bind(this);
    this.getLists = this.getLists.bind(this);

    this.getFunctions();
    this.switchTab();
    //this.onVisualizeData();
  }

  handleSelect(key) {
    activeTab = key;
    //console.log(activeTab);
    this.setState({ activeTab: activeTab });
  }

  intializeData() {
    variables = [];
    conditions = [];
    var line = this.state.lineNumber;
    var codeOrder = this.state.codeOrder;

    for (var f in functions) {
      variables.push({
        function: functions[f].name,
        functionData: [],
      });
    }

    traversed = codeOrder.slice(0, codeOrder.lastIndexOf(line + 1));
  }

  switchTab() {
    var line = this.state.lineNumber + 1;
    activeTab = 0;
    for (var j = 0; j < functions.length; j++) {
      if (j < functions.length - 1) {
        if (
          j < functions.length - 1 &&
          line > functions[j].line &&
          line < functions[j + 1].line
        ) {
          activeTab = j;
        }
      } else if (j === functions.length - 1 && line >= functions[j].line) {
        activeTab = j;
      }
    }
  }

  getKeyIn() {
    var render = [];
    var line = this.state.lineNumber;
    return render;
  }

  getPrint() {
    printData = [];
    var line = this.state.lineNumber;
    var codeBlock = this.state.code;
    var data = "";

    for (var i = 1; i < codeBlock.length - 1; i++) {
      var codeData = this.state.codeData[0].Value;
      var code = codeBlock[i + 1];

      if (code.includes("display")) {
        var dataId = code.slice(
          code.lastIndexOf("display(") + 8,
          code.lastIndexOf(");")
        );

        dataId = dataId.split("+");
        data = "";

        for (var j in dataId) {
          dataId[j] = dataId[j].trim(" ");
          if (dataId[j].indexOf('"') === 0) {
            data += dataId[j].slice(1, -1) + " ";
          } else {
            for (var key in codeData) {
              dataId[j] = dataId[j];
              if (key === dataId[j]) {
                data += codeData[key] + " ";
                break;
              }
            }
          }
        }

        printData.push({
          line: i,
          data: data,
        });

        //console.log(printData);
      }
    }

    var render = [];
    for (var p in printData) {
      if (traversed.lastIndexOf(printData[p].line) !== -1) {
        render.push(printData[p]);
      } else if (printData[p].line === line) {
        render.push(printData[p]);
      }
    }
    return render;
  }

  getExternals() {
    imports = [];
    var line = this.state.lineNumber;
    var data = "";
    if (line >= 0) {
      var code = this.state.code[line];
      if (code.includes("get ")) {
        data = code.slice(4, code.lastIndexOf(";"));
      }
      imports.push(data);
    }
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
          line: i + 1,
          name: name,
          in: inputData,
          out: fout,
          value: null,
        };
        functions.push(data);
      }
    }
    //console.log(functions);
    this.intializeData();

    return functions;
  }

  getConditions() {
    conditions = [];
    var code = this.state.code;
    var codeOrder = this.state.codeOrder;
    var val = "";

    for (var i = 1; i < code.length; i++) {
      if (code[i].includes("if")) {
        var cond = code[i].substring(
          code[i].lastIndexOf("(") + 1,
          code[i].lastIndexOf("){")
        );

        for (var l = 0; l < codeOrder.length; l++) {
          if (codeOrder[l] === i) {
            val = codeOrder[l + 1] === i + 1 ? "true" : "false";
            break;
          } else {
            val = false;
          }
        }

        var data = {
          condition: cond,
          value: val,
          line: i,
        };

        for (var j = 0; j < functions.length; j++) {
          if (j < functions.length - 1) {
            if (i > functions[j].line && i < functions[j + 1].line) {
              conditions.push({
                functionLine: functions[j].line,
                functionName: functions[j].name,
                data: data,
              });
            }
          } else if (j === functions.length - 1 && i > functions[j].line) {
            conditions.push({
              functionLine: functions[j].line,
              functionName: functions[j].name,
              data: data,
            });
          }
        }
        //console.log(conditions);
      }
    }

    var render = [];
    for (var c in conditions) {
      if (traversed.lastIndexOf(conditions[c].data.line) !== -1) {
        render.push(conditions[c]);
      }
    }
    //console.log(render);
    return render;
  }

  getVariables() {
    var line = this.state.lineNumber;
    var code = this.state.code;
    var type = [];
    globals = [];
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

      if (code[l].includes("global ")) {
        var gtype = "";
        var gval = code[l]
          .slice(code[l].lastIndexOf("=") + 1, code[l].lastIndexOf(";"))
          .trim(" ");
        var name = code[l]
          .slice(code[l].lastIndexOf("global") + 6, code[l].lastIndexOf("="))
          .trim(" ");
        for (var t in dataTypes) {
          if (name.includes(dataTypes[t])) {
            name = name
              .slice(name.indexOf(dataTypes[t]) + dataTypes[t].length)
              .trim(" ");
            gtype = dataTypes[t];
          }
        }

        globals.push({
          name: name,
          type: gtype,
          value: parseInt(gval),
          line: l,
        });
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
      var func = this.state.codeData[0].Function;
      var data = [];
      for (var key in codeData) {
        var count = 0;
        if (
          !code[line].includes("global") &&
          globals.filter((i) => i.name === key).length === 0
        ) {
          data.push({
            name: key,
            type: typeRender[count],
            value: codeData[key],
          });
        } else if (globals.filter((i) => i.name === key).length !== 0) {
          globals.filter((i) => i.name === key)[0].value = codeData[key];
          globals.filter((i) => i.name === key)[0].type = typeRender[count];
        }
        count++;
      }

      for (var i in variables) {
        variables[i].functionData = [];
        if (variables[i].function === func) {
          variables[i].functionData.push({
            line: line,
            data: data,
          });
        }
      }
    }

    /* var gRender = [];
    for (var g in globals) {
       console.log(globals[g]);
      if (traversed.lastIndexOf(parseInt(globals[g].line)) !== -1) {
        gRender.push(globals[g]);
      }
    }
    console.log(gRender); */

    var render = {
      variables: variables,
      globals: globals,
    };
    console.log(render);
    return render;
  }

  getLoops() {
    loops = [];
    var code = this.state.code;
    var range, start, endId, end, nextId, nextVal, data;
    var next = "";

    for (var i = 2; i < code.length; i++) {
      if (code[i].includes("repeat")) {
        range = code[i]
          .slice(
            code[i].lastIndexOf("range:") + 6,
            code[i].lastIndexOf("next") - 2
          )
          .trim();
        start = parseInt(range.slice(0, range.lastIndexOf("to")).trim());
        endId = range.slice(range.lastIndexOf("to") + 3).trim();
        end = "";
        nextId = code[i]
          .slice(
            code[i].lastIndexOf("integer") + 8,
            code[i].lastIndexOf("; range:")
          )
          .trim();
        nextVal = parseInt(
          code[i].slice(
            code[i].lastIndexOf("next:") + 5,
            code[i].lastIndexOf("){")
          )
        );

        data = {
          line: i,
          range: range,
          start: start,
          end: end,
          next: next,
        };

        var id;
        for (var j = 0; j < functions.length; j++) {
          if (j < functions.length - 1) {
            if (i > functions[j].line && i < functions[j + 1].line) {
              if (variables[j].functionData[0].length !== 0) {
                id = variables[j].functionData[0].data.filter(
                  (d) => d.name === nextId
                );
                if (id.length !== 0) {
                  next = id[0].value + nextVal;
                  data.next = next;
                }

                data.end = variables[j].functionData[0].data.filter(
                  (v) => v.name === endId
                )[0].value;
              }

              loops.push({
                functionLine: functions[j].line,
                functionName: functions[j].name,
                data: data,
              });
            }
          } else if (j === functions.length - 1 && i > functions[j].line) {
            if (variables[j].functionData.length !== 0) {
              id = variables[j].functionData[0].data.filter(
                (d) => d.name === nextId
              );
              if (id.length !== 0) {
                next = id[0].value + nextVal;
                data.next = next;
              }

              data.end = variables[j].functionData[0].data.filter(
                (v) => v.name === endId
              )[0].value;
            }

            loops.push({
              functionLine: functions[j].line,
              functionName: functions[j].name,
              data: data,
            });
          }
        }
      }
    }

    var render = [];
    for (var r in loops) {
      if (traversed.lastIndexOf(loops[r].data.line) !== -1) {
        render.push(loops[r]);
      }
    }
    return render;
  }

  getLists() {
    listData = [];
    var code = this.state.code;

    for (var i in code) {
      if (code[i].includes("list")) {
        var name = code[i]
          .slice(code[i].lastIndexOf("list:"), code[i].lastIndexOf("="))
          .trim(" ");
        var type = "";

        for (var t in dataTypes) {
          if (name.includes(dataTypes[t])) {
            type = dataTypes[t];
            name = name.slice(name.lastIndexOf(type) + type.length).trim(" ");
            break;
          }
        }

        var values = code[i]
          .slice(code[i].lastIndexOf("[") + 1, code[i].lastIndexOf("]"))
          .split(",");

        var data = {
          line: i,
          name: name,
          type: type,
          values: values,
        };

        for (var j = 0; j < functions.length; j++) {
          if (j < functions.length - 1) {
            if (i > functions[j].line && i < functions[j + 1].line) {
              listData.push({
                functionLine: functions[j].line,
                functionName: functions[j].name,
                data: data,
              });
            }
          } else if (j === functions.length - 1 && i > functions[j].line) {
            listData.push({
              functionLine: functions[j].line,
              functionName: functions[j].name,
              data: data,
            });
          }
        }
      }
    }

    var render = [];
    for (var l in listData) {
      if (traversed.indexOf(parseInt(listData[l].data.line)) !== -1) {
        render.push(listData[l]);
      }
    }
    return render;
  }

  getClassName() {
    var funcClass,
      varClass,
      ifClass,
      printClass,
      loopClass,
      libClass,
      globalClass,
      inputClass = "table-not-highlight";
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
      printClass = code[line + 1].includes("display")
        ? "table-highlight"
        : "table-not-highlight";
      libClass = code[line].includes("get")
        ? "table-highlight"
        : "table-not-highlight";
      inputClass = code[line].includes("input()")
        ? "table-highlight"
        : "table-not-highlight";
      globalClass = code[line].includes("global")
        ? "table-highlight"
        : "table-not-highlight";
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
        lib: libClass,
        input: inputClass,
        global: globalClass
      };

      //console.log(classList);
    }
  }

  /* onVisualizeData(){
    var vizData = {};
    var line = this.state.lineNumber;
    console.log(line);

    var functions = this.getFunctions();
    var variables = this.getVariables();
    var conditions = this.getConditions();
    var loops = this.getLoops();
    var keyins = this.getKeyIn();
    var externals = this.getExternals();
    var prints = this.getPrint();

    vizData = {
      line: line,
      data: {
        functions: functions,
        variables: variables,
        conditions: conditions,
        loops: loops,
        keyins: keyins,
        externals: externals,
        prints: prints
      }
    };

    this.handleVisualize(vizData);
    this.setState({vizData: vizData});
  }

  handleVisualize(vizData){
    this.props.getVizData(vizData);
  }
 */

  render() {
    this.getClassName();

    return (
      <div>
        <Row>
          <Col className="col-6">
            <div className="p text-center p-box mb-3">
              Keyboard input:
              {this.getKeyIn().map((k, i) => (
                <p className={classList.input + " mb-0"}>{k}</p>
              ))}
            </div>
          </Col>
          <Col className=" col-5">
            <div className="p text-center mb-3 p-box">
              Display:
              {this.getPrint().map((p, i) => (
                <p className={classList.print + " mb-0"} key={i}>
                  {p.data}
                </p>
              ))}
            </div>
          </Col>
          <Col className="col-1">
            <img className="img-rocket" src={rocket} alt="rocket"></img>
          </Col>
        </Row>
        <Row>
          <Col className="col-6">
            <div className="p text-center mb-3 p-box">
              Global Variables:
              <div
                className={classList.global + " table-responsive table-outer"}
              >
                <Table className="table-bordered text-light">
                  <thead className="table-var-head">
                    <tr>
                      <td colSpan="2">Data type</td>
                      <td colSpan="2">Name</td>
                      <td colSpan="2">Value</td>
                    </tr>
                  </thead>
                  <tbody className="table-var">
                    {this.getVariables().globals.map((data, i) => (
                      <tr key={i}>
                        <td colspan="2">{data.type}</td>
                        <td colspan="2">{data.name}</td>
                        <td colspan="2">{data.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
          </Col>
          <Col className="col-5">
            <div className="p text-center mb-3 p-box">
              External Libraries:
              {this.getExternals().map((lib, i) => (
                <p className={classList.libClass + " mb-0"} key={i}>
                  {lib}
                </p>
              ))}
            </div>
          </Col>

          <Col className="col-1"></Col>
        </Row>
        <div>
          <p className="h4 text-center">Function Area:</p>
          <Tabs
            activeKey={activeTab}
            onSelect={(key) => this.handleSelect(key)}
          >
            {this.getFunctions().map((func, i) => (
              <Tab
                eventKey={i}
                title={"Function: " + func.name}
                className="tabClass"
              >
                <TabContent>
                  <Row key={i} className="mb-2">
                    <Col className="col-12">
                      <div className="p text-center p-3">
                        <Row className="mb-2">
                          <Col className="col-6">
                            <div
                              className={
                                classList.function +
                                " table-responsive table-outer"
                              }
                            >
                              <Table className="table-bordered text-light">
                                <thead className="table-func-head">
                                  <tr>
                                    <th scope="col" colspan="2">
                                      Function :
                                    </th>
                                    <th scope="col" colspan="4">
                                      {func.name}
                                    </th>
                                  </tr>
                                  <tr>
                                    <td colspan="1">Parameter</td>
                                    <td colspan="1">Data type</td>
                                    <td colspan="1">Name</td>
                                    {/* <td colspan="1">Value</td> */}
                                  </tr>
                                </thead>
                                <tbody className="table-func">
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
                                    {/* <td colspan="1">
                                {func.in.map((obj) => (
                                  <p className="p-0 m-0">{obj.value}</p>
                                ))}
                              </td> */}
                                  </tr>
                                  <tr>
                                    <td colspan="1">Out</td>
                                    <td colspan="1">{func.out}</td>
                                    <td colspan="1"></td>
                                    {/* <td colspan="1"></td> */}
                                  </tr>
                                </tbody>
                              </Table>
                            </div>
                          </Col>
                          <Col className="col-6">
                            <div
                              className={
                                classList.variable +
                                " table-responsive table-outer"
                              }
                            >
                              <Table className="table-bordered text-light">
                                <thead className="table-var-head">
                                  <tr>
                                    <th scope="col" colspan="6">
                                      Variables and Constants:
                                    </th>
                                  </tr>
                                  <tr>
                                    <td colSpan="2">Data type</td>
                                    <td colSpan="2">Name</td>
                                    <td colSpan="2">Value</td>
                                  </tr>
                                </thead>
                                <tbody className="table-var">
                                  {this.getVariables()
                                    .variables.filter(
                                      (f) => f.function === func.name
                                    )[0]
                                    .functionData.map((line) =>
                                      line.data.map((data, i) => (
                                        <tr key={i}>
                                          <td colspan="2">{data.type}</td>
                                          <td colspan="2">{data.name}</td>
                                          <td colspan="2">{data.value}</td>
                                        </tr>
                                      ))
                                    )}
                                  {this.getLists()
                                    .filter((f) => f.functionName === func.name)
                                    .map((line, i) => (
                                      <tr key={i}>
                                        <td colspan="2">
                                          list: {line.data.type}
                                        </td>
                                        <td colspan="2">{line.data.name}</td>
                                        <td colspan="2">
                                          <tr>
                                            <td className="border-0"></td>
                                            {line.data.values.map((value) => (
                                              <td className="list-data pl-2 pr-2">
                                                {value}
                                              </td>
                                            ))}
                                          </tr>
                                          <tr>
                                            <td className="border-0">Index:</td>
                                            {line.data.values.map(
                                              (values, v) => (
                                                <td className="border-0 pl-2 pr-2">
                                                  {v}
                                                </td>
                                              )
                                            )}
                                          </tr>
                                          {/* {line.data.values.map((value, l) => (
                                            <tr>
                                              <td colspan="1">{l}:</td>
                                              <td colspan="1">{value}</td>
                                            </tr>
                                          ))} */}
                                        </td>
                                      </tr>
                                    ))}
                                </tbody>
                              </Table>
                            </div>
                          </Col>
                        </Row>

                        <Row>
                          <Col className="col-6">
                            <div
                              className={
                                classList.condition +
                                " table-responsive table-outer"
                              }
                            >
                              <Table className="table-bordered text-light">
                                <thead className="table-if-head">
                                  <tr>
                                    <th scope="col" colspan="6">
                                      IF conditions :
                                    </th>
                                  </tr>
                                  <tr>
                                    <td colspan="4">Condition</td>
                                    <td colspan="2">Result</td>
                                  </tr>
                                </thead>
                                <tbody className="table-if">
                                  {this.getConditions()
                                    .filter(
                                      (cond) => cond.functionLine === func.line
                                    )
                                    .map((line) => (
                                      <tr>
                                        <td colspan="4">
                                          {line.data.condition}
                                        </td>
                                        <td colspan="2">{line.data.value}</td>
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
                              <Table className="table-bordered text-light">
                                <thead className="table-loop-head">
                                  <tr>
                                    <th scope="col" colspan="6">
                                      Loops :
                                    </th>
                                  </tr>
                                  <tr>
                                    <td colspan="3">Range</td>
                                    <td colspan="1">Start Value</td>
                                    <td colspan="1">End Value</td>
                                    <td colspan="1">Next</td>
                                  </tr>
                                </thead>
                                <tbody className="table-loop">
                                  {this.getLoops()
                                    .filter(
                                      (loop) => loop.functionLine === func.line
                                    )
                                    .map((data) => (
                                      <tr>
                                        <td colspan="3">{data.data.range}</td>
                                        <td colspan="1">{data.data.start}</td>
                                        <td colspan="1">{data.data.end}</td>
                                        <td colspan="1">{data.data.next}</td>
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
                </TabContent>
              </Tab>
            ))}
          </Tabs>
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
