import React from 'react';
import {withRouter} from 'react-router';

//SERVICES
import {getQuestionsOverview} from "../../Services/CompeteService";

//STYLES
import {Button, Col, PageHeader, Card, Row, Spin, List, notification, Badge} from 'antd';
import {ReloadOutlined, RightCircleFilled, RightCircleTwoTone} from '@ant-design/icons'
import {CheckLogOnStatus} from "../../Services/UserLoginService";

const {Meta} = Card;

class OverviewCompete extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            courseList: [],
            loading: false,
            questionList: ''
        };
    }

    getQuestionList = async () => {
        this.setState({
            loading: true
        })
        try {
            var list = await getQuestionsOverview();
            this.setState({
                questionList: list
            })

        } catch (e) {
            notification.error({
                message: "Error!",
                description: e.message ? e.message : "Error occurred while fetching data"
            })
        }
        this.setState({
            loading: false
        })
    }

    goToQuestion = (question) => {

        var questionName = question.title.split(" ").join("");
        this.props.history.push({
            pathname: `/question/${questionName}`,
            state: "compete",
            question: question,
        });
    }

    async componentDidMount() {
        let loggedIn = CheckLogOnStatus();
        if (loggedIn) {
            await this.getQuestionList();
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
                    <PageHeader className="site-page-header" title="Compete"/>
                    <Row style={{marginBottom: '40px'}}>
                        <Col offset={22}>
                            <Button onClick={this.getQuestionList}><ReloadOutlined/> Refresh</Button>
                        </Col>
                    </Row>
                    <div className="site-card-wrapper">
                        <Spin spinning={this.state.loading} tip="Loading quizzes...">
                            {this.state.questionList ?
                                (this.state.questionList.overview.map((category) => (
                                        <div>
                                            <h2 style={{color: '#e69815'}}>{category.category}&nbsp;&nbsp;
                                                <RightCircleFilled/></h2>
                                            <List
                                                grid={{gutter: 16, column: 3}}
                                                dataSource={category.attemptsOverview}
                                                renderItem={item => (
                                                    <List.Item>
                                                        <Badge.Ribbon
                                                            color={item.attempts > 0 ? (item.passed ? "#f2c53d" : "#3d99f5") : '#29e34b'}
                                                            text={item.attempts > 0 ? (item.passed ? "Completed" : "Attempted") : "New"}
                                                        >
                                                            <Card
                                                                headStyle={item.difficulty === "Easy" ? {backgroundColor: '#c8ffb8'} : item.difficulty === "Medium" ?
                                                                    {backgroundColor: '#faffb8'} : {backgroundColor: '#ffdaad'}}
                                                                hoverable
                                                                title={<span
                                                                    style={{fontSize: '13px'}}>Difficulty : {item.difficulty}</span>}
                                                                onClick={() => this.goToQuestion(item)}
                                                            >
                                                                <Meta title={item.title}
                                                                      description={"Points: " + item.pointsAllocated}/>
                                                                <Col offset={20} style={{paddingTop: '15px'}}>
                                                                    <Button
                                                                        onClick={() => this.goToQuestion(item)}><RightCircleTwoTone/></Button>
                                                                </Col>
                                                            </Card>
                                                        </Badge.Ribbon>
                                                    </List.Item>
                                                )}/>
                                        </div>
                                    ))
                                ) : ''
                            }
                        </Spin>
                    </div>
                </Card>
            </div>
        )
    }
}

export default withRouter(OverviewCompete);


