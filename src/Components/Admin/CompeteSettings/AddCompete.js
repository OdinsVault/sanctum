import React from 'react'
import { withRouter } from 'react-router'

//SERVICES
import { AdminLogOnStatus } from '../../../Services/AdminLogin'
import { NewCompete } from '../../../Services/AdminSettingsService'

//STYLES
import {
  Form, Input, InputNumber, Button, Card, PageHeader, Select,
  notification, Spin, Col, Divider, Row, Modal, Popconfirm
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { getQuestionByCategory } from '../../../Services/CompeteService'

const { Option } = Select

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 16,
  },
}
const testLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
}

class AddCompeteQuestion extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      dataLoading: false,
      competeByCategory: [],
      newCategory: null,
      newCompeteTitle: '',
      newCompeteCategory: '',
      newCompeteDescription: '',
      newCompeteDifficulty: '',
      newCompetePointsAllocated: '',
      newCompeteInputs: '',
      newCompeteOutputs: '',
      newPracticalTestcases: [],
      modalVisible: false, //testcase modal,
      editableTestCase: '',
      editableTestCaseId:''
    }
  }

  ////field value setters
  setTitle = (e) => {
    let title = e.target.value ? e.target.value : ''
    this.setState({
      newCompeteTitle: title
    })
  }
  setCategory = (e) => {
    this.setState({
      newCompeteCategory: e
    })
  }
  setDescription = (e) => {
    let desc = e.target.value ? e.target.value : ''
    this.setState({
      newCompeteDescription: desc
    })
  }
  setDifficulty = (e) => {
    this.setState({
      newCompeteDifficulty: e
    })
  }
  setPoints = (e) => {
    this.setState({
      newCompetePointsAllocated: e
    })
  }
  setInputs = (e) => {
    let inputs = e.target.value ? e.target.value : ''
    this.setState({
      newCompeteInputs: inputs
    })
  }
  setOutputs = (e) => {
    let outputs = e.target.value ? e.target.value : ''
    this.setState({
      newCompeteOutputs: outputs
    })
  }

  //////Test Case Methods////////
  addNewTestCase = () => {
    this.setState({
      modalVisible: true
    })
  }

  onTestCaseAdd = (test) => {
    let current = this.state.newPracticalTestcases;

    if (this.state.editableTestCaseId === ''){
      current.push(test)
    }else{
      current[this.state.editableTestCaseId] = test;
    }
    this.setState({
      newPracticalTestcases: current,
      modalVisible: false,
      editableTestCase: '',
      editableTestCaseId:''
    })
  }


  deleteTestCase = (item, index) => {
    var tests = this.state.newPracticalTestcases
    tests.splice(index, 1)
    this.setState({
      newPracticalTestcases: tests
    })
  }

  editTestCase = (item, index) => {
    this.setState({
      editableTestCase: this.state.newPracticalTestcases[index],
      editableTestCaseId:index,
      modalVisible: true
    })
  }

  ////Category dropdown methods
  setNewCategory = (e) => {
    let title = e.target.value ? e.target.value : ''
    this.setState({
      newCategory: title
    })
  }

  addNewCategory = () => {
    const { competeByCategory, newCategory } = this.state
    this.setState({
      competeByCategory: [...competeByCategory, newCategory],
      newCategory: '',
    })
  }

  /////form submit
  onFinish = async (data) => {
    if (!this.state.newPracticalTestcases || this.state.newPracticalTestcases.length < 1) {
      notification.warn({ message: 'Add at least one test case' })
    } else {
      this.setState({
        dataLoading: true
      })
      data.testcases = this.state.newPracticalTestcases
      try {
        var response = await NewCompete(data)
        notification.success({ message: 'Success!', description: response.message ? response.message : '' })

        this.setState({
          newCompeteTitle: '',
          newCompeteCategory: '',
          newCompeteDescription: '',
          newCompeteDifficulty: '',
          newCompetePointsAllocated: '',
          newCompeteInputs: '',
          newCompeteOutputs: '',
          newPracticalTestcases: [],
          editableTestCase: ''
        })
        this.getCategories();
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
  }

  getCategories = async () => {
    try {
      let cate = await getQuestionByCategory()
      var categories = []
      for (let i = 0; i < cate.categoryCount; i++) {
        categories[i] = cate.categories[i].category
      }
      this.setState({
        competeByCategory: categories
      })
    } catch (e) {
      notification.error({ message: 'Error!', description: e.message ? e.message : '' })
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
      this.getCategories()
    }
  }

  render () {
    return (
      <div>
        <Card>
          <PageHeader
            className="site-page-header"
            title="Add New Compete Question"
          />
          <Spin spinning={this.state.dataLoading}>
            <Form {...layout} name="nest-messages" onFinish={this.onFinish}
                  fields={[
                    {
                      name: 'title',
                      value: this.state.newCompeteTitle ? this.state.newCompeteTitle : ''
                    },
                    {
                      name: 'category',
                      value: this.state.newCompeteCategory ? this.state.newCompeteCategory : ''
                    },
                    {
                      name: 'description',
                      value: this.state.newCompeteDescription ? this.state.newCompeteDescription : ''
                    },
                    {
                      name: 'difficulty',
                      value: this.state.newCompeteDifficulty ? this.state.newCompeteDifficulty : ''
                    },
                    {
                      name: 'pointsAllocated',
                      value: this.state.newCompetePointsAllocated ? this.state.newCompetePointsAllocated : ''
                    },
                    {
                      name: 'inputs',
                      value: this.state.newCompeteInputs ? this.state.newCompeteInputs : ''
                    }, {
                      name: 'outputs',
                      value: this.state.newCompeteOutputs ? this.state.newCompeteOutputs : ''
                    },
                    {
                      name: 'testcases',
                      value: this.state.newPracticalTestcases ? this.state.newPracticalTestcases : ''
                    }
                  ]}>
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
                <Input onChange={this.setTitle} value={this.state.newCompeteTitle}/>
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
                <Select
                  allowClear
                  style={{ width: 240 }}
                  placeholder="Select Category"
                  onChange={this.setCategory}
                  value={this.state.newCompeteCategory}
                  dropdownRender={menu => (
                    <div>
                      {menu}
                      <Divider style={{ margin: '4px 0' }}/>
                      <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
                        <Input style={{ flex: 'auto' }} value={this.state.newCategory}
                               onChange={(e) => this.setNewCategory(e)}/>
                        <Button
                          disabled={!this.state.newCategory}
                          style={{ flex: 'none', padding: '8px', display: 'block', cursor: 'pointer' }}
                          onClick={this.addNewCategory}
                        >Add item</Button>
                      </div>
                    </div>
                  )}
                >
                  {this.state.competeByCategory.map((category) => (
                    <Option key={category} value={category}>{category}</Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item name={'description'} label="Description"
                         rules={[
                           {
                             required: true,
                             message: 'Description is required!'
                           }]}>
                <Input.TextArea onChange={this.setDescription} value={this.state.newCompeteDescription}/>
              </Form.Item>
              <Form.Item label="Difficulty" name={'difficulty'} rules={[
                {
                  required: true,
                  message: 'required!'
                }]}
              >
                <Select onChange={this.setDifficulty} value={this.state.newCompeteDifficulty}>
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
                <InputNumber onChange={this.setPoints} value={this.state.newCompetePointsAllocated}/>
              </Form.Item>
              <Form.Item
                name={'inputs'}
                label="Input"
                rules={[
                  {
                    required: true,
                    message: 'Input is required!'
                  },
                ]}
              >
                <Input onChange={this.setInputs} value={this.state.newCompeteInputs}/>
              </Form.Item>
              <Form.Item
                name={'outputs'}
                label="Outputs"
                rules={[
                  {
                    required: true,
                    message: 'Output is required!'
                  },
                ]}
              >
                <Input onChange={this.setOutputs} value={this.state.newCompeteOutputs}/>
              </Form.Item>
              <Form.Item name={'testcases'} label={'Test Cases'} getValueProps={() => this.state.newPracticalTestcases}>
                <Row gutter={16}>
                  {this.state.newPracticalTestcases.map((item, index) => (
                    <Col span={8}>
                      <Card hoverable>
                        <Row>{item.title}</Row>
                        <Row>
                          <Col offset={12} span={6}><a onClick={() => this.editTestCase(item, index)}>Edit</a></Col>
                          <Col> <a><Popconfirm title={'Delete test case?'}
                                               onConfirm={() => this.deleteTestCase(item, index)}>

                            Delete</Popconfirm></a>
                          </Col>
                        </Row>
                      </Card>
                    </Col>
                  ))}
                </Row>
                <Row style={{ marginTop: '5px' }}>
                  <Col>
                    <Button type="dashed" onClick={() => this.addNewTestCase()} block icon={<PlusOutlined/>}>
                      Add new testcase
                    </Button>
                  </Col>
                </Row>
              </Form.Item>
              <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 18 }}>
                <Button type="primary" htmlType="submit">
                  Add Question
                </Button>
              </Form.Item>
            </Form>
          </Spin>
        </Card>

        {/*/////////Test case modal////////*/}
        <Modal title="Add Test Case"
               visible={this.state.modalVisible}
               footer={[]}
               onCancel={() => this.setState({ modalVisible: false })}
        >
          <Form {...testLayout} name="test-case" onFinish={this.onTestCaseAdd}
                fields={[
                  {
                    name: 'title',
                    value: this.state.editableTestCase ? this.state.editableTestCase.title : ''
                  }, {
                    name: 'inputs',
                    value: this.state.editableTestCase ? this.state.editableTestCase.inputs : ''
                  }, {
                    name: 'description',
                    value: this.state.editableTestCase ? this.state.editableTestCase.description : ''
                  }, {
                    name: 'outputs',
                    value: this.state.editableTestCase ? this.state.editableTestCase.outputs : ''
                  }]}
          >
            <Form.Item
              label={'Title'}
              name={'title'}
              fieldKey={'title'}
              rules={[{ required: true, message: 'Missing title' }]}
            >
              <Input placeholder="Inputs"/>
            </Form.Item>
            <Form.Item
              label={'Inputs'}
              name={'inputs'}
              fieldKey={'inputs'}
              rules={[{ required: true, message: 'Missing inputs' }]}
            >
              <Input placeholder="Inputs"/>
            </Form.Item>
            <Form.Item
              label={'Outputs'}
              name={'outputs'}
              fieldKey={'outputs'}
              rules={[{ required: true, message: 'Missing outputs' }]}
            >
              <Input placeholder="Outputs"/>
            </Form.Item>
            <Form.Item
              label={'Description'}
              name={'description'}
              fieldKey={'description'}
              rules={[{ required: true, message: 'Missing description' }]}
            >
              <Input placeholder="Description"/>
            </Form.Item>
            <Form.Item>
              <Row>
                <Col offset={13}>
                  <Button key="back"
                          onClick={() => this.setState({
                            modalVisible: false,
                            editableTestCase: '',
                            editableTestCaseId:'' })
                          }>
                    Cancel
                  </Button>
                </Col>
                <Col offset={1}>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Col>
              </Row>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    )
  }
}

export default withRouter(AddCompeteQuestion)