import React from 'react';
import {Form, Input, Button, Checkbox, Col, Card, Row, notification, Modal} from 'antd';
import {withRouter} from 'react-router';
import {getUserDetails, login} from "../../Services/UserLoginService";
import './Login.css';
import {Header} from "antd/es/layout/layout";
import jwt_decode from "jwt-decode";

var _ = require('underscore');

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
            loginModalVisible: false,
            signUpModalVisible: false,
        };
    }


    LogIn = async (values) => {
        // this.setState({})
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
                    notification.error({message: 'Error!', description: (error.cause ? error.cause : "Error getting user details!")});
                }
            }
            localStorage.setItem("token", usersession.Token);
            localStorage.setItem('usersession', JSON.stringify(usersession));

            if ((session.token !== null) || (session.token !== undefined)) {
                this.props.history.push({
                    pathname: "/dashboard",
                    user:usersession
                });
            }
            else {
                this.props.history.goBack();
            }
        } catch (error) {

            notification.error({message: 'Error!', description: (error.cause ? error.cause : "")});
        }

        // this.setState({
        //     loginModalVisible: false,
        //     signUpModalVisible: false,
        // })
    };


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

                        <Form.Item label="Password" name="password"
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
                            <Button shape="round" size='large' htmlType="submit">
                                Login
                            </Button>
                        </Col>
                    </Form>
                </Modal>


                {/*   SignUp Modal */}

                <Modal
                    title="Sign Up"
                    centered
                    bodyStyle={{backgroundColor: '#ffe9d4'}}
                    visible={this.state.signUpModalVisible}
                    // onOk={() => this.setModal2Visible(false)}
                    onCancel={() => this.setState({signUpModalVisible: false})}
                    footer={[
                        <span style={{color: '#cc935c'}}>Continue your journey with Simply...!</span>,
                        // <Button key="submit" shape="round" disabled>
                        //     Forgot Password
                        // </Button>,
                    ]}
                >

                    {/*"fname": "hasintha",*/}
                    {/*"lname": "abeykoon",*/}
                    {/*"email": "hasinthaabyekoon@gmail.com",*/}
                    {/*"password": "hasintha123",*/}
                    {/*"dob": "12/25/1996",*/}
                    {/*"institute": "UoM",*/}
                    {/*"xp": "Beginner"*/}
                    <Form
                        {...layout}
                        name="basic"
                        onFinish={this.LogIn}
                        autoComplete={"off"}
                    >
                        <Form.Item label="First Name" name="fname"
                                   rules={[
                                       {
                                           required: true,
                                           // message: 'Please input your username!',
                                       },
                                   ]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item label="Last Name" name="lname"
                                   rules={[
                                       {
                                           required: true,
                                           message: 'Please enter your lastname!',
                                       },
                                   ]}
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

                        <Form.Item label="Password" name="password"
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

export default withRouter(Login)