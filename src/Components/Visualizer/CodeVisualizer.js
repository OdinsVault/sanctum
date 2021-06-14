import React from "react";
import {
  PageHeader,
  Card,
  Spin,
  Collapse,
  Row,
  Col,
  Switch,
  Slider,
  Button,
  Divider,
  Tabs,
  notification
} from "antd";
import { SettingTwoTone, SlidersFilled } from "@ant-design/icons";
import { withRouter } from "react-router";
import { VizLayout } from "./VizLayout";

//Editor imports
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/snippets/java";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-solarized_light";
import { CheckLogOnStatus } from "../../Services/UserLoginService";
import { getCodeVisualize } from "../../Services/VisualizerService";

const { Panel } = Collapse;
const { TabPane } = Tabs;
var key = 1;

class Visualizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answerCode: "", //code
      codeLoading: false, //page loader
      isVisualizerLoading: false, //visualize button submit loader
      visualizeData: null,
      editorTheme: "solarized_light",
      editorFontSize: 14,
      activeTab: "1",
      sourceMap: null,
      key: -1,
    };

    //console.log(this.state.visualizeData);
  }

  enableDarkMode = (checked) => {
    let theme = "";
    if (checked) {
      theme = "monokai";
    } else {
      theme = "solarized_light";
    }
    this.setState({
      editorTheme: theme,
    });
  };

  changeFontSize = (size) => {
    this.setState({
      editorFontSize: size,
    });
  };

  setCode = (e) => {
    this.setState({
      answerCode: e,
    });
  };

  reRender = () => {
    // calling the forceUpdate() method
    this.forceUpdate();
  };

  /* onVisualizeClick = () => {
    var data = await getCodeVisualize();
    this.setState({
      isVisualizerLoading: true,
      activeTab: "2",
    });
  }; */

  onVisualizeClick = async () => {
    var data = null;
    this.setState({
      isVisualizerLoading: true,
      answerCode: this.refs.aceEditor.editor.getValue(),
    });
    try {
      data = await getCodeVisualize(this.state.answerCode);

      if (data.status) {
        key++;
        this.setState({
          visualizeData: data.consoleResult.runtimeData,
          answerCode: data.consoleResult.answer,
          sourceMap: data.sourceMap,
          isVisualizerLoading: false,
          key: key,
          activeTab: "2",
        });

        //this.reRender();
      }
    } catch (e) {
      notification.error({
        message: "Error!",
        description: e.message ? e.message : "Error occurred while visualizing",
      });

      this.setState({ isVisualizerLoading: false });
    }
  };

  handleTabClick = (key) => {
    this.setState({
      activeTab: key,
    });
  };

  async componentDidMount() {
    let loggedIn = CheckLogOnStatus();
    if (loggedIn) {
      this.setState({
        codeLoading: true,
      });
      var state = await this.props.location.state;
      if (state) {
        await this.setCode(state.answerCode);
      }
      this.setState({
        codeLoading: false,
      });
    } else {
      this.props.history.push({
        pathname: `/dashboard`,
        state: "",
      });
    }
  }

  
  render() {
     return (
      <div>
        <Card>
          {/* <PageHeader className="site-page-header" title="Code Visualizer" /> */}
          <Col span={100}>
            <Tabs
              activeKey={this.state.activeTab}
              onTabClick={this.handleTabClick}
              //onChange={this.reRender}
            >
              <TabPane tab="Code" key="1">
                <Collapse
                  bordered={false}
                  defaultActiveKey={["1"]}
                  expandIcon={({ isActive }) => (
                    <SettingTwoTone rotate={isActive ? 90 : 0} />
                  )}
                  expandIconPosition="right"
                  className="site-collapse-custom-collapse"
                >
                  <Panel
                    header={<h3>Submit to visualize the code:</h3>}
                    key="3"
                    className="site-collapse-custom-panel"
                  >
                    <Row>
                      <Col span={6}>
                        Dark Mode :{" "}
                        <Switch
                          size={"small"}
                          onChange={this.enableDarkMode}
                        />
                      </Col>
                      <Col span={8}>
                        Font Size :{" "}
                        <Slider
                          defaultValue={14}
                          step={1}
                          min={10}
                          max={18}
                          onChange={this.changeFontSize}
                        />
                      </Col>
                    </Row>
                  </Panel>
                </Collapse>
                <br />
                <Spin spinning={this.state.codeLoading}>
                  <AceEditor
                    ref="aceEditor"
                    mode="java"
                    theme={this.state.editorTheme}
                    placeholder="Your Simply code here"
                    width={"990px"}
                    showPrintMargin={false}
                    fontSize={this.state.editorFontSize}
                    value={this.state.answerCode}
                    onChange={this.setCode}
                    name="UNIQUE_ID_OF_DIV"
                    editorProps={{ $blockScrolling: true }}
                    setOptions={{
                      enableBasicAutocompletion: true,
                      enableLiveAutocompletion: true,
                      enableSnippets: true,
                    }}
                  />
                </Spin>
                <br />
                <Col offset={20}>
                  <Button
                    type={"primary"}
                    onClick={this.onVisualizeClick}
                    loading={this.state.isVisualizerLoading}
                    shape="round"
                    icon={<SlidersFilled />}
                    size={"large"}
                  >
                    Visualize
                  </Button>
                </Col>
                <Divider />
              </TabPane>
              <TabPane
                tab="Visualizer"
                disabled={!this.state.isVisualizerLoading}
                key="2"
              >
                <VizLayout
                  key={key}
                  answerCode={this.state.answerCode}
                  runtimeData={this.state.visualizeData}
                  sourceMap={this.state.sourceMap}
                />
              </TabPane>
            </Tabs>
          </Col>
        </Card>
      </div>
    );
  }
}

export default withRouter(Visualizer);
