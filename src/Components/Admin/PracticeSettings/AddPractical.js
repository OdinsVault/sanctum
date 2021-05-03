import React from 'react'
import { withRouter } from 'react-router'

//SERVICES
import { AdminLogOnStatus } from '../../../Services/AdminLogin'
import { NewPractical } from '../../../Services/AdminSettingsService'
import { getQuestionByLevel } from '../../../Services/PracticeService'

//STYLES
import { Form, Input, InputNumber, Button, Card, PageHeader, Select, notification, Spin, Col } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'

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

class AddNewPractical extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      currentCourseList: '',
      dataLoading: false,
      newPractical:'',
    }
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
          var response = await NewPractical(data)
          notification.success({ message: 'Success!', description: response.message ? response.message : '' })
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
            title="Add New Practice Question"
          />
          <Spin spinning={this.state.dataLoading}>
            <Form {...layout} name="nest-messages" onFinish={this.onFinish}
                  fields={[
                    {
                      name: 'title',
                      value: this.state.newPractical ? this.state.newPractical.title : ''
                    },
                    {
                      name: 'level',
                      value: this.state.newPractical ? this.state.newPractical.level : ''
                    },
                    {
                      name: 'category',
                      value: this.state.newPractical ? this.state.newPractical.category : ''
                    },
                    {
                      name: 'description',
                      value: this.state.newPractical ? this.state.newPractical.description : ''
                    },
                    {
                      name: 'difficulty',
                      value: this.state.newPractical ? this.state.newPractical.difficulty : ''
                    },
                    {
                      name: 'pointsAllocated',
                      value: this.state.newPractical ? this.state.newPractical.pointsAllocated : ''
                    },
                    {
                      name: 'inputs',
                      value: this.state.newPractical ? this.state.newPractical.inputs : ''
                    }, {
                      name: 'outputs',
                      value: this.state.newPractical ? this.state.newPractical.outputs : ''
                    },
                    {
                      name: 'testcases',
                      value: this.state.newPractical ? this.state.newPractical.testcases : ''
                    }
                  ]} >
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
                <Input/>
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
                <InputNumber/>
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
                <Input/>
              </Form.Item>
              <Form.Item name={'description'} label="Description"
                         rules={[
                           {
                             required: true,
                             message: 'Description is required!'
                           }]}>
                <Input.TextArea onChange={this.setDescription} value={this.state.description}/>
              </Form.Item>
              <Form.Item label="Difficulty" name={'difficulty'} rules={[
                {
                  required: true,
                  message: 'required!'
                }]}>
                <Select>
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
                <InputNumber/>
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
                <Input/>
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
                <Input.TextArea/>
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
                          <Input placeholder="Space delimited string for CLI input args"/>
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          label={'Outputs'}
                          name={[name, 'outputs']}
                          fieldKey={[fieldKey, 'outputs']}
                          rules={[{ required: true, message: 'Missing outputs' }]}
                        >
                          <Input.TextArea placeholder="Outputs"/>
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          label={'Description'}
                          name={[name, 'description']}
                          fieldKey={[fieldKey, 'description']}
                          rules={[{ required: true, message: 'Missing description' }]}
                        >
                          <Input.TextArea placeholder="Description"/>
                        </Form.Item>
                        <Button shape={'round'} icon={< MinusCircleOutlined/>}
                                onClick={() => remove(name)}>Remove</Button>
                      </Form.Item>
                    ))}
                    <Form.Item>
                      <Col offset={6}>
                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined/>}>
                          Add new testcase
                        </Button>
                      </Col>
                    </Form.Item>
                  </>
                )}
              </Form.List>
              <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 18 }}>
                <Button type="primary" htmlType="submit">
                  Add Practice Question
                </Button>
              </Form.Item>
            </Form>
          </Spin>
        </Card>
      </div>
    )
  }
}

export default withRouter(AddNewPractical)