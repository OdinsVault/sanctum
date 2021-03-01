import React, {Component} from 'react';
import {createHashHistory} from 'history';
import {ConfigProvider, Layout, Menu, Dropdown, Badge} from 'antd';
import {
    UserOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    PoweroffOutlined, NotificationOutlined
} from '@ant-design/icons';

// import { Logout } from '../../Services/AuthService';
import './TopNav.css';

const {Header} = Layout;

class TopNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            role: '',
            hospital: ''
        };
    }

    // componentDidMount() {
    //     var usersession = localStorage.getItem('usersession');
    //     var userSessionObj = JSON.parse(usersession);

    //     this.setState({
    //         username: userSessionObj.UserName,
    //         role: userSessionObj.Role,
    //         hospital: userSessionObj.Hospital
    //     });
    // }

    handleUserMenuClick = e => {
        if (e.key === 'logout') {
            // Logout();
            const history = createHashHistory();
            history.go("/login");
        }
    };

    getUserMenu = () => {
        return (
            <Menu >
                <Menu.Item key="logout" icon={<UserOutlined />}>
                    My Profile
                </Menu.Item>
                <Menu.Item key="logout" onClick={this.handleUserMenuClick} icon={<PoweroffOutlined/>}>
                    LogOut
                </Menu.Item>
            </Menu>);
    }

    render() {
        return (
            <ConfigProvider locale={this.state.locale}>
                <Header className="site-layout-background">

                    {React.createElement(this.props.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'trigger',
                        onClick: this.props.onCollapse,
                    })}

                    <span role="img" style={{color: 'white', fontSize: '18px', fontWeight: '4px'}}>
                        {/* <img style={{ width: '5%' }} src="./public/Images/691027.jpg" className="align-center" alt="DIPS" /> */}
                        Logo Here
                    </span>

                    <span className="top-hosp-name">
                      Simple Steps to Simply...
                    </span>
                    <div className="top-right-side">
                        <span>
                        <Dropdown overlay={menu}>
                        <Badge dot>
                            <NotificationOutlined />
                        </Badge>
                        </Dropdown>
                            </span>
                        <span id="top-user-menu">
                            <Dropdown.Button overlay={this.getUserMenu()} placement="bottomCenter"
                                             icon={<UserOutlined/>}>
                                {/* {`${this.state.username} | ${this.state.role}`} */} UserName
                            </Dropdown.Button>
                        </span>
                    </div>
                </Header>
            </ConfigProvider>
        );
    };

}

export default TopNav


const menu = (
    <Menu>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
               You have notifications
            </a>
        </Menu.Item>
    </Menu>
);