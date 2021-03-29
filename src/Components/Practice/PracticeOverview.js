import React from 'react';
import {Button, Col, PageHeader, Card, Row, Spin, List, Progress, notification} from 'antd';
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
import {getQuestionByLevel} from "../../Services/PracticeService";

const {Meta} = Card;
const contentStyle = {
    height: '260px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};

class OverviewPractice extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            courseList: [],
            loading: false,
            queByLevel:''
        };
    }

    getCourseList = async () => {
console.log("works")
        this.setState({
            loading: true
        })
        var user = null; //get userId from localStorage
        try {
            var list = await getCourses(user);
            console.log(list);
            this.setState({
                courseList: list
            })
        } catch (e) {

        }
        this.setState({
            loading: false
        })
    }

    getQuestionLevel = async(level) =>{
        try{
        var obj = await getQuestionByLevel();
        var le =''
        this.setState({
            queByLevel:obj
        })
           for(let i=0;i<obj.levelCount;i++){
               if(level===obj.levels[i].level){
                   le = obj.levels[i];
                   break;
               }
           }
            return le;
        }catch (e) {
            notification.error({message:"Error!"})
        }

    }
    viewQuestions =async(quiz) =>{
         var level = await this.getQuestionLevel(quiz.level);
        var name = quiz.courseName.split(" ").join("")
        this.props.history.push({
            pathname: `/practice/${name}`,
            state: quiz,
            QByLevel : level
        });
    }

    async componentDidMount() {
        await this.getCourseList();
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
                        <Spin spinning={this.state.loading} tip="Loading courses...">
                            <List
                                grid={{gutter: 16, column: 3}}
                                dataSource={this.state.courseList}
                                renderItem={item => (
                                    <List.Item>
                                        <Card
                                            headStyle={item.status === 'locked' ? {backgroundColor: '#c7c7c7'} : {}}
                                            bodyStyle={item.status === 'locked' ? {backgroundColor: '#ededed'} : {}}
                                            extra={item.status === 'locked' ? <LockTwoTone twoToneColor={'grey'}/> :
                                                item.status === 'unlocked' ? <UnlockTwoTone/> :
                                                    <CheckCircleTwoTone twoToneColor="#52c41a"/>}
                                            hoverable
                                            onClick={()=>this.viewQuestions(item)}
                                            // cover={<img alt="example" style={{height:'150px'}} src="" />}
                                            title={<span>Practice Level {item.level}: {item.courseName}</span>}
                                        >
                                            <Meta title={item.description} description="Your progress"/>
                                            <Progress percent={(100 / item.questions) * item.completed} size="small"/>
                                            <Col offset={20} style={{paddingTop: '15px'}}>
                                                {item.status === "locked" ? '' : <Button onClick={()=>this.viewQuestions(item)}><RightCircleTwoTone/></Button>}
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


