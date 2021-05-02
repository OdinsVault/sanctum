import React from 'react'
import { withRouter } from 'react-router'

//SERVICES
import { AdminLogOnStatus } from '../../../Services/AdminLogin'
import { DeletePractical, EditPracticeQuestion, } from '../../../Services/AdminSettingsService'
import { getQuestionById, getQuestionByLevel } from '../../../Services/PracticeService'

//STYLES
import {
  Form, Input, InputNumber, Button, Card, PageHeader, Select, notification, Spin, Col, Row, Popconfirm
} from 'antd'
import { MinusCircleOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons'

const { Option } = Select

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

class EditPractical extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      currentCourseList: '',    //current course levels
      selectedLevel: null,        //selected course level
      selectedQueList: '',      //question list related to selected level
      selectedQuestionId: null,   //selected question Id
      selectedQuestion: '',     //detailed selected question object
      isEditable: false,
      dataLoading: false
    }
  }

  selectCourse = (e) => {
    this.setState({
      selectedLevel: e,
      selectedQueList: '',
      selectedQuestionId: null
    })
    if (e) {
      this.getQuestions(e)
    }

  }

  selectQuestion = (e) => {
    this.setState({ selectedQuestionId: e })
  }

  onCancel = () => {
    this.setState({
      selectedLevel: null,
      selectedQueList: '',
      selectedQuestionId: null,
      selectedQuestion: '',
      isEditable: false
    })
  }

  onDelete = async () => {
    this.setState({
      dataLoading: true
    })
    try {
      let qId = this.state.selectedQuestion._id
      var response = await DeletePractical(qId)
      notification.success({
        message: 'Success!',
        description: response.message ? response.message : 'Deleted Successfully!'
      })

      this.setState({
        selectedLevel: null,
        selectedQueList: '',
        selectedQuestionId: null,
        selectedQuestion: '',
        isEditable: false
      })
      this.getCurrentQuestionList()
    } catch (e) {
      notification.error({ message: 'Error!', description: e.message ? e.message : 'Error deleting!' })
    }
    this.setState({
      dataLoading: false
    })
  }

  getQuestions = (e) => {
    var qList = ''
    for (let i = 0; i < this.state.currentCourseList.levelCount; i++) {
      if (e === this.state.currentCourseList.levels[i].level) {
        qList = this.state.currentCourseList.levels[i]
        break
      }
    }
    this.setState({
      selectedQueList: qList,
    })
  }

  searchQuestion = async () => {
    this.setState({
      dataLoading: true
    })
    try {
      var que = await getQuestionById(this.state.selectedQuestionId)
      this.setState({
        selectedQuestion: que,
        isEditable: true
      })
    } catch (e) {
      notification.error({ message: 'Error!', description: e.message ? e.message : '' })
    }
    this.setState({
      dataLoading: false
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

  onFinish = async (data) => {
    if (!data.testcases || data.testcases.length < 1) {
      notification.warn({ message: 'Add at least one test case' })
    } else {
      this.setState({
        dataLoading: true
      })
      let levelCheck = this.checkLevelNum(data.level)
      if (levelCheck === LEVEL_EXISTS) {
      try {

        let qId = this.state.selectedQuestion._id
        var response = await EditPracticeQuestion(qId, data)
        notification.success({ message: 'Success!', description: response.message ? response.message : '' })
        this.setState({
          selectedLevel: null,
          selectedQueList: '',
          selectedQuestionId: null,
          selectedQuestion: '',
          isEditable: false
        })
        this.getCurrentQuestionList()

      } catch (e) {
        notification.error({
          message: 'Error!',
          description: e.message ? e.message : 'Error occurred while submitting'
        })
      }
      } else {
        notification.warn({
          message: 'Level dose not exists!',
          description: 'Cannot add a practical to a non existing level'
        })
      }
      this.setState({
        dataLoading: false
      })
    }
  }

  getCurrentQuestionList = async () => {
    try {
      let list = await getQuestionByLevel();
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
      this.getCurrentQuestionList()
    }
  }

  render () {
    return (
      <div>
        <Card>
          <PageHeader
            className="site-page-header"
            title="Edit/Delete Practical"
          />
          <Card title={'Select Question Level'}>
            <Row>
              <Col>
                <Select style={{ width: 250 }} size={'middle'}
                        placeholder={'Select Practice Level'}
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
                <Select
                  disabled={!this.state.selectedLevel}
                  style={{ width: 250 }} size={'middle'}
                  placeholder={'Select Practice Question'}
                  allowClear
                  onClear={this.selectQuestion}
                  onSelect={this.selectQuestion}
                  value={this.state.selectedQuestionId}
                >
                  {this.state.selectedQueList ? (this.state.selectedQueList.questions.map(question => (
                    <Option key={question._id} value={question._id}>{question.title}</Option>)
                  )) : ''}
                </Select>
              </Col>
              <Col offset={1}>
                <Button shape="round" icon={<SearchOutlined/>} disabled={!this.state.selectedQuestionId}
                        onClick={() => this.searchQuestion()}>View</Button>
              </Col>
            </Row>
          </Card>
          <Card>
            <Spin spinning={this.state.dataLoading}>
              <Form {...layout} name="nest-messages" onFinish={this.onFinish}
                    fields={[
                      {
                        name: 'title',
                        value: this.state.selectedQuestion ? this.state.selectedQuestion.title : ''
                      },
                      {
                        name: 'level',
                        value: this.state.selectedQuestion ? this.state.selectedQuestion.level : ''
                      },
                      {
                        name: 'category',
                        value: this.state.selectedQuestion ? this.state.selectedQuestion.category : ''
                      },
                      {
                        name: 'description',
                        value: this.state.selectedQuestion ? this.state.selectedQuestion.description : ''
                      },
                      {
                        name: 'difficulty',
                        value: this.state.selectedQuestion ? this.state.selectedQuestion.difficulty : ''
                      },
                      {
                        name: 'pointsAllocated',
                        value: this.state.selectedQuestion ? this.state.selectedQuestion.pointsAllocated : ''
                      },
                      {
                        name: 'inputs',
                        value: this.state.selectedQuestion ? this.state.selectedQuestion.inputs : ''
                      }, {
                        name: 'outputs',
                        value: this.state.selectedQuestion ? this.state.selectedQuestion.outputs : ''
                      },
                      {
                        name: 'testcases',
                        value: this.state.selectedQuestion ? this.state.selectedQuestion.testcases : ''
                      }
                    ]}
              >
                <Form.Item
                  name={'title'}
                  label="Title"
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
                  name={'category'}
                  label="Category"
                  rules={[
                    {
                      required: true,
                      message: 'Category is required!'
                    },
                  ]}
                >
                  <Input disabled={!this.state.isEditable}/>
                </Form.Item>
                <Form.Item name={'description'} label="Description"
                           rules={[
                             {
                               required: true,
                               message: 'Description is required!'
                             }]}>
                  <Input.TextArea disabled={!this.state.isEditable}/>
                </Form.Item>
                <Form.Item label="Difficulty" name={'difficulty'} rules={[
                  {
                    required: true,
                    message: 'required!'
                  }]}>
                  <Select disabled={!this.state.isEditable}>
                    <Option value="Easy" key={'Easy'}>Easy</Option>
                    <Option value="Medium" key={'Medium'}>Medium</Option>
                    <Option value="Hard" key={'Hard'}>Hard</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  name={'pointsAllocated'}
                  label="Points"
                  rules={[
                    {
                      required: true,
                      message: 'Points is required!'
                    },
                    {
                      type: 'number',
                      min: 0
                    },
                  ]}
                >
                  <InputNumber disabled={!this.state.isEditable}/>
                </Form.Item>
                <Form.Item
                  name={'inputs'}
                  label="Sample Input"
                  rules={[
                    {
                      required: true,
                      message: 'Input is required!'
                    },
                  ]}
                >
                  <Input disabled={!this.state.isEditable}/>
                </Form.Item>
                <Form.Item
                  name={'outputs'}
                  label="Sample Outputs"
                  rules={[
                    {
                      required: true,
                      message: 'Output is required!'
                    },
                  ]}
                >
                  <Input disabled={!this.state.isEditable}/>
                </Form.Item>
                <Form.List name="testcases">
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name, fieldKey, ...restField }) => (
                        <Form.Item label={'Test case'}>
                          <Form.Item
                            {...restField}
                            label={'Title'}
                            name={[name, 'title']}
                            fieldKey={[fieldKey, 'title']}
                            rules={[{ required: true, message: 'Missing title' }]}
                          >
                            <Input placeholder="Title"/>
                          </Form.Item>
                          <Form.Item
                            {...restField}
                            label={'Inputs'}
                            name={[name, 'inputs']}
                            fieldKey={[fieldKey, 'inputs']}
                            rules={[{ required: true, message: 'Missing inputs' }]}
                          >
                            <Input placeholder="Inputs"/>
                          </Form.Item>
                          <Form.Item
                            {...restField}
                            label={'Outputs'}
                            name={[name, 'outputs']}
                            fieldKey={[fieldKey, 'outputs']}
                            rules={[{ required: true, message: 'Missing outputs' }]}
                          >
                            <Input placeholder="Outputs"/>
                          </Form.Item>
                          <Form.Item
                            {...restField}
                            label={'Description'}
                            name={[name, 'description']}
                            fieldKey={[fieldKey, 'description']}
                            rules={[{ required: true, message: 'Missing description' }]}
                          >
                            <Input placeholder="Description"/>
                          </Form.Item>
                          <Button shape={'round'} icon={< MinusCircleOutlined/>}
                                  onClick={() => remove(name)}>Remove</Button>
                        </Form.Item>
                      ))}
                      <Form.Item>
                        <Col offset={6}>
                          <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined/>}
                                  disabled={!this.state.isEditable}>
                            Add new testcase
                          </Button>
                        </Col>
                      </Form.Item>
                    </>
                  )}
                </Form.List>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 15 }}>
                  <Row>
                    <Col>
                      <Button disabled={!this.state.isEditable} onClick={() => this.onCancel()}>
                        Cancel
                      </Button>
                    </Col>
                    <Col offset={1}>
                      <Popconfirm
                        title="Continue to delete?"
                        onConfirm={() => this.onDelete()}
                        // onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Button danger disabled={!this.state.isEditable}>
                          Delete Practical
                        </Button>
                      </Popconfirm>
                      <Button type={'primary'} htmlType="submit" disabled={!this.state.isEditable}>
                        Edit Practical
                      </Button>
                    </Col>
                  </Row>
                </Form.Item>
              </Form>
            </Spin>
          </Card>
        </Card>
      </div>
    )
  }
}

export default withRouter(EditPractical)