import React from 'react';
import {withRouter} from 'react-router';
import {FormattedMessage} from 'react-intl'

//SERVICES
import {getCourses} from "../../Services/learningService";
import {getAllQuestions} from "../../Services/PracticeService";
import {getAllCompete} from "../../Services/CompeteService";
import {quotes} from "../../constant";

//CSS
import {Col, PageHeader, Card, Row, Divider, Carousel, Spin, notification, Modal} from 'antd';
import {BulbOutlined} from '@ant-design/icons';

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
            courses: '',
            practicalList: '',
            competitionList: '',
            todaysTip: '',
            dataLoading: true,
            user: '',
            visibleConfirmation: false
        };
    }

    setComponents = async (user) => {
        this.setState({
            dataLoading: true
        })
        try {
            var getCoursesList;
            var getPracticeList;
            var getCompetitions;

            if (user) {
                getCoursesList = await getCourses();
                getPracticeList = await getAllQuestions();
                getCompetitions = await getAllCompete();
            }
            this.setState({
                courses: getCoursesList,
                practicalList: getPracticeList,
                competitionList: getCompetitions,
                dataLoading: false
            })

        } catch (e) {
            notification.error({message: "Error", description: e.message})
        }
        this.setState({
            dataLoading: false
        })

    }

    goToLogin = () => {
        this.props.history.push({
            pathname: '/login',
            state: ''
        })
    }

    onCardMoreClick = (link) => {
        if (!this.state.user) {
            this.setState({
                visibleConfirmation: true
            })
        } else {

            this.props.history.push({
                pathname: `${link}`,
                state: ''
            })
        }
    }

    handleCancel = () => {
        this.setState({
            visibleConfirmation: false
        })
    }

    setQuote = () => {
        let quoteNum = Math.floor((Math.random() * quotes.length) + 1);
        this.setState({
            todaysTip: quotes[quoteNum]
        })

    }

    async componentDidMount() {

        var getUser = JSON.parse(localStorage.getItem('usersession')); //simply_usersession
        if (getUser) {
            this.setState({
                user: getUser
            })
        }
        this.setComponents(getUser);
        this.setQuote();

    }

    render() {
        return (
            <div>
                <Card>
                    <PageHeader className="site-page-header"
                                title={<FormattedMessage id="home" defaultMessage={"Home"}/>}/>
                    <Carousel autoplay effect="fade">
                        <div>
                            <h3 style={contentStyle}><img style={{height: '400px', width: '100%'}}
                                                          src={process.env.PUBLIC_URL + '/Images/learn_01.jpg'}/>
                            </h3>
                        </div>
                        <div>
                            <h3 style={contentStyle}><img style={{height: '350px', width: '100%'}}
                                                          src={process.env.PUBLIC_URL + '/Images/learn_02.jpg'}/></h3>
                        </div>
                        <div>
                            <h3 style={contentStyle}><img style={{height: '350px', width: '100%'}}
                                                          src={process.env.PUBLIC_URL + '/Images/learn_03.jpg'}/></h3>
                        </div>
                        <div>
                            <h3 style={contentStyle}><img style={{height: '350px', width: '100%'}}
                                                          src={process.env.PUBLIC_URL + '/Images/learn_04.jpg'}/></h3>
                        </div>
                    </Carousel>

                    <Divider> <b><BulbOutlined/> Today's Tip</b></Divider>
                    <div>
                        <span style={{
                            fontSize: '18px',
                            fontWeight: '12px',
                            textAlign: 'center'
                        }}>"{this.state.todaysTip}"</span>
                    </div>

                    <Divider orientation="left"> <b>Get Your Skills Certified</b></Divider>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Card title={<b><span>Learn</span></b>}
                                  extra={<a onClick={() => this.onCardMoreClick("/courses/overview")}>More</a>}>
                                <Spin spinning={this.state.dataLoading}>{
                                    this.state.courses ? this.state.courses.overview.map((course) => (
                                        <Card.Grid key={course.level} style={{
                                            width: '50%',
                                            backgroundColor: '#fff9e0'
                                        }}>{course.category}</Card.Grid>
                                    )) : LEARN_DESCRIPTION
                                }</Spin>
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card title={<b><span>Practice</span></b>}
                                  extra={<a onClick={() => this.onCardMoreClick("/practice/overview")}>More</a>}>
                                <Spin spinning={this.state.dataLoading}>
                                    {this.state.practicalList ? this.state.practicalList.questions.map((practicle) => (
                                        <Card.Grid key={practicle._id} style={{
                                            width: '50%',
                                            backgroundColor: '#e3eeff'
                                        }}>{practicle.title}</Card.Grid>
                                    )) : PRACTICE_DESCRIPTION
                                    }</Spin>

                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card title={<b><span>Compete</span></b>}
                                  extra={<a onClick={() => this.onCardMoreClick("/compete/overview")}>More</a>}>
                                <Spin spinning={this.state.dataLoading}>{
                                    this.state.competitionList ? this.state.competitionList.questions.map((practicle) => (
                                        <Card.Grid key={practicle._id} style={{
                                            width: '100%',
                                            backgroundColor: '#e3ffd9'
                                        }}>{practicle.title}</Card.Grid>
                                    )) : COMPETE_DESCRIPTION
                                }
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


const LEARN_DESCRIPTION = "Looking for a place to start coding? Here you will learn all the basic concepts you need to know when getting into programming…"
const PRACTICE_DESCRIPTION = "Know a bit of programming? Let's practice! You can practice the knowledge you have gained in a way you will never find anywhere else…"
const COMPETE_DESCRIPTION = "Wanna face a challenge? Here you can compete with others and know where you can place youself amongst the best coders around the world..."