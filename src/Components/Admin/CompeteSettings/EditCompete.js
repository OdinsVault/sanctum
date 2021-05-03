import React from 'react'
import { withRouter } from 'react-router'

//SERVICES
import { AdminLogOnStatus } from '../../../Services/AdminLogin'
import { DeleteCompete, EditCompete} from '../../../Services/AdminSettingsService';

//STYLES
import {
  Form, Input, InputNumber, Button, Card, PageHeader, Select,
  notification, Spin, Col, Divider, Row, Modal, Popconfirm
} from 'antd'
import { PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { getCompeteQuestionById, getQuestionByCategory } from '../../../Services/CompeteService'

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

class EditCompeteQuestion extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      dataLoading: false,
      competeByCategory:'',     //retrieved object from byCategory
      categoryTypes: [],        //for dropdown
      selectedCategory:null,     //selected category
      selectedQueList: '',      //question list related to selected category
      selectedQuestionId:null,  //selected question Id
      selectedQuestion:'', //detailed selected question object
      newCategory: null,
      newCompeteTitle: '',
      newCompeteCategory: '',
      newCompeteDescription: '',
      newCompeteDifficulty: '',
      newCompetePointsAllocated: '',
      newCompeteInputs: '',
      newCompeteOutputs: '',
      newPracticalTestcases: [],
      editableTestCase: '',
      editableTestCaseId:'',
      isEditable:'',//question editable
      modalVisible: false //testcase modal,
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
    const { categoryTypes, newCategory } = this.state
    this.setState({
      categoryTypes: [...categoryTypes, newCategory],
      newCategory: '',
    })
  }

  /////search dropdown methods

  selectCategory = (e) => {
    this.setState({
      selectedCategory: e,
      selectedQueList: '',
      selectedQuestionId: null
    })
    if (e) {
      this.getQuestions(e)
    }

  }

  getQuestions = (e) => {
    var qList = ''
    for (let i = 0; i < this.state.competeByCategory.categoryCount; i++) {
      if (e === this.state.competeByCategory.categories[i].category) {
        qList = this.state.competeByCategory.categories[i]
        break;
      }
    }
    this.setState({
      selectedQueList: qList,
    })
  }

  selectQuestion = (e) => {
    this.setState({ selectedQuestionId: e })
  }

  searchQuestion = async () => {
    this.setState({
      dataLoading: true
    })
    try {
      var que = await getCompeteQuestionById(this.state.selectedQuestionId)
      this.setState({
        selectedQuestion: que,
        newCompeteTitle: que.title,
        newCompeteCategory: que.category,
        newCompeteDescription:que.description,
        newCompeteDifficulty: que.difficulty ,
        newCompetePointsAllocated: que.pointsAllocated,
        newCompeteInputs: que.inputs,
        newCompeteOutputs: que.outputs,
        newPracticalTestcases: que.testcases,
        isEditable: true
      })
    } catch (e) {
      notification.error({ message: 'Error!', description: e.message ? e.message : '' })
    }
    this.setState({
      dataLoading: false
    })
  }



  /////form submit
  onCancel = () => {
    this.setState({
      selectedCategory: null,
      selectedQueList: '',
      selectedQuestionId: null,
      selectedQuestion: '',
      newCompeteTitle: '',
      newCompeteCategory: '',
      newCompeteDescription:'',
      newCompeteDifficulty: '' ,
      newCompetePointsAllocated: '',
      newCompeteInputs: '',
      newCompeteOutputs: '',
      newPracticalTestcases: [],
      editableTestCase: '',
      isEditable: false
    })
  }

  onDelete = async () => {
    this.setState({
      dataLoading: true
    })
    try {
      let qId = this.state.selectedQuestion._id
      var response = await DeleteCompete(qId)
      notification.success({
        message: 'Success!',
        description: response.message ? response.message : 'Deleted Successfully!'
      })

      this.onCancel(); //to reset
      this.getCategories();

    } catch (e) {
      notification.error({ message: 'Error!', description: e.message ? e.message : 'Error deleting!' })
    }
    this.setState({
      dataLoading: false
    })
  }


  onFinish = async (data) => {
    if (!this.state.newPracticalTestcases || this.state.newPracticalTestcases.length < 1) {
      notification.warn({ message: 'Add at least one test case' })
    } else {
      this.setState({
        dataLoading: true
      })
      data.testcases = this.state.newPracticalTestcases
      try {
        let qId = this.state.selectedQuestion._id
        var response = await EditCompete(qId, data)
        notification.success({ message: 'Success!', description: response.message ? response.message : '' })

        this.onCancel();   //to reset
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
        competeByCategory:cate,
        categoryTypes: categories,

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
            title="Edit/Delete Compete Questions"
          />
          <Card title={'Select Question Category'}>
            <Row>
              <Col>
                <Select style={{ width: 250 }} size={'middle'}
                        placeholder={'Select Practice Level'}
                        allowClear
                        onClear={this.selectCategory}
                        onSelect={this.selectCategory}
                        value={this.state.selectedCategory}
                >
                  {this.state.categoryTypes ? (this.state.categoryTypes.map(category => (
                    <Option key={category} value={category}>{category}</Option>)
                  )) : ''}
                </Select>
              </Col>
              <Col offset={1}>
                <Select
                  disabled={!this.state.selectedCategory}
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
                <Input disabled={!this.state.isEditable} onChange={this.setTitle} value={this.state.newCompeteTitle}/>
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
                  disabled={!this.state.isEditable}
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
                  {this.state.categoryTypes.map((category) => (
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
                <Input.TextArea disabled={!this.state.isEditable} onChange={this.setDescription} value={this.state.newCompeteDescription}/>
              </Form.Item>
              <Form.Item label="Difficulty" name={'difficulty'} rules={[
                {
                  required: true,
                  message: 'required!'
                }]}
              >
                <Select disabled={!this.state.isEditable} onChange={this.setDifficulty} value={this.state.newCompeteDifficulty}>
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
                <InputNumber disabled={!this.state.isEditable} onChange={this.setPoints} value={this.state.newCompetePointsAllocated}/>
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
                <Input disabled={!this.state.isEditable} onChange={this.setInputs} value={this.state.newCompeteInputs}/>
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
                <Input.TextArea disabled={!this.state.isEditable} onChange={this.setOutputs} value={this.state.newCompeteOutputs}/>
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
                    <Button type="dashed" disabled={!this.state.isEditable} onClick={() => this.addNewTestCase()} block icon={<PlusOutlined/>}>
                      Add new testcase
                    </Button>
                  </Col>
                </Row>
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
                      title="Continue to delete?"
                      onConfirm={() => this.onDelete()}
                      // onCancel={cancel}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button danger disabled={!this.state.isEditable}>
                        Delete
                      </Button>
                    </Popconfirm>
                    <Button type={'primary'} htmlType="submit" disabled={!this.state.isEditable}>
                      Edit
                    </Button>
                  </Col>
                </Row>
              </Form.Item>
            </Form>
          </Spin>
          </Card>
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
              <Input placeholder="Title"/>
            </Form.Item>
            <Form.Item
              label={'Inputs'}
              name={'inputs'}
              fieldKey={'inputs'}
              rules={[{ required: true, message: 'Missing inputs' }]}
            >
              <Input placeholder="Space delimited string for CLI input args"/>
            </Form.Item>
            <Form.Item
              label={'Outputs'}
              name={'outputs'}
              fieldKey={'outputs'}
              rules={[{ required: true, message: 'Missing outputs' }]}
            >
              <Input.TextArea placeholder="Outputs"/>
            </Form.Item>
            <Form.Item
              label={'Description'}
              name={'description'}
              fieldKey={'description'}
              rules={[{ required: true, message: 'Missing description' }]}
            >
              <Input.TextArea placeholder="Description"/>
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

export default withRouter(EditCompeteQuestion)