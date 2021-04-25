import React, {Component, useContext} from 'react';
import {createHashHistory} from 'history';
import {ConfigProvider, Layout, Menu, Dropdown, Badge, Select} from 'antd';
import {
    UserOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    PoweroffOutlined, NotificationOutlined,
    TrophyTwoTone, FundTwoTone, CrownTwoTone
} from '@ant-design/icons';
import {Context} from "../../ConfigProvider";
// import { Logout } from '../../Services/AuthService';
import './TopNav.css';
import {logout} from "../../Services/UserLoginService";
import {Link} from "react-router-dom";

const {Header} = Layout;
const {Option} = Select;


class TopNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            role: '',
            user: ''
        };
    }

    componentDidMount() {
        var usersession = localStorage.getItem('usersession');
        var userSessionObj = JSON.parse(usersession);
        console.log(userSessionObj);
        var user = userSessionObj.User
        this.setState({
            username: user.fname,
            role: userSessionObj.Role[0],
            user: user
        });
    }

    LogoutClick = e => {
        if (e.key === 'logout') {
            logout();
            const history = createHashHistory();
            history.go("/simply/login");
        }
    };

    getUserMenu = () => {
        return (
            <Menu>
                <Menu.Item key="rank" icon={<TrophyTwoTone/>}>
                    Rank: {this.state.user.rank}
                </Menu.Item>
                <Menu.Item key="score" icon={<FundTwoTone/>}>
                    Score: {this.state.user.score}
                </Menu.Item>
                <Menu.Item key="score" icon={<CrownTwoTone/>}>
                    <Link to='/leaderboard'> Leaderboards</Link>
                </Menu.Item>
                <Menu.Item key="logout" icon={<UserOutlined/>}>
                    <Link to='/profile'> My Profile</Link>
                </Menu.Item>
                <Menu.Item key="logout" onClick={this.LogoutClick} icon={<PoweroffOutlined/>}>
                    LogOut
                </Menu.Item>
            </Menu>);
    }

    render() {
        // console.log(this.context);
        const {locale, selectLang} = this.context;
        return (
            <ConfigProvider locale={this.state.locale}>
                <Header className="site-layout-background">

                    {React.createElement(this.props.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'trigger',
                        onClick: this.props.onCollapse,
                    })}

                    <span role="img" style={{color: 'white', fontSize: '18px', fontWeight: '4px'}}>
                          {/*<img alt={"Welcome"} style={{height:'50px',width:'150px'}} src={'http://localhost:3000/simplyLogo.png'}/>*/}
                        Logo Here
                    </span>

                    <span className="top-hosp-name">
                      <img alt={"Welcome"} style={{height: '60px', width: '100px'}}
                           src={'https://ui-simply.herokuapp.com/simplyLogo.png'}/>
                    </span>
                    <div className="top-right-side">
                        <span>
                            <Select  style={{ width: 120 }} defaultValue={locale} onChange={selectLang}>
                                <Option value="en-US">English</Option>
                                <Option value="sn">සිංහල</Option>
                            </Select>
                            </span>
                        <span id="top-user-menu">
                            <Dropdown.Button overlay={this.getUserMenu()} placement="bottomCenter"
                                             icon={<UserOutlined/>}>
                                 {`${this.state.username} `}
                            </Dropdown.Button>
                        </span>
                    </div>
                </Header>
            </ConfigProvider>
        );
    };

}

TopNav.contextType = Context;
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