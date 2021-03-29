import React from 'react';
import {Form, Input, Button, Select, Col, Card, Row, notification, Modal, DatePicker} from 'antd';
import {withRouter} from 'react-router';
import {getUserDetails, login, signup} from "../../Services/UserLoginService";
import './Login.css';
import {Header} from "antd/es/layout/layout";
import jwt_decode from "jwt-decode";
import moment from 'moment';

var _ = require('underscore');

const {Option} = Select;
const {Meta} = Card;

const layout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 20,
        span: 4,
    },
};

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
            userName: '',
            email:'',
            password:'',
            loginModalVisible: false,
            signUpModalVisible: false,
        };
    }

    setEmail = (e) =>{
        let mail = e.target.value
        this.setState({
            email:mail
        })
    }

    setPassword = (e) =>{
        let pw = e.target.value
        this.setState({
            password:pw
        })
    }


    LogIn = async () => {
        let values = {
            email:this.state.email,
            password:this.state.password
        }
        try {
            var session = await login(values)
            var decoded = jwt_decode(session.token);
            var usersession = {
                User: decoded.email,
                Token: session.token,
                Email: decoded.email,
                Id: decoded.userId,
                Role: decoded.roles,
            };
            if (decoded.userId) {
                try {
                    var user = await getUserDetails(decoded.userId);
                    if (user._id) {
                        usersession.User = user
                    }
                } catch (error) {
                    notification.error({
                        message: 'Error!',
                        description: (error.cause ? error.cause : "Error getting user details!")
                    });
                }
            }
            localStorage.setItem("token", usersession.Token);
            localStorage.setItem('usersession', JSON.stringify(usersession));

            if ((session.token !== null) || (session.token !== undefined)) {
                this.props.history.push({
                    pathname: "/dashboard",
                    user: usersession
                });
            } else {
                this.props.history.goBack();
            }
        } catch (error) {
            notification.error({message: 'Error!', description: (error.cause ? error.cause : "")});
        }

        this.setState({
            loginModalVisible: false,
            signUpModalVisible: false,
        })
    };

    signUp = async(values) =>{
        // console.log(values);
        var user = {
            fname: values.fname,
            lname: values.lname,
            email: values.email,
            password: values.password,
            dob: values.dob,
            institute: values.institute,
            xp: values.xp
        }
        try{
            var response = await signup(user);
            if(response){
                notification.success({message:"Success!" ,description:'Please login to continue.'})
            }
        }catch (error){
            notification.error({message: 'Error!', description: (error.cause ? error.cause : "")});
        }

    }


    render() {
        return (
            <div className="LoginForm">
                <div className="bg-image">
                    <div className="loginText">
                        <Row>
                            <Col span={4} offset={7}>
                                <Button size='large' shape="round"
                                        onClick={() => this.setState({signUpModalVisible: true})}>Sign Up</Button>
                            </Col>
                            <Col>
                                <Button size='large' shape="round"
                                        onClick={() => this.setState({loginModalVisible: true})}>Login</Button>
                            </Col>
                        </Row>
                    </div>
                </div>


                {/*   Login Modal */}

                <Modal
                    title="Login"
                    centered
                    bodyStyle={{backgroundColor: '#eee6fc'}}
                    visible={this.state.loginModalVisible}
                    // onOk={() => this.setModal2Visible(false)}
                    onCancel={() => this.setState({loginModalVisible: false})}
                    footer={[
                        <Button key="submit" shape="round" disabled>
                            Forgot Password
                        </Button>,
                    ]}
                >
                    <Form
                        {...layout}
                        name="basic"
                        onFinish={this.LogIn}
                    >
                        <Form.Item label="Email"
                                   onChange={this.setEmail}
                                   name="email"
                                   value={this.state.email}
                                   rules={[
                                       {
                                           type: 'email',
                                           required: true,
                                           message: 'Please enter valid email!',
                                       },
                                   ]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item label="Password"
                                   name="password"
                                   onChange={this.setPassword}
                                   value={this.state.password}
                                   rules={[
                                       {
                                           required: true,
                                           message: 'Please input your password!',
                                       },
                                   ]}
                        >
                            <Input.Password/>
                        </Form.Item>

                        <Col offset={18}>
                            <Button shape="round" size='large'
                                    // htmlType="submit"
                                    onClick={this.LogIn}>
                                Login
                            </Button>
                        </Col>
                    </Form>
                </Modal>


                {/*   SignUp Modal */}

                <Modal
                    title="Sign Up"
                    centered
                    bodyStyle={{backgroundColor: '#e8f0ff'}}
                    visible={this.state.signUpModalVisible}
                    // onOk={() => this.setModal2Visible(false)}
                    onCancel={() => this.setState({signUpModalVisible: false})}
                    footer={[
                        <span style={{color: '#7fa3eb'}}><b>Continue your journey with Simply...!</b></span>,
                        // <Button key="submit" shape="round" disabled>
                        //     Forgot Password
                        // </Button>,
                    ]}
                >
                    <Form
                        {...layout}
                        name="basic"
                        onFinish={this.signUp}
                        autoComplete={"off"}
                    >
                        <Form.Item label="First Name" name="fname"
                                   rules={[
                                       {
                                           required: true,
                                           message: 'Please enter your first name!',
                                       },
                                   ]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item label="Last Name" name="lname"
                                   // rules={[
                                   //     {
                                   //         required: true,
                                   //         message: 'Please enter your last name!',
                                   //     },
                                   // ]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item label="Email" name="email"
                                   rules={[
                                       {
                                           type: 'email',
                                           required: true,
                                           message: 'Please enter valid email!',
                                       },
                                   ]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item label="Date of Birth" name="dob">
                            <DatePicker
                                format="YYYY-MM-DD"
                                disabledDate={disabledDate}
                            />
                        </Form.Item>
                        <Form.Item label="Institute" name="institute">
                            <Input/>
                        </Form.Item>
                        <Form.Item name="xp" label="Experience"
                                   rules={[
                                       {
                                           required: true,
                                           message: 'Please select your level of expertise!'
                                       }
                                       ]}>
                            <Select
                                placeholder="Level of experience in programming"
                                onChange={this.onGenderChange}
                                allowClear
                            >
                                <Option value="Beginner">Newbie</Option>
                                <Option value="Intermediate">Intermediate</Option>
                                <Option value="Advanced">Expert</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="password"
                            label="Password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                            hasFeedback
                        >
                            <Input.Password/>
                        </Form.Item>

                        <Form.Item
                            name="confirm"
                            label="Confirm Password"
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
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
                            <Input.Password/>
                        </Form.Item>
                        <Col offset={18}>
                            <Button shape="round" size='large' htmlType="submit">
                                Sign Up
                            </Button>
                        </Col>
                    </Form>
                </Modal>

            </div>
        );
    }
}

function disabledDate(current) {
    // Can not select days after today
    return current > moment().endOf('day');
}

export default withRouter(Login)