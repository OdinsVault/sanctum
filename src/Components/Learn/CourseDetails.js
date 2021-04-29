import React from 'react';
import ReactDOM from 'react-dom';
import {Button, Col, PageHeader, Card, Row, Spin, List, Progress, notification} from 'antd';
import {LeftCircleOutlined, ExperimentOutlined,RightCircleOutlined } from '@ant-design/icons'
import {withRouter} from 'react-router';
import {getCourseDetails, getCourses, getNextCourse} from "../../Services/learningService";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

class CourseDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            courseList: [],
            loading: false,
            course:'',
            selectedCourse:''
        };
    }

    goToPrevious = () =>{
        this.props.history.push({
            pathname:'/courses/overview',
            state:''
        })
    }
    getCourseList = async () => {

        this.setState({
            loading: true
        })
        var user = null; //get userId from localStorage
        try {
            var list = await getCourses(user);
            this.setState({
                courseList: list
            })
        } catch (e) {

        }
        this.setState({
            loading: false
        })
    }

    getCourseDetails = async(selectedCourse) => {
        this.setState({
            loading: true
        })
        try{
            var course = await getCourseDetails(selectedCourse.courseId);
            console.log(course)
            if(!course){
                notification.error({message:"Error!",description:"Something went wrong please try again!"})
            }else {
                this.setState({
                    selectedCourse:course
                })
            }

        }catch (e) {

        }
        this.setState({
            loading: false
        })
    }

    goToPractice = () =>{
        var courseName = this.state.course.courseName.split(" ").join("")
        this.props.history.push({
            pathname:`/practice/${courseName}`,
            state:this.state.course
        })
    }

    goToNextCourse = async() =>{
        if(this.state.course.status!=="completed"){
            notification.warning({message:"Locked !",description:"Complete practice to unclock"})
        }
        else {
            try{
                var nextCourse = await getNextCourse(this.state.course.courseId);
                this.setState({
                    course:nextCourse
                })
                this.getCourseDetails(nextCourse);
            }catch (e) {
                notification.error({message:"Error!",description:e.message?e.message:''})
            }
        }
    }

    async componentDidMount() {
        var course = this.props.location.state
        console.log(course);
        this.setState({course:course})
        await this.getCourseDetails(course);

    }

    render() {
        return (
            <div>
                <Card>
                    <PageHeader className="site-page-header" title={this.state.course.courseName}/>
                    <div className="site-card-wrapper">
                        <Spin spinning={this.state.loading}>
                        <div className="content">
                            {
                                ReactHtmlParser(this.state.selectedCourse.description)
                            }
                        </div>
                        </Spin>
                    </div>
                    <Row style={{marginBottom: '40px'}}>
                        <Col offset={18}>
                            <Button onClick={this.goToPrevious}><LeftCircleOutlined /> Back</Button>
                            <Button disabled={false} style={{color:'green'}} onClick={this.goToPractice}><ExperimentOutlined />Practice</Button>
                            <Button disabled={false} onClick={this.goToNextCourse}><RightCircleOutlined /> Next</Button>
                        </Col>
                    </Row>
                </Card>
            </div>
        )
    }
}

export default withRouter(CourseDetails);


