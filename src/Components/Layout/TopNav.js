import React, {Component,} from 'react';
import {Link} from "react-router-dom";
import {withRouter} from "react-router";
import {Context} from "../../ConfigProvider";
import {createHashHistory} from 'history';

//services
import {logout} from "../../Services/UserLoginService";

//css
import {ConfigProvider, Layout, Menu, Dropdown, Badge, Select, Button} from 'antd';
import {UserOutlined, MenuUnfoldOutlined, MenuFoldOutlined, PoweroffOutlined, NotificationOutlined,
    TrophyTwoTone, FundTwoTone, CrownTwoTone} from '@ant-design/icons';
import './TopNav.css';

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
        if(usersession){
        var userSessionObj = JSON.parse(usersession);
        var user = userSessionObj.User
        this.setState({
            username: user.fname,
            role: userSessionObj.Role[0],
            user: user
        });
        }
    }

    LogInClick = () =>{
        this.props.history.push({
            pathname: `/login`,
            state: ''
        })
    }

    LogoutClick = async(e) => {
        if (e.key === 'logout') {
            logout();
            const history =  createHashHistory();
            history.go('/dashboard')
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
                <Menu.Item key="leaderboard" icon={<CrownTwoTone/>}>
                    <Link to='/leaderboard'> Leaderboards</Link>
                </Menu.Item>
                <Menu.Item key="profile" icon={<UserOutlined/>}>
                    <Link to='/profile'> My Profile</Link>
                </Menu.Item>
                <Menu.Item key="logout" onClick={this.LogoutClick} icon={<PoweroffOutlined/>}>
                    LogOut
                </Menu.Item>
            </Menu>);
    }

    render() {
        const {locale, selectLang} = this.context;
        return (
                <Header className="site-layout-background" >

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
                            {this.state.user?
                            <Dropdown.Button overlay={this.getUserMenu()} placement="bottomCenter"
                                             icon={<UserOutlined/>}>
                                 {`${this.state.username} `}
                            </Dropdown.Button>:<Button onClick={this.LogInClick}>Sign In/Up</Button>}
                        </span>
                    </div>
                </Header>
        );
    };

}

TopNav.contextType = Context;
export default withRouter(TopNav)
