import React from 'react'
import {
  Form,
  Input,
  InputNumber,
  Button,
  Card,
  PageHeader,
  DatePicker,
  Select,
  Divider,
  notification,
  Row, Col, Spin, Popconfirm
} from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { withRouter } from 'react-router'
import ReactHtmlParser from 'react-html-parser'
import { AdminLogOnStatus } from '../../../Services/AdminLogin'
import { AddNewCourse, DeleteCourse, EditCourse } from '../../../Services/AdminSettingsService'
import { getQuestionByLevel } from '../../../Services/PracticeService'
import { getCourseDetails } from '../../../Services/learningService'

const { Option } = Select
const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 16,
  },
}

class EditTutorial extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      description: '',
      currentCourseList: '',
      selectedLevel: null,
      selectedCourse: '',
      isEditable: false,
      dataLoading: false
    }
  }

  selectCourse = (e) => {
    this.setState({ selectedLevel: e })
  }

  searchCourse = async () => {
    this.setState({
      dataLoading: true
    })
    if (this.state.selectedLevel) {
      try {
        var tute = await getCourseDetails(this.state.selectedLevel)
        this.setState({
          selectedCourse: tute.tutorial,
          description: tute.tutorial.description,
          isEditable: true
        })

      } catch (e) {
        notification.error({ message: 'Error!', description: e.message ? e.message : '' })
      }
    } else {
      notification.warn({ message: 'Course not selected' })
    }
    this.setState({
      dataLoading: false
    })
  }

  setDescription = (e) => {
    let type = e.target.value ? e.target.value : '';
    this.setState({
      description: type
    })
  }

  onFinish = async (course) => {
    this.setState({
      dataLoading: true
    })
    let level = this.state.selectedCourse.level
    try {
      var response = await EditCourse(level, course)
      notification.success({ message: 'Success!', description: response.message ? response.message : '' })
      this.setState({
        selectedCourse: '',
        isEditable: false,
        description: ''
      })
    } catch (e) {
      notification.error({
        message: 'Error!',
        description: e.message ? e.message : 'Error occurred while submitting'
      })
    }
    this.setState({
      dataLoading: false
    })
  }

  onDelete = async () => {
    this.setState({
      dataLoading: true
    })
    try {
      let level = this.state.selectedCourse.level

      var response = await DeleteCourse(level)
      notification.success({
        message: 'Success!',
        description: response.message ? response.message : 'Deleted Successfully!'
      })
      this.setState({
        selectedCourse: '',
        isEditable: false,
        description: '',
        selectedLevel:null
      })
      let list = await getQuestionByLevel()
      this.setState({
        currentCourseList: list
      })
    } catch (e) {
      notification.error({ message: 'Error!', description: e.message ? e.message : 'Error deleting!' })
    }
    this.setState({
      dataLoading: false
    })
  }

  onCancel = () => {
    this.setState({
      selectedCourse: '',
      isEditable: false,
      description: ''
    })
  }

  getCurrentCourseList = async () => {
    try {
      let list = await getQuestionByLevel()
      this.setState({
        currentCourseList: list
      })
      return list
    } catch (e) {
      notification.error({ message: 'Error!', description: e.message ? e.message : 'Error retrieving overview' })
    }
  }

  componentDidMount () {
    var admin = AdminLogOnStatus()
    if (!admin) {
      this.props.history.push({
        pathname: `/dashboard`,
        state: ''
      })
    } else {
      this.getCurrentCourseList()
    }
  }

  render () {
    return (
      <div>
        <Card>
          <PageHeader
            className="site-page-header"
            title="Edit/Delete Course"
          />
          <Card title={'Select the course'}>
            <Row>
              <Col>
                <Select style={{ width: 250 }} size={'middle'}
                        placeholder={'Select Course'}
                        allowClear
                        onClear={this.selectCourse}
                        onSelect={this.selectCourse}
                        value={this.state.selectedLevel}
                >
                  {this.state.currentCourseList ? (this.state.currentCourseList.levels.map(course => (
                    <Option key={course.level} value={course.level}>Level {course.level}: {course.title}</Option>)
                  )) : ''}
                </Select>
              </Col>
              <Col offset={1}>
                <Button shape="round" icon={<SearchOutlined/>} disabled={!this.state.selectedLevel}
                        onClick={() => this.searchCourse()}>View</Button>
              </Col>
            </Row>
          </Card>
          <Card>
            <Spin spinning={this.state.dataLoading}>
              <Form {...layout} name="nest-messages" onFinish={this.onFinish}
                    fields={[
                      {
                        name: 'title',
                        value: this.state.selectedCourse ? this.state.selectedCourse.title : ''
                      },
                      {
                        name: 'level',
                        value: this.state.selectedCourse ? this.state.selectedCourse.level : ''
                      },
                      {
                        name: 'description',
                        value: this.state.description ? this.state.description : ''
                      },
                    ]}
              >
                <Form.Item
                  name={'title'}
                  label="Course Title"
                  rules={[
                    {
                      required: true,
                      message: 'Title is required!'
                    },
                  ]}
                >
                  <Input disabled={!this.state.isEditable}/>
                </Form.Item>
                <Form.Item
                  name={'level'}
                  label="Course Level"
                  rules={[
                    {
                      required: true,
                      message: 'Level is required!'
                    },
                    {
                      type: 'number',
                      min: 1
                    },
                  ]}
                >
                  <InputNumber disabled={!this.state.isEditable}/>
                </Form.Item>
                <Form.Item
                  name={'description'}
                  label="Course Description"
                  rules={[
                    {
                      required: true,
                      message: 'Description is required!'
                    }]}>
                  <Input.TextArea
                    onChange={(e)=>this.setDescription(e)} value={this.state.description}
                    disabled={!this.state.isEditable}/>
                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 15 }}>
                  <Row>
                    <Col>
                      <Button disabled={!this.state.isEditable} onClick={() => this.onCancel()}>
                        Cancel
                      </Button>
                    </Col>
                    <Col offset={1}>
                      <Popconfirm
                        title="Deleting a course will also remove related practicals,Continue to delete?"
                        onConfirm={() => this.onDelete()}
                        // onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Button danger disabled={!this.state.isEditable}>
                          Delete Course
                        </Button>
                      </Popconfirm>
                      <Button type={'primary'} htmlType="submit" disabled={!this.state.isEditable}>
                        Edit Course
                      </Button>
                    </Col>
                  </Row>
                </Form.Item>
              </Form>
            </Spin>
          </Card>
        </Card>
        <Divider/>
        <Card title={'Description output:'}>
                    <span>
                    {ReactHtmlParser(this.state.description)}
                    </span>
        </Card>
      </div>
    )
  }
}

export default withRouter(EditTutorial)