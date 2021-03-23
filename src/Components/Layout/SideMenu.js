import {Layout, Menu} from 'antd';
// import Sider from 'antd/lib/layout/Sider';
import {Link} from 'react-router-dom';
import {
    HomeOutlined,
    LaptopOutlined,
    FolderOpenOutlined,
    HighlightOutlined,
    NotificationOutlined,
    ShoppingOutlined,
    ExperimentOutlined,
    GiftOutlined,
    CodeOutlined,
    TrophyOutlined
} from '@ant-design/icons';
import React from 'react';

const {SubMenu} = Menu;
const {Sider} = Layout;

class SideMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
        };

    }

    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({collapsed});
    };

    render() {
        const {collapsed} = this.state;
        return (
            <Menu
                mode="inline"
                theme="dark"
                // style={{backgroundColor:'orange'}}
                // defaultSelectedKeys={['1']}
                // defaultOpenKeys={['sub1']}
                // style={{ height: '100%', borderRight: 0 }}
            >
                <Menu.Item key="1" icon={<HomeOutlined/>}>
                    <Link to="/dashboard">Dashboard</Link>
                </Menu.Item>
                <Menu.Item key='2' icon={< HighlightOutlined/>}>
                    <Link to="/courses/overview">Learn</Link>
                </Menu.Item>
                <Menu.Item key="3" icon={<ExperimentOutlined/>}>
                    <Link to="/practice/overview">Practice</Link>
                </Menu.Item>
                <Menu.Item icon={<TrophyOutlined />} key="4">
                    <Link>Compete</Link>
                </Menu.Item>
                <Menu.Item icon={<CodeOutlined />} key="5">
                    <Link to="/codeVisualizer">Code VIsializer</Link>
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
                        <Link>Download SDK</Link>
                    </Menu.Item>
                    <Menu.Item key="10">
                        <Link>Config File Generation</Link>
                    </Menu.Item>
                    <Menu.Item key="11">
                        <Link>Syntax Highlighter Configs Download</Link>
                    </Menu.Item>
                </SubMenu>
            </Menu>
        )
    }

}

export default SideMenu


// <PrivateRoute path='/categories' component={Categories}/>
// <PrivateRoute path='/addUser' component={AddUser}/>
// <PrivateRoute path= '/manageUser' component={ManageUser}/>
// <PrivateRoute path= '/stocks' component={ManageStocks}/>




