import React from 'react';
import {Button, Col, PageHeader, Card, Row, Spin, List, Progress} from 'antd';
import {
    LockTwoTone,
    UnlockTwoTone,
    CheckCircleTwoTone,
    RightCircleTwoTone,
    ReloadOutlined,
    CloudSyncOutlined
} from '@ant-design/icons'
import {withRouter} from 'react-router';
import {getCourses} from "../../Services/learningService";
import CourseDetails from "./CourseDetails";

const {Meta} = Card;
const contentStyle = {
    height: '260px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};

class OverviewCourse extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            courseList: [],
            currentUnlocked:0,
            loading: false,
            isCourseSelected:false
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

        }
        this.setState({
            loading: false
        })
    }

    setLockedLevels = (list) => {
        var current =0;
        for(let i=0;i<list.totalQuestionLevels;i++){
           if(list.overview[i].levelCompleted===false){
              current = list.overview[i].level;
              break;
           }
        }
        this.setState({
            currentUnlocked:current
        })
    }

    goToCourse =(course) =>{
        this.setState({
            isCourseSelected:true
        })
        console.log(course)
        var c = course.category.split(" ").join("")
        this.props.history.push({
            pathname: `/courses/${c}`,
            state: course
        });
    }

    async componentDidMount() {
        await this.getCourseList();
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
                                <Button disabled danger><CloudSyncOutlined/> Reset</Button>
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
                                            extra={item.level > this.state.currentUnlocked ? <LockTwoTone twoToneColor={'grey'}/> :
                                                item.level === this.state.currentUnlocked ? <UnlockTwoTone/> :
                                                    <CheckCircleTwoTone twoToneColor="#52c41a"/>}
                                            hoverable
                                            onClick={()=>(item.level > this.state.currentUnlocked?'':this.goToCourse(item))}
                                            // cover={<img alt="example" style={{height:'150px'}} src="" />}
                                            title={<span>Level {item.level}: {item.category}</span>}
                                        >
                                            <Meta title={item.title} description="Your progress"/>
                                            <Progress percent={Math.round((100 / item.questions) * item.completed)} size="small"/>
                                            <Col offset={20} style={{paddingTop: '15px'}}>
                                                {item.level > this.state.currentUnlocked ? '' : <Button onClick={()=>this.goToCourse(item)}><RightCircleTwoTone/></Button>}
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


