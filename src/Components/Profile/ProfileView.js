import React from 'react';
import {withRouter} from 'react-router';
import moment from "moment";

//SERVICES
import {getUser, updateUser} from "../../Services/UserService";
import {CheckLogOnStatus} from "../../Services/UserLoginService";

//STYLES
import {
    Button, Col, PageHeader, Card, Row, Spin, List, notification, Descriptions, Form, Input, Checkbox,
    Modal, DatePicker, Divider, Skeleton, Select, Rate
} from 'antd';
import {EditOutlined, ExclamationCircleOutlined} from '@ant-design/icons';


const layout = {
    labelCol: {
        span: 5,
    },
    wrapperCol: {
        span: 18,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 20,
        span: 6,
    },
};

const config = {
    rules: [
        {
            type: 'object',
            required: true,
            message: 'Please select time!',
        },
    ],
};

class ProfileView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            user: '',
            updatedUser: '',
            changePassword: false,
            isEditEnabled: false,
            userLoading: false,
            confirmationVisible: false
        };
    }

    submitUserDetails = async () => {

        this.setState({
            userLoading: true,
            isEditEnabled: false,
            confirmationVisible: false
        })
        var sendUser = {
            fname: this.state.updatedUser.fname ? this.state.updatedUser.fname : this.state.user.fname,
            lname: this.state.updatedUser.lname ? this.state.updatedUser.lname : this.state.user.lname,
            email: this.state.updatedUser.email ? this.state.updatedUser.email : this.state.user.email,
            password: this.state.updatedUser.password ? this.state.updatedUser.password : '',
            dob: this.state.updatedUser.dob ? moment(this.state.updatedUser.dob) : this.state.user.dob,
            institute: this.state.updatedUser.institute ? this.state.updatedUser.institute : this.state.user.institute,
            xp: this.state.updatedUser.xp ? this.state.updatedUser.xp : this.state.user.xp
        }

        try {
            var getUser = await updateUser(sendUser);
            if (getUser) {
                this.setState({
                    user: getUser.result
                })
            }
            notification.success({
                message: "Success",
                description: getUser.message ? getUser.message : "User updated successfully!"
            })
            //if password changed log out
        } catch (e) {
            notification.error({message: "Error", description: e.message ? e.message : "Error updating user!"})
        }

        this.setState({
            userLoading: false
        })
    }

    openConfirmationModal = (data) => {
        this.setState({
            updatedUser: data
        })
        this.setState({
            confirmationVisible: true
        })
    }

    enableEdit = async (e) => {
        if (!e) {
            await this.getUserDetails();
        }
        this.setState({
            isEditEnabled: e,
            updatedUser: ''
        })
    }

    getUserDetails = async () => {
        this.setState({
            userLoading: true
        })
        // var token = localStorage.getItem('token');
        try {
            var user = await getUser();
            if (user) {
                this.setState({
                    user: user
                })
            }
        } catch (e) {
            notification.error({message: "Error!", description: e.message ? e.message : "Error fetching data"})
        }
        this.setState({
            userLoading: false
        })
    }

    async componentDidMount() {
        let loggedIn = CheckLogOnStatus();
        if (loggedIn) {
            await this.getUserDetails();
        } else {
            this.props.history.push({
                pathname: `/dashboard`,
                state: ''
            });
        }
    }

    render() {
        var user = this.state.user
        return (
            <div>
                <Card>
                    <PageHeader className="site-page-header" title={"Profile: " + user.fname + " " + user.lname}/>

                    <Card title="Personal Info">
                        {
                            this.state.userLoading ? <Skeleton active/> :
                                (<div>
                                    <Row style={{marginBottom: '40px'}}>
                                        <Col offset={22}>
                                            <Button onClick={() => this.enableEdit(true)}><EditOutlined/> Edit</Button>
                                        </Col>
                                    </Row>
                                    <Form
                                        name="basic"
                                        initialValues={{
                                            fname: user.fname,
                                            lname: user.lname,
                                            mail: user.email,
                                            dob: moment(user.dob),
                                            xp: user.xp,
                                            institute: user.institute
                                        }}
                                        onFinish={this.openConfirmationModal}
                                        // onFinishFailed={onFinishFailed}
                                    >
                                        <Row>
                                            <Col span={14}>
                                                <Row>
                                                    <Col span={12}>
                                                        <Form.Item
                                                            label="First Name"
                                                            labelCol={{span: 6, offset: 4}}
                                                            wrapperCol={{span: 16}}
                                                            name="fname"
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message: 'Please input your username!',
                                                                },
                                                            ]}
                                                        >
                                                            <Input disabled={!this.state.isEditEnabled}/>
                                                        </Form.Item>
                                                    </Col>
                                                    <Col span={12}>
                                                        <Form.Item
                                                            labelCol={{span: 6}}
                                                            wrapperCol={{span: 16}}
                                                            label="Last Name" name="lname">
                                                            <Input disabled={!this.state.isEditEnabled}/>
                                                        </Form.Item>
                                                    </Col>
                                                </Row>
                                                <Form.Item
                                                    {...layout}
                                                    name="mail"
                                                    label="E-mail"
                                                    rules={[
                                                        {
                                                            type: 'email',
                                                            message: 'The input is not valid E-mail!',
                                                        },
                                                        {
                                                            required: true,
                                                            message: 'Please input your E-mail!',
                                                        },
                                                    ]}
                                                > <Input value={user.email} disabled={!this.state.isEditEnabled}/>
                                                </Form.Item>
                                                <Form.Item{...layout} name="dob"
                                                          label="Date of Birth" {...config}>
                                                    <DatePicker disabled={!this.state.isEditEnabled}/>
                                                </Form.Item>
                                                <Form.Item{...layout} name="xp" label="Experience">
                                                    <Select defaultValue={user.xp} disabled={!this.state.isEditEnabled}>
                                                        <Select.Option value="Beginner">Newbie</Select.Option>
                                                        <Select.Option value="Intermediate">Intermediate</Select.Option>
                                                        <Select.Option value="Advanced">Expert</Select.Option>
                                                    </Select>
                                                </Form.Item>

                                                <Form.Item {...layout} name="institute" label="Institute/Organization"
                                                           rules={[
                                                               {
                                                                   required: true,
                                                                   message: "Enter your institute/organization name"
                                                               }
                                                           ]}>
                                                    <Input disabled={!this.state.isEditEnabled}/>
                                                </Form.Item>
                                            </Col>
                                            <Col span={10}>
                                                <Form.Item
                                                    labelCol={{span: 7}}
                                                    label="Password"
                                                    name="password"
                                                    rules={[
                                                        {
                                                            required: this.state.changePassword,
                                                            message: 'Please input your password!',
                                                        },
                                                        {
                                                            min: 6,
                                                            message: 'Minimum password length is 6'
                                                        }
                                                    ]}
                                                    hasFeedback
                                                >
                                                    <Input.Password
                                                        disabled={!this.state.isEditEnabled || !this.state.changePassword}/>
                                                </Form.Item>
                                                {this.state.isEditEnabled ?
                                                    (<div>
                                                        {this.state.changePassword ? (<Form.Item
                                                            labelCol={{span: 7}}
                                                            name="confirm"
                                                            label="Confirm Password"
                                                            dependencies={['password']}
                                                            hasFeedback
                                                            rules={[
                                                                {
                                                                    required: this.state.changePassword,
                                                                    message: 'Please confirm your password!',
                                                                },
                                                                ({getFieldValue}) => ({
                                                                    validator(_, value) {
                                                                        if (!value || getFieldValue('password') === value) {
                                                                            return Promise.resolve();
                                                                        }

                                                                        return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                                                    },
                                                                }),
                                                            ]}
                                                        >
                                                            <Input.Password disabled={!this.state.isEditEnabled}/>
                                                        </Form.Item>) : ''}
                                                        <Form.Item wrapperCol={{span: 10, offset: 3}}>
                                                            <Checkbox checked={this.state.changePassword}
                                                                      onChange={(e) => {
                                                                          this.setState({changePassword: e.target.checked})
                                                                      }}>
                                                                Change password
                                                            </Checkbox>
                                                        </Form.Item></div>) : ''
                                                }
                                            </Col>
                                        </Row>
                                        <Form.Item {...tailLayout}>
                                            {this.state.isEditEnabled ? (
                                                <div>
                                                    <Button onClick={() => this.enableEdit(false)}>
                                                        Cancel
                                                    </Button>
                                                    <Button type="primary" htmlType="submit">
                                                        Submit
                                                    </Button>
                                                </div>) : ''
                                            }
                                        </Form.Item>
                                    </Form>
                                </div>)
                        }
                    </Card>
                    <Divider/>
                    <Card title="Achievements">
                        <Descriptions bordered>
                            <Descriptions.Item span={1} label="Score">{user.score}</Descriptions.Item>
                            <Descriptions.Item span={2} label="Completed">{user.completion}</Descriptions.Item>
                            <Descriptions.Item label="Completed quizzes">{user.completion}</Descriptions.Item>
                            <Descriptions.Item label="Rating"><Rate disabled defaultValue={2.5}/></Descriptions.Item>
                        </Descriptions>
                    </Card>
                </Card>


                {/*////////////////////confirmation modal//////////////////////*/}

                <Modal visible={this.state.confirmationVisible}
                       title='Are you  sure want to change information?'
                       icon={<ExclamationCircleOutlined/>}
                       content={"Make sure you remember email and passwords before changing!"}
                       onOk={() => {
                           this.submitUserDetails()
                       }}
                       onCancel={() => {
                           this.setState({confirmationVisible: false})
                       }}>
                    <p>Make sure you remember email and passwords before changing!</p>
                </Modal>
            </div>
        )
    }
}

export default withRouter(ProfileView);


