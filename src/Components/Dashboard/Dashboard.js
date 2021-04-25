import React from 'react';
import {
    Button,
    Col,
    PageHeader,
    Select,
    Form,
    Card,
    Space,
    Row,
    Divider,
    List,
    Carousel,
    Image,
    Spin,
    notification, Modal
} from 'antd';
import {MinusCircleOutlined, BulbOutlined} from '@ant-design/icons';
import {withRouter} from 'react-router';
import {quotes} from "../../constant";
import {getCourses} from "../../Services/learningService";
import {getAllQuestions, getQuestionList} from "../../Services/PracticeService";
import {getAllCompete} from "../../Services/CompeteService";

import {IntlProvider, FormattedMessage, useIntl, injectIntl} from 'react-intl'


const messagesInFrench = {
    myMessage: "Aujourd'hui, c'est le {ts, date, ::yyyyMMdd}",
}

const contentStyle = {
    height: '260px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};

class DashBoard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            courses: [],
            practicalList: "",
            competitionList: '',
            todaysTip: '',
            dataLoading: true,
            user:'',
            visibleConfirmation:false
        };
    }

    setComponents =async ()=> {
        this.setState({
            dataLoading:true
        })

        try {

            var getCoursesList = await getCourses(this.state.user);
            var getPracticeList = await getAllQuestions();
            var getCompetitions = await getAllCompete();

            this.setState({
                courses: getCoursesList,
                practicalList: getPracticeList,
                competitionList: getCompetitions,
                dataLoading:false
            })

        }catch (e) {
            notification.error({message:"Error",description:e.message})
        }
        this.setState({
            dataLoading:false
        })

    }

    goToLogin = () => {
        this.props.history.push({
            pathname: '/login',
            state: ''
        })
    }

    onCardMoreClick = (link) =>{
        if (!this.state.user) {
            this.setState({
                visibleConfirmation:true
            })
        } else {

            this.props.history.push({
                pathname: `${link}`,
                state: ''
            })
        }
    }

    handleCancel = () =>{
        this.setState({
            visibleConfirmation:false
        })
    }

    setQuote = () =>{
        let quoteNum = Math.floor((Math.random() * quotes.length) + 1);
        this.setState({
            todaysTip:quotes[quoteNum]
        })

    }

    componentDidMount() {

        var getUser = JSON.parse(localStorage.getItem('usersession'));
        if (getUser) {
            this.setState({
                user: getUser
            })
        }
        this.setComponents();
        this.setQuote();

    }

    render() {
        const {intl} = this.props
        return (
            <div>
                <Card>
                    <PageHeader className="site-page-header" title={<FormattedMessage id="home" defaultMessage={"Home"} />}/>
                    <Carousel autoplay effect="fade">
                        <div>
                            <h3 style={contentStyle}><img style={{height: '260px', width: '100%'}}
                                                          src={process.env.PUBLIC_URL + '/Images/Learn-1.jpeg'}/>
                            </h3>
                        </div>
                        <div>
                            <h3 style={contentStyle}>2</h3>
                        </div>
                        <div>
                            <h3 style={contentStyle}>3</h3>
                        </div>
                        <div>
                            <h3 style={contentStyle}>4</h3>
                        </div>
                    </Carousel>
                    <Divider> <b><BulbOutlined/> Today's Tip</b></Divider>
                    <div><span style={{fontSize: '18px', fontWeight: '12px'}}>"{this.state.todaysTip}"</span>
                    </div>
                    <Divider orientation="left"> <b>Get Your Skills Certified</b></Divider>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Card title={<b><span>Learn</span></b>} extra={<a onClick={()=>this.onCardMoreClick("/courses/overview")}>More</a>}>
                                <Spin spinning={this.state.dataLoading}>{
                                    this.state.courses?this.state.courses.map((course)=>(
                                        <Card.Grid key={course.courseId} style={{width:'50%',backgroundColor:'#fff9e0'}}>{course.courseName}</Card.Grid>
                                    )):''
                                    }</Spin>
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card  title={<b><span>Practice</span></b>} extra={<a onClick={()=>this.onCardMoreClick("/practice/overview")}>More</a>}>
                                <Spin spinning={this.state.dataLoading}>{
                                    this.state.practicalList?this.state.practicalList.questions.map((practicle)=>(
                                            <Card.Grid
                                                key={practicle._id} style={{width:'50%', backgroundColor:'#e3eeff'}}>{practicle.title}</Card.Grid>
                                    )):''
                                }</Spin>

                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card title={<b><span>Compete</span></b>} extra={<a onClick={()=>this.onCardMoreClick("/compete/overview")}>More</a>}>
                                <Spin spinning={this.state.dataLoading}>
                                    {/*<CustomScroll>*/}
                                        {
                                    this.state.competitionList?this.state.competitionList.questions.map((practicle)=>(

                                        <Card.Grid
                                            key={practicle._id} style={{width:'100%',backgroundColor:'#e3ffd9'}}>{practicle.title}</Card.Grid>
                                    )):''
                                }
                                {/*</CustomScroll>*/}
                            </Spin>
                            </Card>
                        </Col>
                    </Row>
                </Card>


                {/*///////////////////////////confirmation Modal///////////////////////////////*/}
                <Modal
                    title={"Please log in or sign up to continue"}
                    visible={this.state.visibleConfirmation}
                    okText={"Continue"}
                    width={400}
                    onOk={this.goToLogin}
                    onCancel={this.handleCancel}
                >
                    <p>Continue to login?</p>
                </Modal>

            </div>
        )
    }
}

export default withRouter(DashBoard);


