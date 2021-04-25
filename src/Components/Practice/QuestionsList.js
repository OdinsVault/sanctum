import React from 'react';
import {Button, Col, PageHeader, Card, Row, Spin, List, Progress, notification,Badge} from 'antd';
import {LockTwoTone, UnlockTwoTone, CheckCircleTwoTone, RightCircleTwoTone, ReloadOutlined, CloudSyncOutlined} from '@ant-design/icons'
import {withRouter} from 'react-router';
import {getCourses} from "../../Services/learningService";
import {getQuestionByLevel, getQuestionList} from "../../Services/PracticeService";

const {Meta} = Card;
const contentStyle = {
    height: '260px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};

class QuestionList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            course: '',
            quizList: [],
            loading: false,
            queByLevel:''
        };
    }

    getQuizList = async (state) => {

        this.setState({
            loading: true
        })
        var user = null; //get userId from localStorage
        try {
            var list = await getQuestionList(user, state.quizId);
            console.log("quizList",list);
            this.setState({
                quizList: list
            })
        } catch (e) {

        }
        this.setState({
            loading: false
        })
    }

    goToQuestion = (question) => {
        var qL = this.state.queByLevel.questions[0];
        var questionName = qL.title.split(" ").join("");
        this.props.history.push({
            pathname: `/question/${questionName}`,
            state: "practice",
            question:qL,
            course:this.state.course
        });
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

    goBack =() =>{
        this.props.history.push({
            pathname:'/practice/overview'
        })
    }

    async componentDidMount() {

        var state = this.props.location.state;
        var level = '';
        if (!state) {
            this.props.history.push({
                pathname:'/practice/overview',
            });
        } else {
            await this.getQuizList(state);
            level = await this.getQuestionLevel(state.level);
        }
        this.setState({
            course: state,
            queByLevel:level
        })

    }

    render() {
        return (
            <div>
                <Card>
                    <PageHeader className="site-page-header"
                                title={this.state.course.courseName + " - " + "Practice Questions"}/>
                    <Row style={{marginBottom: '40px'}}>
                        <Col offset={20}>
                            <Button onClick={() => this.goBack()}>Back</Button>
                            <Button onClick={() => this.getQuizList(this.state.course)}><ReloadOutlined/> Refresh</Button>
                        </Col>
                    </Row>
                    <div className="site-card-wrapper">
                        <Spin spinning={this.state.loading} tip="Loading courses...">
                            <List
                                grid={{gutter: 16, column: 3}}
                                dataSource={this.state.quizList.questionList}
                                renderItem={item => (
                                    <List.Item>
                                        <Badge.Ribbon
                                            color={item.attempts>0?(item.status==="completed"?"#f2c53d":"#3d99f5"):'#29e34b'}
                                            text={item.attempts>0?(item.status==="completed"?"Completed":"Attempted"):"New"}>
                                        <Card
                                            headStyle={item.difficulty === "Easy" ? {backgroundColor: '#c8ffb8'} : item.difficulty === "Medium"?
                                                {backgroundColor: '#faffb8'}:{backgroundColor: '#ffdaad'}}
                                            hoverable
                                            title={<span style={{fontSize:'13px'}}>Difficulty : {item.difficulty}</span>}
                                            onClick={() => this.goToQuestion(item)}
                                        >
                                            <Meta title={item.title} description={"Marks: "}/>
                                            {/*<Progress percent={(100 / item.questions) * item.completed} size="small"/>*/}
                                            <Col offset={20} style={{paddingTop: '15px'}}>
                                                    <Button onClick={() => this.goToQuestion(item)}><RightCircleTwoTone/></Button>
                                            </Col>
                                            {item.status === 'locked' ? "Complete previous to unlock this level!" : ""}
                                        </Card>
                                        </Badge.Ribbon>
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

export default withRouter(QuestionList);


