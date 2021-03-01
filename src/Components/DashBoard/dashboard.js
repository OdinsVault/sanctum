import React from 'react';
import {Button, Col, PageHeader, Select, Form, Card, Space, Row, Divider, List, Carousel, Image} from 'antd';
import {MinusCircleOutlined,BulbOutlined } from '@ant-design/icons';
import {withRouter} from 'react-router';


const contentStyle = {
    height: '260px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};

class DashBoard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            courses: "",
            practicalList: "",
            competitionList: '',
            todaysTip:''
        };
    }


    componentDidMount() {
    }

    render() {
        return (
            <div>
                <Card>
                    <PageHeader className="site-page-header" title="Dashboard"/>
                    <Carousel autoplay effect="fade">
                        <div>
                            <h3 style={contentStyle}><img style={{height: '260px', width: '100%'}}
                                                          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"/>
                            </h3>
                        </div>
                        <div>
                            <h3 style={contentStyle}>2</h3>
                        </div>
                        <div>
                            <h3 style={contentStyle}>3</h3>
                        </div>
                        <div>
                            <h3 style={contentStyle}>4</h3>
                        </div>
                    </Carousel>
                    <Divider> <b><BulbOutlined /> Today's Tip</b></Divider>
                    <div><span style={{fontSize:'18px',fontWeight:'12px'}}>"Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat.
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                        pariatur.
                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim
                        id est laborum."</span>
                    </div>
                    <Divider orientation="left"> <b>Get Your Skills Certified</b></Divider>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Card title={<b><span>Learn</span></b>} extra={<a href="#">More</a>}>
                                <List itemLayout="horizontal"
                                      dataSource={this.state.courses}
                                      renderItem={item => (
                                          <List.Item>
                                              <List.Item.Meta
                                                  title={item.productName}
                                              />
                                          </List.Item>
                                      )}
                                />
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card title={<b><span>Practice</span></b>} extra={<a href="#">More</a>}>
                                <List itemLayout="horizontal"
                                      dataSource={this.state.practicalList}
                                      renderItem={item => (
                                          <List.Item>
                                              <List.Item.Meta
                                                  title={item.pacticalName}
                                              />
                                          </List.Item>
                                      )}
                                />
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card title={<b><span>Compete</span></b>} extra={<a href="#">More</a>}>
                                <List itemLayout="horizontal"
                                      dataSource={this.state.competitionList}
                                      renderItem={item => (
                                          <List.Item>
                                              <List.Item.Meta
                                                  title={item.competitionName}
                                              />
                                          </List.Item>
                                      )}
                                />
                            </Card>
                        </Col>
                    </Row>
                </Card>
            </div>
        )
    }
}

export default withRouter(DashBoard);


