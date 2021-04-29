import {Layout, Menu, Modal} from 'antd';
// import Sider from 'antd/lib/layout/Sider';
import {Link} from 'react-router-dom';
import {HomeOutlined, LaptopOutlined, FolderOpenOutlined, HighlightOutlined, NotificationOutlined, ShoppingOutlined,
    ExperimentOutlined, GiftOutlined, CodeOutlined, TrophyOutlined, ExclamationCircleOutlined} from '@ant-design/icons';
import React from 'react';
import {user} from "../../constant";
import {withRouter} from "react-router";

const {SubMenu} = Menu;
const {Sider} = Layout;
const {confirm} = Modal;

class SideMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            user: '',
            visibleConfirmation:false
        };

    }

    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({collapsed});
    };

    goToLogin = () => {
        this.props.history.push({
            pathname: '/login',
            state: ''
        })
    }

    handleCancel = () =>{
        this.setState({
            visibleConfirmation:false
        })
    }


    onMenuClick = (item) => {
        if (item.key == 2 || item.key == 3 || item.key == 4 || item.key == 5) {
            if (!this.state.user) {
                this.setState({
                    visibleConfirmation:true
                })
            } else {
                var path = item.item.props.link;
                this.props.history.push({
                    pathname: `${path}`,
                    state: ''
                })
            }
        }
    }

    componentDidMount() {
        var getUser = JSON.parse(localStorage.getItem('usersession'));
        if (getUser) {
            this.setState({
                user: getUser
            })
        }
    }

    render() {
        const {collapsed} = this.state;
        return (
            <div>
                <Menu
                    mode="inline"
                    theme="dark"
                    onClick={this.onMenuClick}
                    // style={{backgroundColor:'orange'}}
                    // defaultSelectedKeys={['1']}
                    // defaultOpenKeys={['sub1']}
                    // style={{ height: '100%', borderRight: 0 }}
                >
                    <Menu.Item key="1" icon={<HomeOutlined/>}>
                        <Link to="/dashboard">Dashboard</Link>
                    </Menu.Item>
                    <Menu.Item link={"/courses/overview"} key='2' icon={< HighlightOutlined/>}>
                        <Link >Learn</Link>
                    </Menu.Item>
                    <Menu.Item link={"/practice/overview"} key="3" icon={<ExperimentOutlined/>}>
                        <Link >Practice</Link>
                    </Menu.Item>
                    <Menu.Item link={"/compete/overview"} icon={<TrophyOutlined/>} key="4">
                        <Link >Compete</Link>
                    </Menu.Item>
                    <Menu.Item link={"/codeVisualizer"} icon={<CodeOutlined/>} key="5">
                        <Link >Code Visializer</Link>
                    </Menu.Item>
                    <SubMenu key="sub4" icon={< FolderOpenOutlined/>} title="Docs">
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
                    <SubMenu key='sub5' icon={< ShoppingOutlined/>} title="Resources">
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

export default withRouter(SideMenu)




