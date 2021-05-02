import React from 'react'
import { withRouter } from 'react-router'
import ReactHtmlParser from 'react-html-parser'

//SERVICES
import { AdminLogOnStatus } from '../../../Services/AdminLogin'
import { AddNewCourse } from '../../../Services/AdminSettingsService'
import { getQuestionByLevel } from '../../../Services/PracticeService'

//STYLES
import { Form, Input, InputNumber, Button, Card, PageHeader, Divider, notification, Spin } from 'antd'

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 16,
  },
}

const LEVEL_EXISTS = 0
const NEW_LEVEL = 1
const NO_DATA = -1

class AddNewTutorial extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      currentCourseList: '',
      dataLoading: false,
      newTitle: '',
      newDescription: '',
      newLevel: ''
    }
  }

  setDescription = (e) => {
    let desc = e.target.value ? e.target.value : ''
    this.setState({
      newDescription: desc
    })
  }
  setLevel = (e) => {
    this.setState({
      newLevel: e
    })
  }
  setTitle = (e) => {
    let title = e.target.value ? e.target.value : ''
    this.setState({
      newTitle: title
    })
  }

  checkLevelNum = (level) => {
    if (this.state.currentCourseList) {
      for (let i = 0; i < this.state.currentCourseList.levelCount; i++) {
        if (this.state.currentCourseList.levels[i].level === level) {
          return LEVEL_EXISTS
        }
      }
      return NEW_LEVEL
    } else {
      return NO_DATA
    }
  }

  onFinish = async (course) => {
    this.setState({
      dataLoading: true
    })
    let levelCheck = this.checkLevelNum(course.level)
    if (levelCheck !== 0) {
      try {
        var response = await AddNewCourse(course)
        notification.success({ message: 'Success!', description: response.message ? response.message : '' });
        this.setState({
          newTitle: '',
          newDescription: '',
          newLevel: ''
        })
      } catch (e) {
        notification.error({
          message: 'Error!',
          description: e.message ? e.message : 'Error occurred while submitting'
        })
      }
    } else {
      notification.warn({ message: 'Level already exists!' })
    }
    this.setState({
      dataLoading: false
    })
  }

  getCurrentCourseList = async () => {
    try {
      let list = await getQuestionByLevel()
      this.setState({
        currentCourseList: list
      })
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
            title="Add New Course"
          />
          <Spin spinning={this.state.dataLoading}>
            <Form {...layout} name="nest-messages" onFinish={this.onFinish}
                  fields={[
                    {
                      name: 'title',
                      value: this.state.newTitle ? this.state.newTitle : ''
                    },
                    {
                      name: 'level',
                      value: this.state.newLevel ? this.state.newLevel: ''
                    },
                    {
                      name: 'description',
                      value: this.state.newDescription ? this.state.newDescription : ''
                    },
                  ]}>
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
                <Input onChange={this.setTitle} value={this.state.newTitle}/>
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
                <InputNumber onChange={this.setLevel} value={this.state.newLevel}/>
              </Form.Item>
              <Form.Item name={'description'}
                         label="Course Description"
                         rules={[
                           {
                             required: true,
                             message: 'Description is required!'
                           }]}>
                <Input.TextArea onChange={this.setDescription} value={this.state.newDescription}/>
              </Form.Item>
              <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 18 }}>
                <Button type="primary" htmlType="submit">
                  Add Course
                </Button>
              </Form.Item>
            </Form>
          </Spin>
        </Card>
        <Divider/>
        <Card title={'Description output:'}>
                    <span>
                    {ReactHtmlParser(this.state.newDescription)}
                    </span>
        </Card>
      </div>
    )
  }
}

export default withRouter(AddNewTutorial)