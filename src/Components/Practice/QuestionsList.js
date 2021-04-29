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
            var list = await getQuestionList(state.level);
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

    goToQuestion = (selectedQuestion) => {
        console.log("goto",selectedQuestion);
        var questionName = selectedQuestion.title.split(" ").join("");
        this.props.history.push({
            pathname: `/question/${questionName}`,
            state: "practice",
            question:selectedQuestion,
            course:this.state.course
        });
    }

    // getQuestionLevel = async(level) =>{
    //     try{
    //         var obj = await getQuestionByLevel();
    //         var le =''
    //         this.setState({
    //             queByLevel:obj
    //         })
    //         for(let i=0;i<obj.levelCount;i++){
    //             if(level===obj.levels[i].level){
    //                 le = obj.levels[i];
    //                 break;
    //             }
    //         }
    //         return le;
    //     }catch (e) {
    //         notification.error({message:"Error!"})
    //     }
    //
    // }

    goBack =() =>{
        this.props.history.push({
            pathname:'/practice/overview'
        })
    }

    async componentDidMount() {

        var state = this.props.location.state;
        if (!state) {
            this.props.history.push({
                pathname:'/practice/overview',
            });
        } else {
            this.setState({
                course: state
            })
            await this.getQuizList(state); //get questions related to  selected level
        }
    }

    render() {
        return (
            <div>
                <Card>
                    <PageHeader className="site-page-header"
                                title={this.state.course.category + " - " + "Practice Questions"}/>
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
                                dataSource={this.state.quizList.attemptsOverview}
                                renderItem={item => (
                                    <List.Item>
                                        <Badge.Ribbon
                                            color={item.attempts>0?(item.passed==="completed"?"#f2c53d":"#3d99f5"):'#29e34b'}
                                            text={item.attempts>0?(item.passed==="completed"?"Completed":"Attempted"):"New"}>
                                        <Card
                                            headStyle={item.difficulty === "Easy" ? {backgroundColor: '#c8ffb8'} : item.difficulty === "Medium"?
                                                {backgroundColor: '#faffb8'}:{backgroundColor: '#ffdaad'}}
                                            hoverable
                                            title={<span style={{fontSize:'13px'}}>Difficulty : {item.difficulty}</span>}
                                            onClick={() => this.goToQuestion(item)}
                                        >
                                            <Meta title={item.title} description={"Points: "+item.pointsAllocated}/>
                                            {/*<Progress percent={(100 / item.questions) * item.completed} size="small"/>*/}
                                            <Col offset={20} style={{paddingTop: '15px'}}>
                                                    <Button onClick={() => this.goToQuestion(item)}><RightCircleTwoTone/></Button>
                                            </Col>
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


