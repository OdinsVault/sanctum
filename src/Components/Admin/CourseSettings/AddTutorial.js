import React from "react";
import {Form, Input, InputNumber, Button, Card, PageHeader, DatePicker, Select, Divider} from 'antd';
import {withRouter} from "react-router";
import ReactHtmlParser from "react-html-parser";

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

class AddNewTutorial extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            description:''
        }
    }

    setDescription = (e) =>{
        let type = e.target.value?e.target.value:''
        this.setState({
            description:type
        })
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
                        title="Add New Course"
                    />

                    <Form {...layout} name="nest-messages" onFinish={this.onFinish} validateMessages={validateMessages}>
                        <Form.Item
                            name={'title'}
                            label="Course Title"
                            rules={[
                                {
                                    required: true,
                                    message:"Title is required!"
                                },
                            ]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            name={"level"}
                            label="Course Level"
                            rules={[
                                {
                                    required:true,
                                    message:"Level is required!"
                                },
                                {
                                    type: 'number',
                                    min: 1
                                },
                            ]}
                        >
                            <InputNumber/>
                        </Form.Item>
                        <Form.Item name={'description'} label="Course Description"
                                   rules={[
                                       {
                                           required: true,
                                           message:"Description is required!"
                                       }]}>
                            <Input.TextArea onChange={this.setDescription} value={this.state.description}/>
                        </Form.Item>
                        <Form.Item wrapperCol={{...layout.wrapperCol, offset: 18}}>
                            <Button type="primary" htmlType="submit">
                                Add Course
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
                <Divider/>
                <Card title={"Description output:"}>
                    <span>
                    {
                        // this.state.description
                        ReactHtmlParser(this.state.description)
                    }
                    </span>
                </Card>
            </div>
        )
    }
}

export default withRouter(AddNewTutorial)