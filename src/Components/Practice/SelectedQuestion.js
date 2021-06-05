import React from 'react';
import {withRouter} from 'react-router';
import {Context} from "../../ConfigProvider";

//EDITOR
import AceEditor from "react-ace"
import "ace-builds/src-noconflict/snippets/java";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";

//SERVICES
import {getQuestionById, runPracticeAnswer, submitPracticeAnswer} from "../../Services/PracticeService";
import { getCompeteQuestionById, runCompeteAnswer, submitCompeteAnswer, translateCode } from "../../Services/CompeteService";

//STYLES
import {Button, Col, PageHeader, Card, Row, Tabs, Descriptions, notification,
    Spin, Result, Collapse, Switch, Slider, Typography, List, Progress, Select,
} from 'antd';
import {SettingTwoTone, CheckCircleTwoTone, CloseCircleTwoTone} from '@ant-design/icons';
import {CheckLogOnStatus} from "../../Services/UserLoginService";


const { TabPane } = Tabs;
const {Panel} = Collapse;
const { Paragraph } = Typography;
const { Option } = Select;


class Question extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            locState: '',                   //previous page
            course: '',
            question: '',                   //should be removed
            qL: '',                         //selected question sent from previous page
            selectedQuestion: '',           //question with all the details
            loading: false,
            answerCode: CODE_ON_LOAD,
            mainClass: '',
            runLoading: false, runCaseResult: '', runCasePassed: false, runCaseFailed: false,
            submitLoading: false, submitCaseResult: '', submitCasePassed: false, submitCaseFailed: false,
            compileError: false,
            editorTheme: 'github',
            editorFontSize: 14,
            codeLang: 'eng', translationLoading: false,
        };
    }

    getQuestion = async (ques) => {

        var question = ''

        this.setState({
            loading: true
        })
        try {
            if (this.props.location.state === "compete") {
                question = await getCompeteQuestionById(ques.questionId);
            } else {
                question = await getQuestionById(ques.questionId);
            }
            if (!question) {
                notification.error({message: "Error", description: "Something went wrong please try again!"})
                // this.props.history.goBack();
            } else {
                this.setState({
                    selectedQuestion: question,
                })
            }

        } catch (e) {
            notification.error({message: "Error", description: e.message ? e.message : ""})
        }
        this.setState({
            loading: false
        })
    }

    enableDarkMode = (checked) => {
        let theme = ''
        if (checked) {
            theme = "monokai"
        } else {
            theme = 'github'
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

    runCode = async () => {

        var submission = {
            answer: this.state.answerCode ? this.state.answerCode : "",
            lang: this.state.codeLang || 'eng'
        }

        this.setState({
            runLoading: true,
            runCasePassed: false,
            runCaseFailed: false,
            submitCasePassed: false,
            submitCaseFailed: false,
            compileError: false
        })
        try {
            if (!submission.answer) {
                notification.warn({
                    message: 'Warning!',
                    description: 'Cannot run if the answer code is empty'
                })
            } else {
                var success;
                if (this.props.location.state === "compete") {
                    success = await runCompeteAnswer(this.state.selectedQuestion._id, submission)
                } else {
                    success = await runPracticeAnswer(this.state.selectedQuestion._id, submission)
                }
                if (success) {
                    this.setState({
                        runCaseResult: success
                    })

                    let alreadyAnswered = !success.consoleResult //check if question already passed
                    if (alreadyAnswered) {
                        notification.info({message: success.message})
                    } else {
                        if (!success.consoleResult.passed) {
                            if (success.consoleResult.compilerResult.status === (-1)) {
                                this.setState({
                                    compileError: true
                                })
                                notification.error({message:"Failed", description:"Compile errors"})
                            } else {
                                this.setState({
                                    runCaseFailed: true
                                })
                                notification.error({message:"Failed", description:"Test case failed"})
                            }
                        } else {
                            this.setState({
                                runCasePassed: true
                            })
                            notification.info({message: success.message})
                        }
                    }
                }
            }
        } catch (e) {
            notification.error({message: "Error Code Execution!", description: e.message ? e.message : ""})
        }
        this.setState({
            runLoading: false
        })
    }
    submitCode = async () => {

        var submission = {
            answer: this.state.answerCode ? this.state.answerCode : "",
            lang: this.state.codeLang || 'eng'
        }
        this.setState({
            submitLoading: true,
            submitCasePassed: false,
            submitCaseFailed: false,
            runCasePassed: false,
            runCaseFailed: false,
            compileError: false
        })
        try {
            if (!submission.answer) {
                notification.warn({
                    message: 'Warning!',
                    description: 'Cannot submit if the answer code is empty'
                })
            }  else {
                var success;
                if (this.props.location.state === "compete") {
                    success = await submitCompeteAnswer(this.state.selectedQuestion._id, submission)
                } else {
                    success = await submitPracticeAnswer(this.state.selectedQuestion._id, submission)
                }
                if (success) {
                    this.setState({
                        submitCaseResult: success
                    })

                    let alreadyAnswered = !success.consoleResult //check if question already passed

                    if (alreadyAnswered) {
                        notification.info({message: success.message})
                    } else {
                        if (!success.consoleResult.passed) { //if failed
                            if (success.consoleResult.compilerResult.status === (-1)) {
                                this.setState({
                                    compileError: true //if compile error
                                })
                                notification.error({message:"Failed", description:"Compile errors"})
                            } else {
                                this.setState({
                                    submitCaseFailed: true //if test cases failed
                                })
                                notification.error({message:"Failed", description:"Test case failed"})
                            }
                        } else {
                            this.setState({
                                submitCasePassed: true
                            })
                            notification.success({message:"Success",description:success.message})
                        }
                    }
                }

            }
        } catch (e) {
            notification.error({message: "Error!", description: e.message ? e.message : ""})
        }

        this.setState({
            submitLoading: false
        })
    }

    sendCodeToVisualizer = () => {

        var code = {
            answerCode: this.state.answerCode,
        }
        if (!code.answerCode) {
            notification.warn({
                message: 'Warning!',
                description: 'Cannot submit if the answer code is empty'
            })
        } else if(this.state.codeLang !== 'eng'){
            notification.warn({
              message: "Warning!",
              description:
                "Cannot visualize non-English codes. Please switch back to English first",
            });
        } else {

            const {setMenuKey} = this.context;
            setMenuKey('5');

            this.props.history.push({
                pathname: '/codeVisualizer',
                state: code
            })
        }
    }

    goBack = () => {
        if (this.state.locState === "compete") {
            this.props.history.push({
                pathname: `/compete/overview`,
                state: this.state.course
            });
        } else {
            var name = this.state.course.category.split(" ").join("")
            this.props.history.push({
                pathname: `/practice/${name}`,
                state: this.state.course
            });
        }
    }

    getResults = () => {
        if (this.state.compileError) { // compilation errors
            if (this.state.runCaseResult) {
                return (<Result
                    status="warning"
                    title="Code execution failed!"
                    subTitle="Cannot compile your code!">
                        <Paragraph style={{whiteSpace: 'pre-wrap'}}>
                           <b>stdout:</b>  <br/>
                           {this.state.runCaseResult.consoleResult.compilerResult.stdout?this.state.runCaseResult.consoleResult.compilerResult.stdout:''}
                        </Paragraph>
                        <Paragraph style={{whiteSpace: 'pre-wrap'}}>
                           <b>stderr:</b> <br/> 
                           {this.state.runCaseResult.consoleResult.compilerResult.stderr?this.state.runCaseResult.consoleResult.compilerResult.stderr:''}
                        </Paragraph>
                    </Result>)
            } else if (this.state.submitCaseResult) {
                return (<Result
                    status="warning"
                    title="Code execution failed!"
                    subTitle="Cannot compile your code!">
                        <Paragraph style={{whiteSpace: 'pre-wrap'}}>
                           <b>stdout:</b> <br/>
                           {this.state.submitCaseResult.consoleResult.compilerResult.stdout?this.state.submitCaseResult.consoleResult.compilerResult.stdout:''}
                        </Paragraph>
                        <Paragraph style={{whiteSpace: 'pre-wrap'}}>
                           <b>stderr:</b> <br/>
                           {this.state.submitCaseResult.consoleResult.compilerResult.stderr?this.state.submitCaseResult.consoleResult.compilerResult.stderr:''}
                        </Paragraph>
                    </Result>)
            }
        } else { // no compilation errors
            if (this.state.submitCasePassed || this.state.submitCaseFailed) { // list of testcases when submitted
                return (<List
                    size="default"
                    header={
                        <div>
                            {this.state.submitCasePassed ?
                                (<Col offset={11}><Progress
                                    type="circle" percent={100}
                                    width={50}
                                    format={() => 'Done'}/></Col>) :
                                (<Col offset={11}><Progress
                                    type="circle" percent={60}
                                    status="exception" width={50}
                                    format={() => 'Failed'}/></Col>)
                            }
                        </div>}
                    bordered
                    dataSource={this.state.submitCaseResult.consoleResult.testResults}
                    renderItem={item =>
                        <List.Item>
                            {item.status === 0 ?
                                (<CheckCircleTwoTone
                                    twoToneColor="#52c41a"/>) :
                                (<CloseCircleTwoTone
                                    twoToneColor="#f0133c"/>)}
                            {item.testCase.title}
                        </List.Item>}
                />)
            } else if (this.state.runCaseFailed || this.state.runCasePassed) {
                return (<Result
                    status={this.state.runCasePassed?'success':'error'}
                    title={this.state.runCasePassed?'Test case Passed!':'Test case failed!'}>
                    <div className="desc">
                        <Paragraph style={{whiteSpace: 'pre-wrap'}}>
                            <b>Your output:</b> <br/>
                            {this.state.runCaseResult.consoleResult.testResults.stdout?this.state.runCaseResult.consoleResult.testResults.stdout:''}
                        </Paragraph>
                        <Paragraph style={{whiteSpace: 'pre-wrap'}}>
                            <b>Testcase output:</b> <br/>{this.state.selectedQuestion.outputs}
                        </Paragraph>
                    </div>
                </Result>)
            } else return null;
        }
    }

    translateCode = async () => {
        this.setState({ translationLoading: true });
        try {
            const translated = await translateCode({
                answer: this.state.answerCode || '',
                lang: this.state.codeLang || 'eng'
            });
            this.setCode(translated.stdout);
        } catch (err) {
            notification.error({ message: 'Error!', description: err.message ? err.message : '' })
        }
        this.setState({ translationLoading: false })
    }

    async componentDidMount() {
        let loggedIn = CheckLogOnStatus();
        if (loggedIn) {
            if (!this.props.location.question || !this.props.location.state) {
                this.props.history.push({
                    pathname: '/practice/overview'
                });
            } else {
                var question = this.props.location.question; //selected question
                var course = this.props.location.course ? this.props.location.course : ''; //practice course
                var prev = this.props.location.state   //previous is 'practice' or 'compete'
                this.setState({
                    locState: prev,
                    course: course,
                    qL: question
                })
                await this.getQuestion(question);
            }
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

                <Card title={<PageHeader className="site-page-header"
                                         title={this.state.selectedQuestion.title}/>}
                      extra={<Button onClick={() => this.goBack()}>Back</Button>}>

                    <div className="site-card-wrapper">
                        <Row>
                            <Col span={18}>
                                <Tabs defaultActiveKey="1" type="card">
                                    <TabPane tab="Problem" key="1">
                                        <Spin spinning={this.state.loading}>
                                            {!this.state.selectedQuestion ?
                                                (
                                                    <Result
                                                        status="500"
                                                        title="500"
                                                        subTitle="Sorry, something went wrong."
                                                    />
                                                )
                                                : (
                                                    <div>
                                                        <h3>Description:</h3>
                                                        <div>
                                                            {this.state.selectedQuestion.description}
                                                        </div>
                                                        <br/>
                                                        <h3>Input Format:</h3>
                                                        <div style={{whiteSpace: 'pre-wrap'}}>

                                                            "{this.state.selectedQuestion.inputs}"
                                                        </div>
                                                        <br/>
                                                        <h3>Expected Output:</h3>
                                                        <div style={{whiteSpace: 'pre-wrap'}}>
                                                            "{this.state.selectedQuestion.outputs}"
                                                        </div>
                                                        <br/><br/>
                                                        <Collapse
                                                            ghost
                                                            bordered={false}
                                                            defaultActiveKey={['1']}
                                                            expandIcon={({isActive}) => <SettingTwoTone
                                                                rotate={isActive ? 90 : 0}/>}
                                                            expandIconPosition='right'
                                                            className="site-collapse-custom-collapse"
                                                        >
                                                            <Panel header={<h3>Code here:</h3>} key="3"
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
                                                        <AceEditor
                                                            mode="java"
                                                            theme={this.state.editorTheme}
                                                            placeholder="Your Simply code here"
                                                            width={'900px'}
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
                                                        {/*<TextArea rows={10} showCount*/}
                                                        {/*          value={this.state.answerCode}*/}
                                                        {/*          onChange={this.setCode}/>*/}
                                                        <br/>
                                                        <Row>
                                                            <Col offset={14}>
                                                                <Button type="default" loading={this.state.runLoading}
                                                                        onClick={() => this.runCode()}>
                                                                    <b>Run Code</b>
                                                                </Button>
                                                            </Col>
                                                            <Col>
                                                                <Button type="primary"
                                                                        onClick={() => this.submitCode()}><b>Submit
                                                                    Code</b></Button>
                                                            </Col>
                                                            <Col offset={1}>
                                                                <Button
                                                                    onClick={() => this.sendCodeToVisualizer()}><b>Visualizer</b></Button>
                                                            </Col>

                                                        </Row>
                                                        <br/><br/>
                                                        {
                                                            this.state.runCaseResult || this.state.submitCaseResult ?
                                                            <h3>Results: </h3> : ''
                                                        }
                                                        {this.state.runLoading || this.state.submitLoading ? (
                                                            <Spin tip="Loading..."/>) : ''}
                                                        <div className="result">
                                                            {this.getResults()}
                                                        </div>
                                                    </div>
                                                )}
                                        </Spin>
                                    </TabPane>
                                </Tabs>
                            </Col>
                            <Col offset={1} span={5}>
                                <Card>
                                    <Descriptions title={this.state.selectedQuestion.title} size={'small'} column={1}>
                                        {this.state.locState !=='compete'?<Descriptions.Item
                                            label="Level"> {this.state.selectedQuestion.level}</Descriptions.Item>:''}
                                            <br/>
                                        <Descriptions.Item
                                            label="Category">{this.state.selectedQuestion.category}</Descriptions.Item><br/>
                                        <Descriptions.Item
                                            label="Difficulty"> {this.state.selectedQuestion.difficulty}</Descriptions.Item><br/>
                                        <Descriptions.Item
                                            label="Points">{this.state.selectedQuestion.pointsAllocated}</Descriptions.Item><br/>
                                    </Descriptions>
                                </Card>

                                <Card title="Translate code" style={{ margin: '50% auto' }}>
                                    <Row style={{ margin: '1rem auto' }}>
                                        <Col style={{ padding: '0.5rem 1rem' }}>From: </Col>
                                        <Col>
                                            <Select style={{ width: 120 }} defaultValue={this.state.codeLang} onChange={(e) => this.setState({ codeLang: e })}>
                                                <Option value="eng">English</Option>
                                                <Option value="sn">සිංහල</Option>
                                            </Select></Col>
                                    </Row>
                                    <Row style={{ margin: '1rem auto' }}>
                                        <Col offset={5}>
                                            <p>to: {this.state.codeLang === 'sn' ? 'English' : 'සිංහල'}</p>
                                        </Col>
                                    </Row>
                                    <Row style={{ margin: '1rem auto' }}>
                                        <Button style={{ margin: '0 auto' }} onClick={this.translateCode} loading={this.state.translationLoading}><b>Translate</b></Button>
                                    </Row>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </Card>
            </div>
        )
    }
}

Question.contextType = Context;
export default withRouter(Question);

const CODE_ON_LOAD = `class Main{\n\rpublic static void main(String[] args){\n\r//your code here\n\r}\n\r}`


