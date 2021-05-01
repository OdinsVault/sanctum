import React from "react";
import {Form, Input, InputNumber, Button, Card, PageHeader, DatePicker, Select} from 'antd';
import {withRouter} from "react-router";

const {Option} = Select;

const layout = {
    labelCol: {
        span: 4,
    },
    wrapperCol: {
        span: 16,
    },
};
const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};

class AddUser extends React.Component {

    constructor(props) {
        super(props);
    }

    onFinish = (e) => {
        console.log(e)
    }

    render() {
        return (
            <div>
                <Card>
                    <PageHeader
                        className="site-page-header"
                        title="Add New User"
                        // subTitle="This is a subtitle"
                    />

                    <Form {...layout} name="nest-messages" onFinish={this.onFinish} validateMessages={validateMessages}>
                        <Form.Item
                            name={['user', 'name']}
                            label="Name"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            name={['user', 'email']}
                            label="Email"
                            rules={[
                                {
                                    type: 'email',
                                    required: true
                                },
                            ]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            name={['user', 'DOA']}
                            label="Date of Assignment"
                            rules={[
                                {
                                    type: 'date',
                                    required: true
                                }
                            ]}>
                            <DatePicker/>
                        </Form.Item>
                        <Form.Item name={['user', 'position']} label="Position"
                                   rules={[
                                       {required: true}
                                   ]}>
                            <Select allowClear>
                                <Select.Option value="admin">Admin</Select.Option>
                                <Select.Option value="sales">Sales Rep</Select.Option>
                                <Select.Option value="emp">Emp</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name={['user', 'age']}
                            label="Age"
                            rules={[
                                {
                                    type: 'number',
                                    min: 16,
                                    max: 99,
                                },
                            ]}
                        >
                            <InputNumber/>
                        </Form.Item>
                        {/* <Form.Item name={['user', 'position']} label="Position">
        <Input />
      </Form.Item> */}
                        <Form.Item
                            name="gender"
                            label="Gender"
                            rules={[
                                {
                                    required: false,
                                },
                            ]}
                        >
                            <Select
                                placeholder="Select gender"
                                allowClear
                            >
                                <Option value="male">male</Option>
                                <Option value="female">female</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item name={['user', 'Other']} label="Other info">
                            <Input.TextArea/>
                        </Form.Item>
                        <Form.Item wrapperCol={{...layout.wrapperCol, offset: 18}}>
                            <Button type="primary" htmlType="submit">
                                Add User
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        )
    }
}

export default withRouter(AddUser)