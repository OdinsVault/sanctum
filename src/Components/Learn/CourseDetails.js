import React from 'react';
import ReactDOM from 'react-dom';
import {Button, Col, PageHeader, Card, Row, Spin, List, Progress, notification} from 'antd';
import {LeftCircleOutlined, ExperimentOutlined } from '@ant-design/icons'
import {withRouter} from 'react-router';
import {getCourseDetails, getCourses} from "../../Services/learningService";
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
        try{
            var course = await getCourseDetails(selectedCourse.courseId);
            if(!course){
                notification.error({message:"Error!",description:"Something went wrong please try again!"})
            }else {
                this.setState({
                    selectedCourse:course
                })
            }

        }catch (e) {

        }
    }

    async componentDidMount() {
        var course = this.props.location.state
        this.setState({course:course})
        await this.getCourseDetails(course);

    }

    render() {
        return (
            <div>
                <Card>
                    <PageHeader className="site-page-header" title={this.state.course.courseName}/>
                    <div className="site-card-wrapper">
                        <div className="content">
                            {
                                ReactHtmlParser(this.state.selectedCourse.description)
                            }
                        </div>
                    </div>
                    <Row style={{marginBottom: '40px'}}>
                        <Col offset={20}>
                            <Button onClick={this.goToPrevious}><LeftCircleOutlined /> Back</Button>
                            <Button disabled danger><ExperimentOutlined />Practice</Button>
                        </Col>
                    </Row>
                </Card>
            </div>
        )
    }
}

export default withRouter(CourseDetails);


