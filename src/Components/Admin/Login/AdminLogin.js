import React from 'react';
import {withRouter} from 'react-router';
import jwt_decode from "jwt-decode";
import moment from 'moment';

//SERVICES
// import {getUserDetails, login, signup} from "../../Services/UserLoginService";

//STYLES
import {Form, Input, Button, Select, Col, Row, notification, Modal, DatePicker, Card, Layout,Typography} from 'antd';
import './AdminLogin.css';
import {UserOutlined,LockOutlined} from "@ant-design/icons";
import {adminLogin} from "../../../Services/AdminLogin";

var _ = require('underscore');

const { Header, Footer, Content } = Layout;
const { Title } = Typography;


class AdminLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
            userName: '',
            loginLoading: false,
        };
    }

    LogIn = async (values) => {

        this.setState({
            loginLoading: true
        })

        try {
            var session = await adminLogin(values);
            var decoded = jwt_decode(session.token);
            var usersession = {
                User: decoded.email,
                Token: session.token,
                Email: values.email,
                Id: decoded.email,
                Role: decoded.roles,
            };

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
        }
        catch (error) {
            notification.error({message: 'Error!', description: (error.message ? error.message : "")});
        }

        this.setState({
            loginLoading: false
        })
    };

    render() {
        return (
            <div>
                <Layout>
                    <Header>
                        <Title level={2} style={{ color: 'grey', textAlign: 'center' }}>Simply - Admin Portal</Title>
                    </Header>

                    <Content style={{ padding: '50px 50px' }}>
                        <div className="site-layout-content">
                            <Row>
                                <Col span={6} offset={9}>
                                    <Card title="Amin Login" style={{width:'400px'}} hoverable>
                                        <Form
                                            name="normal_login"
                                            className="login-form"
                                            onFinish={this.LogIn}
                                        >
                                            <Form.Item
                                                name="email"
                                                rules={[
                                                    {
                                                      type:"email",
                                                      message:"Invalid email"
                                                    },
                                                    {
                                                        required: true,
                                                        message: 'Please input your email!',
                                                    },
                                                ]}
                                            >
                                                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="E-mail" />
                                            </Form.Item>
                                            <Form.Item
                                                name="password"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please input your Password!',
                                                    },
                                                ]}
                                            >
                                                <Input.Password
                                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                                    type="password"
                                                    placeholder="Password"
                                                />
                                            </Form.Item>

                                            <Form.Item>
                                                <Col span={8} offset={18}>
                                                    <Button type="primary" htmlType="submit" className="login-form-button" loading={this.state.loginLoading}>
                                                        Log in
                                                    </Button>
                                                </Col>
                                            </Form.Item>
                                        </Form>

                                    </Card>

                                </Col>
                            </Row>
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Simply ©2020 Created by Team Insomaniac</Footer>
                </Layout>
            </div>
        );
    }
}

export default withRouter(AdminLogin);