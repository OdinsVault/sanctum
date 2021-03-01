import React from 'react';
import { Layout, Breadcrumb, Card} from 'antd';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import TopNav from '../Layout/TopNav';
import SideMenu from '../Layout/SideMenu';
import { HomeOutlined } from '@ant-design/icons';

import './Layout.css';

const { Content,Footer,Sider } = Layout;


class SiteLayout extends React.Component{

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

	render(){

		const { location } = this.props;
		const pathSnippets = location.pathname.split('/').filter(i => i);
		const extraBreadcrumbItems = pathSnippets.map((_, index) => {
		  const url = `${pathSnippets.slice(0, index + 1).join('/')}`;
		  return (
			<Breadcrumb.Item key={url}>
			  <Link to={url}>{url}</Link>
			</Breadcrumb.Item>
		  );
		});
		const breadcrumbItems = [
		  <Breadcrumb.Item key="home">
			<Link to="/"><HomeOutlined /></Link>
		  </Breadcrumb.Item>,
		].concat(extraBreadcrumbItems);

		return(
		<Layout>
			<Sider trigger={null} collapsible collapsed={this.state.collapsed}>
            <div className="logo" >
              <h4 style={{ color: 'white', fontWeight: 'bold' }}>
                Welcome...
              </h4>
            </div>
            <SideMenu />
          </Sider>
		  <Layout  className="site-layout" >
		  <TopNav collapsed={this.state.collapsed} onCollapse={this.toggle} />
			<Content style={{ margin: '0 16px' }}
			>
				<Breadcrumb style={{ margin: '16px 0' }}>
                {breadcrumbItems}
              </Breadcrumb>
			  <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
				{this.props.children}
				</div>
			</Content> 
			<Footer  style={{ textAlign: 'center' }}>Simply 2021</Footer>
		</Layout>
	  </Layout>
		)
	}
}

export default withRouter(SiteLayout)