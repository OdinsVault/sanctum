import React from 'react';
import {withRouter} from 'react-router';

//COMPONENTS
import TopNav from '../Layout/TopNav';
import SideMenu from '../Layout/SideMenu';

//STYLES
import {Layout} from 'antd';
import {CopyrightOutlined} from '@ant-design/icons';
import './Layout.css';

const {Content, Footer, Sider} = Layout;


class SiteLayout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            collapsed: false
        };
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    render() {

        return (
            <Layout className="outer-layout-wrapper">
                <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                    <div className="logo">
                        <h4 style={{color: 'white', fontWeight: 'bold'}}>
                            Welcome
                        </h4>
                    </div>
                    <SideMenu/>
                </Sider>
                <Layout className="site-layout">
                    <TopNav collapsed={this.state.collapsed} onCollapse={this.toggle}/>
                    <Content style={{margin: '0 16px'}}>
                        <div className="site-layout-background" style={{padding: 24, minHeight: 360}}>
                            {this.props.children}
                        </div>
                    </Content>
                    <Footer style={{textAlign: 'center'}}> <CopyrightOutlined/> 2020 Team Insomaniac</Footer>
                </Layout>
            </Layout>
        )
    }
}

export default withRouter(SiteLayout)