import React from 'react';
import {PageHeader, Card, Spin, Collapse, Row, Col, Switch, Slider, Button, Divider} from 'antd';
import {SettingTwoTone, SlidersFilled} from "@ant-design/icons";
import {withRouter} from 'react-router';

//Editor imports
import AceEditor from "react-ace"
import "ace-builds/src-noconflict/snippets/java";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-solarized_light";
import {CheckLogOnStatus} from "../../Services/UserLoginService";

const {Panel} = Collapse;

class Visualizer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            answerCode: '', //code
            codeLoading: false,  //page loader
            isVisualizerLoading: false, //visualize button submit loader
            editorTheme: 'solarized_light',
            editorFontSize: 14
        };
    }

    enableDarkMode = (checked) => {
        let theme = ''
        if (checked) {
            theme = "monokai"
        } else {
            theme = 'solarized_light'
        }
        this.setState({
            editorTheme: theme
        })
    }

    changeFontSize = (size) => {
        this.setState({
            editorFontSize: size
        })
    }

    setCode = (e) => {
        this.setState({
            answerCode: e
        })
    }

    onVisualizeClick = () => {
        this.setState({
            isVisualizerLoading: true
        })
    }

    async componentDidMount() {
        let loggedIn = CheckLogOnStatus();
        if (loggedIn) {
            this.setState({
                codeLoading: true
            })
            var state = await this.props.location.state
            if (state) {
                await this.setCode(state.answerCode)
            }
            this.setState({
                codeLoading: false
            })
        } else {
            this.props.history.push({
                pathname: `/dashboard`,
                state: ''
            });
        }
    }

    render() {
        return (
            <div>
                <Card>
                    <PageHeader className="site-page-header" title="Code Visualizer"/>
                    <Col span={20}>
                        <Collapse
                            bordered={false}
                            defaultActiveKey={['1']}
                            expandIcon={({isActive}) => <SettingTwoTone
                                rotate={isActive ? 90 : 0}/>}
                            expandIconPosition='right'
                            className="site-collapse-custom-collapse"
                        >
                            <Panel header={<h3>Submit to visualize the code:</h3>} key="3"
                                   className="site-collapse-custom-panel">
                                <Row>
                                    <Col span={6}>Dark Mode : <Switch size={'small'}
                                                                      onChange={this.enableDarkMode}/></Col>
                                    <Col span={8}>Font Size : <Slider defaultValue={14}
                                                                      step={1} min={10}
                                                                      max={18}
                                                                      onChange={this.changeFontSize}/></Col>
                                </Row>
                            </Panel>
                        </Collapse>
                        <Spin spinning={this.state.codeLoading}>
                            <AceEditor
                                mode="java"
                                theme={this.state.editorTheme}
                                placeholder="Your Simply code here"
                                width={'990px'}
                                showPrintMargin={false}
                                fontSize={this.state.editorFontSize}
                                value={this.state.answerCode}
                                onChange={this.setCode}
                                name="UNIQUE_ID_OF_DIV"
                                editorProps={{$blockScrolling: true}}
                                setOptions={{
                                    enableBasicAutocompletion: true,
                                    enableLiveAutocompletion: true,
                                    enableSnippets: true
                                }}
                            />
                        </Spin>
                        <br/>
                        <Col offset={20}>
                            <Button type={'primary'} onClick={this.onVisualizeClick}
                                    loading={this.state.isVisualizerLoading}
                                    shape="round" icon={<SlidersFilled/>} size={"large"}>Visualize</Button>
                        </Col>
                        <Divider/>
                        {/*////////////Add visualizer below here///////////////*/}
                    </Col>
                </Card>
            </div>
        )
    }
}

export default withRouter(Visualizer);


