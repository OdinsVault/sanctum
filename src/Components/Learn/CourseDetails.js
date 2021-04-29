import React from 'react';
import ReactDOM from 'react-dom';
import {Button, Col, PageHeader, Card, Row, Spin, List, Progress, notification} from 'antd';
import {LeftCircleOutlined, ExperimentOutlined, RightCircleOutlined} from '@ant-design/icons'
import {withRouter} from 'react-router';
import {getCourseDetails, getCourses, getNextCourse} from "../../Services/learningService";
import ReactHtmlParser, {processNodes, convertNodeToElement, htmlparser2} from 'react-html-parser';

class CourseDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            courseList: [],
            loading: false,
            course: '', //selected course overview sent from prev.page
            selectedCourse: ''  //detailed course
        };
    }

    getCourseDetails = async (courseSelected) => {
        try {
            var course = await getCourseDetails(courseSelected.level);
            console.log("works", course)
            if (!course) {
                notification.error({message: "Error!", description: "Something went wrong please try again!"})
            } else {
                this.setState({
                    selectedCourse: course
                })
            }

        } catch (e) {
            notification.error({message: "Error!", description: e.message ? e.message : "Error fetching data"})
        }
    }

    goToPractice = () => {
        var courseName = this.state.course.category.split(" ").join("")
        this.props.history.push({
            pathname: `/practice/${courseName}`,
            state: this.state.course
        })
    }


    getCourseOverview = async (requiredCourseLevel) => { //to get next or previous course overview
        try {
            var list = await getCourses();
            for(let i=0;i<list.overview.length;i++){
                if(list.overview[i].level===requiredCourseLevel){
                    this.setState({
                        courseList: list,
                        course:list.overview[i]
                    })
                    return list.overview[i];
                }
            }
        } catch (e) {
            notification.error({message: "Error"})
        }
    }

    goToPrevious = async() => {
        // this.props.history.push({
        //     pathname: '/courses/overview',
        //     state: ''
        // })

        this.setState({
            loading: true
        })
        try {
            var prevCourse = await this.getCourseOverview(this.state.selectedCourse.previousTutorialLevel);
            await this.getCourseDetails(prevCourse);
        } catch (e) {
            notification.error({message: "Error!", description: e.message ? e.message : ''})
        }
        this.setState({
            loading: false
        })
    }

    goToNextCourse = async () => {
        this.setState({
            loading: true
        })
        console.log(this.state.selectedCourse.nextTutorialLevel)
        if (!this.state.course.levelCompleted) {
            notification.warning({message: "Locked !", description: "Complete practice to unclock"})
        } else {
            try {
                var nextCourse = await this.getCourseOverview(this.state.selectedCourse.nextTutorialLevel);
                 await this.getCourseDetails(nextCourse);
            } catch (e) {
                notification.error({message: "Error!", description: e.message ? e.message : ''})
            }
        }
        this.setState({
            loading: false
        })
    }

    async componentDidMount() {
        this.setState({
            loading: true
        })
        var course = this.props.location.state
        console.log("details", course);
        this.setState({course: course})
        await this.getCourseDetails(course);
        this.setState({
            loading: false
        })

    }

    render() {
        return (
            <div>
                <Card>
                    <PageHeader className="site-page-header" title={this.state.course.title}
                                extra={"Level "+this.state.course.level+": "+this.state.course.category}/>
                    <div className="site-card-wrapper">
                        <Spin spinning={this.state.loading}>
                            <div className="content">
                                {
                                    this.state.selectedCourse.tutorial ?
                                        ReactHtmlParser(this.state.selectedCourse.tutorial.description) : 'Tutorial currently not available'
                                }
                            </div>
                        </Spin>
                    </div>
                    <Row style={{marginBottom: '40px'}}>
                        <Col offset={18}>
                            <Button disabled={!this.state.selectedCourse.previousTutorialLevel} onClick={this.goToPrevious}><LeftCircleOutlined/> Back</Button>
                            <Button disabled={false} style={{color: 'green'}}
                                    onClick={this.goToPractice}><ExperimentOutlined/>Practice</Button>
                            <Button disabled={!this.state.selectedCourse.nextTutorialLevel} onClick={this.goToNextCourse}><RightCircleOutlined/> Next</Button>
                        </Col>
                    </Row>
                </Card>
            </div>
        )
    }
}

export default withRouter(CourseDetails);


