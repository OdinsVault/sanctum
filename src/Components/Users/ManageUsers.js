import { Button, Card, Col, PageHeader, Space, Table } from 'antd';
import { MinusCircleOutlined } from '@ant-design/icons';
import React from 'react';
import { withRouter } from 'react-router';

const columns = [
	{
	  title: 'Name',
	  dataIndex: 'name',
	  render: (text) => <a>{text}</a>,
	},
	{
	  title: 'Username',
	  dataIndex: 'username',
	},
	{
	  title: 'Email',
	  dataIndex: 'email',
	},
	{
		title: 'Role',
		dataIndex: 'role',
	  },
	  {
		title: 'Remove',
		render: (text, record) => (
			<Space size="middle">
			  <Button type="primary" icon={<MinusCircleOutlined />} danger/>
			</Space>
		  ),
	  },
	//   {
	// 	title: 'Age',
	// 	dataIndex: 'age',
	//   },
  ];

class ManageUser extends React.Component{

	constructor(props) {
		super(props);
		this.state = {
			selectedRowKeys: [], // Check here to configure the default column
			loading: false,
		  };
	  }
	  onSelectChange = selectedRowKeys => {
		console.log('selectedRowKeys changed: ', selectedRowKeys);
		this.setState({ selectedRowKeys });
	  };

	  render() {
		const { loading, selectedRowKeys } = this.state;
		const rowSelection = {
		  selectedRowKeys,
		  onChange: this.onSelectChange,
		};
		  return (
			  <div>
				  <Card>
				  <PageHeader
    className="site-page-header"
    title="Manage Users"
    // subTitle="This is a subtitle"
  />
				  <Table pagination={{defaultPageSize:5}}
        rowSelection={rowSelection} columns={columns} dataSource={data}
      /> 
	  <div>
	  <Col offset={20}>
	  <Button type="primary" danger disabled={true}>Remove Selected</Button></Col></div>
	  </Card>
			  </div>
		  )
	  }
}
export default withRouter(ManageUser)


  const data = [
	{
	  key: '1',
	  name: 'John Brown',
	  username: 'Brown.J1',
	  email: 'brownJ1@sigen.com',
	  role:'admin'
	},
	{
		key: '2',
		name: 'John Brown',
		username: 'Brown.J2',
		email: 'brownJ2@sigen.com',
		role:'admin'
	  },
	  {
		key: '3',
		name: 'John Brown',
		username: 'Brown.J3',
		email: 'brownJ3@sigen.com',
		role:'admin'
	  },
	  {
		key: '4',
		name: 'John Brown',
		username: 'Brown.J4',
		email: 'brownJ4@sigen.com',
		role:'admin'
	  },
	  {
		key: '5',
		name: 'John Brown',
		username: 'Brown.J5',
		email: 'brownJ5@sigen.com',
		role:'admin'
	  },
	  {
		  key: '6',
		  name: 'John Brown',
		  username: 'Brown.J6',
		  email: 'brownJ6@sigen.com',
		  role:'admin'
		},
		{
		  key: '7',
		  name: 'John Brown',
		  username: 'Brown.J7',
		  email: 'brownJ7@sigen.com',
		  role:'admin'
		},
		{
		  key: '8',
		  name: 'John Brown',
		  username: 'Brown.J8',
		  email: 'brownJ8@sigen.com',
		  role:'admin'
		},
  ];