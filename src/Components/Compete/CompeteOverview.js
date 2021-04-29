import React from 'react';
import {Button, Col, PageHeader, Card, Row, Spin, List, notification, Badge} from 'antd';
import {ReloadOutlined,RightCircleFilled,RightCircleTwoTone} from '@ant-design/icons'
import {withRouter} from 'react-router';
import {getQuestionByCategory} from "../../Services/CompeteService";


const {Meta} = Card;

const contentStyle = {
    height: '260px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};

class OverviewCompete extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            courseList: [],
            loading: false,
            questionList:'',
            queLevel:'All',
            queCategories:[]
        };
    }

    selectQuestionLevel = (level)=>{
            this.setState({
                queLevel:level
            })
    }

    getQuestionList = async () =>{
        this.setState({
            loading: true
        })
        try {
            var list = await getQuestionByCategory();
            this.setState({
                questionList: list
            })
            if(list){
                this.setCategories(list)
            }

        } catch (e) {
            notification.error({message:"Error!", description:e.message?e.message:"Error occurred while fetching data"})
        }
        this.setState({
            loading: false
        })
    }

    setCategories = (list) =>{
        var categoryList=[];
        for(var i=0;i<list.categoryCount;i++){
            categoryList.push(list.categories[i].category)
        }
        this.setState({
            queCategories:categoryList
        })
    }

    goToQuestion =(question) =>{
        var questionName = question.title.split(" ").join("");
        this.props.history.push({
            pathname: `/question/${questionName}`,
            state: "compete",
            question:question,
        });
    }

    async componentDidMount() {
        await this.getQuestionList();
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
                        <Spin spinning={this.state.loading} tip="Loading courses...">
                            { this.state.questionList?
                                (this.state.questionList.categories.map((category) => (
                                    <div>
                                    <h2 style={{color:'#e69815'}}>{category.category}&nbsp;&nbsp;<RightCircleFilled /> </h2>
                                <List
                                        grid={{gutter: 16, column: 3}}
                                        dataSource={category.questions}
                                        renderItem={item=> (
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
                                                        <Meta title={item.title} description={"Points: "+ item.pointsAllocated}/>
                                                        {/*<Progress percent={(100 / item.questions) * item.completed} size="small"/>*/}
                                                        <Col offset={20} style={{paddingTop: '15px'}}>
                                                            <Button onClick={() => this.goToQuestion(item)}><RightCircleTwoTone/></Button>
                                                        </Col>
                                                        {item.status === 'locked' ? "Complete previous to unlock this level!" : ""}
                                                    </Card>
                                                </Badge.Ribbon>
                                            </List.Item>
                                        )}

                            /></div>
                                    ))
                                ):''
                            }

                        </Spin>
                    </div>
                </Card>
            </div>
        )
    }
}

export default withRouter(OverviewCompete);


