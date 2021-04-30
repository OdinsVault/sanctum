import React from 'react';
import {withRouter} from 'react-router';

//SERVICES
import {getCourses} from "../../Services/learningService";

//STYLES
import {Button, Col, PageHeader, Card, Row, Spin, List, Progress, notification} from 'antd';
import {
    LockTwoTone, UnlockTwoTone, CheckCircleTwoTone, RightCircleTwoTone, ReloadOutlined,
} from '@ant-design/icons'
import {CheckLogOnStatus} from "../../Services/UserLoginService";


const {Meta} = Card;


class OverviewPractice extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            courseList: [],
            currentUnlocked: 0,
            loading: false,
            queByLevel: ''
        };
    }

    getCourseList = async () => {

        this.setState({
            loading: true
        })
        var user = null; //get userId from localStorage
        try {
            var list = await getCourses(user);
            this.setLockedLevels(list);
            this.setState({
                courseList: list
            })
        } catch (e) {
            notification.error({message: 'Error!', description: e.message ? e.message : ''})
        }
        this.setState({
            loading: false
        })
    }

    setLockedLevels = (list) => {
        var current = 0;
        for (let i = 0; i < list.totalQuestionLevels; i++) {
            if (list.overview[i].levelCompleted === false) {
                current = list.overview[i].level;
                break;
            }
        }
        this.setState({
            currentUnlocked: current
        })
    }

    viewQuestions = async (quiz) => {

        var name = quiz.category.split(" ").join("")
        this.props.history.push({
            pathname: `/practice/${name}`,
            state: quiz,
        });
    }

    async componentDidMount() {
        let loggedIn = CheckLogOnStatus();
        if (loggedIn) {
            await this.getCourseList();
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
                    <PageHeader className="site-page-header" title="Practice"/>
                    <Row style={{marginBottom: '40px'}}>
                        <Col offset={22}>
                            <Button onClick={this.getCourseList}><ReloadOutlined/> Refresh</Button>
                        </Col>
                    </Row>
                    <div className="site-card-wrapper">
                        <Spin spinning={this.state.loading} tip="Loading...">
                            <List
                                grid={{gutter: 16, column: 3}}
                                dataSource={this.state.courseList.overview}
                                renderItem={item => (
                                    <List.Item>
                                        <Card
                                            headStyle={item.level > this.state.currentUnlocked ? {backgroundColor: '#c7c7c7'} : {}}
                                            bodyStyle={item.level > this.state.currentUnlocked ? {backgroundColor: '#ededed'} : {}}
                                            extra={item.level > this.state.currentUnlocked ?
                                                <LockTwoTone twoToneColor={'grey'}/> :
                                                item.level === this.state.currentUnlocked ? <UnlockTwoTone/> :
                                                    <CheckCircleTwoTone twoToneColor="#52c41a"/>}
                                            hoverable
                                            onClick={() => (item.level > this.state.currentUnlocked ? '' : this.viewQuestions(item))}
                                            title={<span>Practice Level {item.level}: {item.category}</span>}
                                        >
                                            <Meta title={item.description} description="Your progress"/>
                                            <Progress percent={Math.round((100 / item.questions) * item.completed)}
                                                      size="small"/>
                                            <Col offset={20} style={{paddingTop: '15px'}}>
                                                {item.status === "locked" ? '' : <Button
                                                    onClick={() => (item.level > this.state.currentUnlocked ? '' : this.viewQuestions(item))}><RightCircleTwoTone/></Button>}
                                            </Col>
                                            {item.status === 'locked' ? "Complete previous to unlock this level!" : ""}
                                        </Card>
                                    </List.Item>
                                )}

                            />
                        </Spin>
                    </div>
                </Card>
            </div>
        )
    }
}

export default withRouter(OverviewPractice);


