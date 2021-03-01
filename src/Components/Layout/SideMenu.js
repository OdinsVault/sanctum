import {Layout, Menu} from 'antd';
// import Sider from 'antd/lib/layout/Sider';
import {Link} from 'react-router-dom';
import {
    HomeOutlined,
    UserOutlined,
    LaptopOutlined,
    NotificationOutlined,
    ShopOutlined,
    ShoppingCartOutlined,
    GiftOutlined
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
                // defaultSelectedKeys={['1']}
                // defaultOpenKeys={['sub1']}
                // style={{ height: '100%', borderRight: 0 }}
            >
                <Menu.Item key="sub0" icon={<HomeOutlined/>}>
                    <Link to="/dashboard">Dashboard</Link>
                </Menu.Item>
                <SubMenu key='sub1' icon={<GiftOutlined/>} title="Learn">
                    <Menu.Item key='2'>
                        <Link >My Courses</Link>
                    </Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" icon={<ShopOutlined/>} title="Practice">
                    <Menu.Item key="3">
                        <Link >View</Link>
                    </Menu.Item>
                </SubMenu>
                <SubMenu key="sub3" icon={<LaptopOutlined/>} title="Competitions">
                    <Menu.Item key="4">
                        <Link >New Competetions</Link>
                    </Menu.Item>
                    <Menu.Item key="5">
                        <Link >My Competetions</Link>
                    </Menu.Item>
                </SubMenu>
                <SubMenu key="sub4" icon={<ShoppingCartOutlined/>} title="Docs">
                    <Menu.Item key="6">
                        <Link >Getting Start with Simply</Link>
                    </Menu.Item>
                    <Menu.Item key="7">
                        <Link>Simply Documentation</Link>
                    </Menu.Item>
                    <Menu.Item key="8">
                        <Link>Developers Guide</Link>
                    </Menu.Item>
                </SubMenu>
                <SubMenu key='sub5' icon={<UserOutlined/>} title="Resources">
                    <Menu.Item key="9">
                        <Link >Download SDK</Link>
                    </Menu.Item>
                    <Menu.Item key="10">
                        <Link >Config File Generation</Link>
                    </Menu.Item>
                    <Menu.Item key="11">
                        <Link >Syntax Highlighter Configs Download</Link>
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




