import React from 'react';
import {Button, Col, PageHeader, Card, Row, Tabs, Descriptions, notification, Spin, Result,Input} from 'antd';
import {ReloadOutlined} from '@ant-design/icons'
import {withRouter} from 'react-router';
import {getQuestionById} from "../../Services/PracticeService";

const {Meta} = Card;
const {TabPane} = Tabs;
const { TextArea } = Input;

const spinStyle = {
    margin: "20px 0",
    marginBottom: "20px",
    padding: "30px 50px",
    textAlign: "center",
    borderRadius: "4px",
}

class Question extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            course:'',
            question: '',
            qL:'',
            selectedQuestion: '',
            loading: false,
            answerCode:''
        };
    }

    getQuestion = async (ques) => {

        this.setState({
            loading: true
        })
        console.log(ques)
        try {
            var question = await getQuestionById(ques._id);
            console.log("returned",question)
            if (!question) {
                notification.error({message: "Error", description: "Something went wrong please try again!"})
                // this.props.history.goBack();
            } else {
                this.setState({
                    selectedQuestion: question,
                })
            }

        } catch (e) {
            notification.error({message: "Error", description: e.cause ? e.cause : ""})
        }
        this.setState({
            loading: false
        })
    }

    setCode = (e) =>{
        this.setState({
            answerCode:e.target.value
        })
    }

    async componentDidMount() {
        if (!this.props.location.state || !this.props.location.course || !this.props.location.ques) {
            this.props.history.push({
               pathname: '/practice/overview'
            });
        }

        var state = this.props.location.state;
        var course = this.props.location.course;
        var question = this.props.location.ques;
        this.setState({
            question: state,
            course: course,
            qL:question
        })

        this.getQuestion(question);
    }

    render() {
        return (
            <div>
                <Card title={<PageHeader className="site-page-header"
                                         title={this.state.question.title}/>}
                      extra={"Points: " + "10"}>

                    <div className="site-card-wrapper">
                        <Row>
                            <Col span={18}>
                                <Tabs defaultActiveKey="1" type="card">
                                    <TabPane tab="Problem" key="1">
                                        <Spin spinning={this.state.loading}>
                                            {!this.state.selectedQuestion?
                                            (
                                            <Result
                                                status="500"
                                                title="500"
                                                subTitle="Sorry, something went wrong."
                                                // extra={<Button type="primary">Back Home</Button>}
                                            />
                                            )
                                            :(
                                            <div>
                                                <h3>Description:</h3>
                                                <div>
                                                    {this.state.selectedQuestion.description}
                                                    {/*"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do*/}
                                                    {/*eiusmod*/}
                                                    {/*tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim*/}
                                                    {/*veniam,*/}
                                                    {/*quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea*/}
                                                    {/*commodo*/}
                                                    {/*consequat. Duis aute irure dolor in reprehenderit in voluptate velit*/}
                                                    {/*esse*/}
                                                    {/*cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat*/}
                                                    {/*cupidatat*/}
                                                    {/*non proident, sunt in culpa qui officia deserunt mollit anim id est*/}
                                                    {/*laborum."*/}
                                                </div>
                                                <br/>
                                                <h3>Input Format:</h3>
                                                <div>
                                                    {/*"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do*/}
                                                    {/*eiusmod*/}
                                                    {/*tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim*/}
                                                    {/*veniam,*/}
                                                    {/*quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea*/}
                                                    {/*commodo*/}
                                                    {/*consequat. Duis aute irure dolor in reprehenderit in voluptate velit*/}
                                                    {/*esse*/}
                                                    {/*cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat*/}
                                                    {/*cupidatat*/}
                                                    {/*non proident, sunt in culpa qui officia deserunt mollit anim id est*/}
                                                    {/*laborum."*/}
                                                    {this.state.selectedQuestion.inputs}
                                                </div>
                                                <br/>
                                                <h3>Expected Output:</h3>
                                                <div>
                                                    {/*"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do*/}
                                                    {/*eiusmod*/}
                                                    {/*tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim*/}
                                                    {/*veniam,*/}
                                                    {/*quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea*/}
                                                    {/*commodo*/}
                                                    {/*consequat. Duis aute irure dolor in reprehenderit in voluptate velit*/}
                                                    {/*esse*/}
                                                    {/*cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat*/}
                                                    {/*cupidatat*/}
                                                    {/*non proident, sunt in culpa qui officia deserunt mollit anim id est*/}
                                                    {/*laborum."*/}
                                                    {this.state.selectedQuestion.outputs}
                                                </div><br/><br/>
                                                <h3>Code here:</h3>
                                                <TextArea rows={10} showCount
                                                          value={this.state.answerCode}
                                                          onChange={this.setCode}/>
                                                {this.state.answerCode}
                                                <br/>
                                                <Row>
                                                    <Col offset={18}>
                                                    <Button><b>Run Code</b></Button>
                                                    </Col>
                                                    <Col >
                                                    <Button style={{background:'#ffba59'}}><b>Submit Code</b></Button>
                                                    </Col>

                                                </Row>
                                                <br/><br/>
                                                <div className="result">
                                                    <Result
                                                        status="success"
                                                        title="Test cases Passed!"
                                                    />

                                                </div>
                                            </div>
                                            )}
                                        </Spin>
                                    </TabPane>
                                    <TabPane tab="Visualizer" key="3">
                                        visualize your code
                                    </TabPane>
                                    <TabPane tab="Submissions" key="2" disabled>
                                        No submissions
                                    </TabPane>
                                </Tabs>
                            </Col>
                            <Col offset={1} span={5}>
                                <Card>
                                    <Descriptions title={this.state.question.title} size={'small'} column={1}>
                                        <Descriptions.Item label="Level">Easy</Descriptions.Item><br/>
                                        <Descriptions.Item label="Category">{this.state.course.courseName}</Descriptions.Item><br/>
                                        <Descriptions.Item label="Difficulty"> {this.state.question.difficulty}</Descriptions.Item><br/>
                                        <Descriptions.Item label="Points">10</Descriptions.Item><br/>
                                    </Descriptions>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </Card>
            </div>
        )
    }
}

export default withRouter(Question);


