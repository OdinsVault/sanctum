import React, { Component } from "react";
import AceEditor from "react-ace";
import "../App.css";
import VisualiserService from "../services/VisualizerService";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";

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
      <div className="container-fluid">
        <h1>Home</h1>
        <div className="ace-editor ace-tm">
          <AceEditor
            mode="java"
            theme="github"
            onChange={this.onChangeHandler}
            name="UNIQUE_ID_OF_DIV"
            editorProps={{ $blockScrolling: true }}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
            }}
          />
        </div>
        <div>
          <button className="btn btn-primary" onClick={this.onClickExecute}>
            Execute
          </button>
        </div>
      </div>
    );
  }
}

export default HomeComponent;
