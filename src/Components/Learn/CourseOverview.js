import React from 'react';
import {withRouter} from 'react-router';

//SERVICES
import {getCourses} from "../../Services/learningService";

//STYLES
import {Button, Col, PageHeader, Card, Row, Spin, List, Progress, notification} from 'antd';
import {
    LockTwoTone, UnlockTwoTone, CheckCircleTwoTone,
    RightCircleTwoTone, ReloadOutlined
} from '@ant-design/icons'
import {CheckLogOnStatus} from "../../Services/UserLoginService";

const {Meta} = Card;

class OverviewCourse extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            courseList: [],
            currentUnlocked: 0,
            loading: false,
            isCourseSelected: false
        };
    }

    getCourseList = async () => {

        this.setState({
            loading: true
        })
        try {
            var list = await getCourses();
            this.setLockedLevels(list);
            this.setState({
                courseList: list
            })
        } catch (e) {
            notification.error({message: "Error!", description: e.message ? e.message : ''})
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

    goToCourse = (course) => {
        this.setState({
            isCourseSelected: true
        })

        var courseName = course.category.split(" ").join("")
        this.props.history.push({
            pathname: `/courses/${courseName}`,
            state: course
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
                    <PageHeader className="site-page-header" title="Modules"/>
                    <div className="site-card-wrapper">
                        <Row style={{marginBottom: '40px'}}>
                            <Col offset={20}>
                                <Button onClick={this.getCourseList}><ReloadOutlined/> Refresh</Button>
                            </Col>
                        </Row>
                        <Spin spinning={this.state.loading} tip="Loading courses...">
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
                                            onClick={() => (item.level > this.state.currentUnlocked ? '' : this.goToCourse(item))}
                                            title={<span>Level {item.level}: {item.category}</span>}
                                        >
                                            <Meta title={item.title} description="Your progress"/>
                                            <Progress percent={Math.round((100 / item.questions) * item.completed)}
                                                      size="small"/>
                                            <Col offset={20} style={{paddingTop: '15px'}}>
                                                {item.level > this.state.currentUnlocked ? '' :
                                                    <Button onClick={() => this.goToCourse(item)}><RightCircleTwoTone/></Button>}
                                            </Col>
                                            {item.level > this.state.currentUnlocked ? "Complete previous to unlock this level!" : ""}
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

export default withRouter(OverviewCourse);


