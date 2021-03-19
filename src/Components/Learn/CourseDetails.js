import React from 'react';
import {Button, Col, PageHeader, Card, Row, Spin, List, Progress} from 'antd';
import {ReloadOutlined, CloudSyncOutlined} from '@ant-design/icons'
import {withRouter} from 'react-router';
import {getCourses} from "../../Services/learningService";

class CourseDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            courseList: [],
            loading: false
        };
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

    getCourseDetails = (course) => {
        console.log(course)

    }

    async componentDidMount() {
        var course = this.props.location.state
        await this.getCourseDetails(course);

    }

    render() {
        return (
            <div>
                <Card>
                    <PageHeader className="site-page-header"/>
                    <div className="site-card-wrapper">
                        <Row style={{marginBottom: '40px'}}>
                            <Col offset={20}>
                                <Button onClick={this.getCourseList}><ReloadOutlined/> Refresh</Button>
                                <Button disabled danger><CloudSyncOutlined/> Reset</Button>
                            </Col>
                        </Row>
                    </div>
                </Card>
            </div>
        )
    }
}

export default withRouter(CourseDetails);


