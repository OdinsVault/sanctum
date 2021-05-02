import React from 'react';
import {Link} from 'react-router-dom';
import {withRouter} from "react-router";
import {Context} from "../../ConfigProvider";

//STYLES
import {Menu, Modal} from 'antd';
import {
    HomeOutlined, FolderOpenOutlined, HighlightOutlined, ShoppingOutlined,
    ExperimentOutlined, CodeOutlined, TrophyOutlined, SettingOutlined
} from '@ant-design/icons';

const {SubMenu} = Menu;

class SideMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            user: '',
            role: '',
            selectedKey: '',
            visibleConfirmation: false
        };

    }

    onCollapse = collapsed => {
        this.setState({collapsed});
    };

    goToLogin = () => {
        this.props.history.push({
            pathname: '/login',
            state: ''
        })
    }

    handleCancel = () => {
        this.setState({
            visibleConfirmation: false
        })
    }


    onMenuClick = (item) => {
        if (item.key == 2 || item.key == 3 || item.key == 4 || item.key == 5) {
            if (!this.state.user) {
                this.setState({
                    visibleConfirmation: true
                })
            } else {
                var path = item.item.props.link;
                this.props.history.push({
                    pathname: `${path}`,
                    state: '',
                })
            }
        }
    }


    componentDidMount() {

        var usersession = localStorage.getItem('usersession');
        if (usersession) {
            var userSessionObj = JSON.parse(usersession);
            var user = userSessionObj.User
            this.setState({
                role: userSessionObj.Role[0],
                user: user
            });
        }
    }

    render() {
        const {setMenuKey, sideMenuKey} = this.context;
        return (
            <div>
                <Menu
                    mode="inline"
                    theme="dark"
                    onClick={this.onMenuClick}
                    onSelect={(e) => setMenuKey(e.key)}
                    selectedKeys={[sideMenuKey]}
                >
                    <Menu.Item key="1" icon={<HomeOutlined/>}>
                        <Link to="/dashboard">Dashboard</Link>
                    </Menu.Item>
                    {this.state.role === 'admin' ? (
                        <SubMenu key='sub6' icon={<SettingOutlined/>} title="Settings">
                            <SubMenu key="sub7" title="Courses">
                                <Menu.Item key="12"><Link to={"/admin/addNewCourse"}>Add New</Link></Menu.Item>
                                <Menu.Item key="13"><Link to={'/admin/editCourse' }>Edit/Delete</Link></Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub8" title="Practice">
                                <Menu.Item key="14"><Link to={'/admin/addNewPractical'}>Add New</Link></Menu.Item>
                                <Menu.Item key="15"><Link to={'/admin/editPractical'}>Edit/Delete</Link></Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub9" title="Compete">
                                <Menu.Item key="16"><Link to={'/admin/addNewCompete'}>Add New</Link></Menu.Item>
                                <Menu.Item key="17"><Link to={'/admin/editCompete'}>Edit/Delete</Link></Menu.Item>
                            </SubMenu>
                        </SubMenu>) : ''}
                    <Menu.Item link={"/courses/overview"} key='2' icon={< HighlightOutlined/>}
                               disabled={this.state.role === 'admin'}>
                        <Link>Learn</Link>
                    </Menu.Item>
                    <Menu.Item link={"/practice/overview"} key="3" icon={<ExperimentOutlined/>}
                               disabled={this.state.role === 'admin'}>
                        <Link>Practice</Link>
                    </Menu.Item>
                    <Menu.Item link={"/compete/overview"} icon={<TrophyOutlined/>} key="4"
                               disabled={this.state.role === 'admin'}>
                        <Link>Compete</Link>
                    </Menu.Item>
                    <Menu.Item link={"/codeVisualizer"} icon={<CodeOutlined/>} key="5"
                               disabled={this.state.role === 'admin'}>
                        <Link>Code Visializer</Link>
                    </Menu.Item>
                    <SubMenu key="sub4" icon={< FolderOpenOutlined/>} title="Docs"
                             disabled={this.state.role === 'admin'}>
                        <Menu.Item key="6">
                            <Link to="/learn/gettingStart">Getting Start with Simply</Link>
                        </Menu.Item>
                        <Menu.Item key="7">
                            <Link to="/learn/documentation">Simply Documentation</Link>
                        </Menu.Item>
                        <Menu.Item key="8">
                            <Link to="/learn/developerGuide">Developers Guide</Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu key='sub5' icon={< ShoppingOutlined/>} title="Resources"
                             disabled={this.state.role === 'admin'}>
                        <Menu.Item key="9">
                            <Link to="/sdkDownloads">Download SDK</Link>
                        </Menu.Item>
                        <Menu.Item key="10">
                            <Link to="/configFileGen">Config File Generation</Link>
                        </Menu.Item>
                        <Menu.Item key="11">
                            <Link to="/syntaxHighlighter">Syntax Highlighter Configs Download</Link>
                        </Menu.Item>
                    </SubMenu>
                </Menu>

                {/*///////////////////////////confirmation Modal///////////////////////////////*/}
                <Modal
                    title={"Please log in or sign up to continue"}
                    visible={this.state.visibleConfirmation}
                    okText={"Continue"}
                    width={400}
                    onOk={this.goToLogin}
                    onCancel={this.handleCancel}
                >
                    <p>Continue to login?</p>
                </Modal>

            </div>
        )
    }

}

SideMenu.contextType = Context;
export default withRouter(SideMenu)




