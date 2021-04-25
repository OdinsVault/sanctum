import React from 'react';
import {withRouter} from "react-router";
import {
    Badge,
    Button,
    Card,
    Col,
    List,
    PageHeader,
    Row,
    Spin,
    Input,
    AutoComplete,
    Pagination,
    Avatar,
    notification
} from "antd";
import {ReloadOutlined, RightCircleFilled, RightCircleTwoTone} from "@ant-design/icons";
import {getRankings} from "../../Services/LeaderboardService";

const {Search} = Input;

class Leaderboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            total: 0, //total number of users per page,
            userList: [1, 2, 3, 4, 5, 6, 7, 8],
            rankList: ''
        }
    }

    handleSearch = () => {

    }

    getLeaderboardList = async (page, limit) => {
        this.setState({
            loading: true
        })
        try {
            var rankings = await getRankings(page, limit);
            this.setState({
                rankList: rankings
            })
        } catch (e) {
            notification.error({
                message: "Error!",
                description: e.message ? e.message : 'Cannot retrieve data at the moment'
            })
        }
        this.setState({
            loading: false
        })
    }

    async componentDidMount() {
        await this.getLeaderboardList(0, 10);
    }

    render() {
        return (
            <div>
                <Card>
                    <PageHeader className="site-page-header" title="Leaderboard"/>
                    <Row style={{marginBottom: '40px'}}>
                        <Col offset={22}>
                            <Button onClick={this.getQuestionList}><ReloadOutlined/> Refresh</Button>
                        </Col>
                    </Row>
                    <Card title={"Search"}>
                        <Row>
                            {/*<AutoComplete*/}
                            {/*    options={options}*/}
                            {/*    onSelect={(e) => console.log(e)}*/}
                            {/*    onSearch={this.handleSearch}*/}
                            {/*>*/}
                            <Col span={6}>
                                <Search placeholder="Search by user" allowClear style={{width: 300}} enterButton/>
                            </Col>
                            <Col offset={2} span={16}>
                                <Input.Group compact>
                                    <Input style={{ width: '25%' }} placeholder={"By institue"}  />
                                    <Input style={{ width: '25%' }} placeholder={"By score"}  />
                                    <Button type='primary'>Search</Button>
                                </Input.Group>
                            </Col>

                            {/*/*</AutoComplete>*!/*/}

                        </Row>
                    </Card>
                    <div className="site-card-wrapper">
                        <Spin spinning={this.state.loading}>
                            {/*<PageHeader className="site-page-header" />*/}
                            <Card title="Rankings">
                                <List
                                    itemLayout="horizontal"
                                    dataSource={this.state.rankList.results}
                                    renderItem={item => (
                                        <List.Item>
                                            <List.Item.Meta
                                                avatar={item.rank <= 3 ?
                                                    <Avatar
                                                        src={process.env.PUBLIC_URL + `/Images/${item.rank}.jpg`}/> : item.rank}
                                                title={<div>
                                                    <Row>
                                                        <Col>{item.fname}</Col>&nbsp;<Col>{item.lname}</Col>
                                                    </Row>
                                                </div>}
                                                description={
                                                    <div>
                                                        <Row>
                                                            <Col span={6}>Score: &nbsp;{item.score}</Col><Col offset={2}>Institute: &nbsp;{item.institute}</Col>
                                                        </Row>
                                                    </div>
                                                }
                                            />
                                        </List.Item>
                                    )}
                                />
                            </Card>
                        </Spin>
                    </div>
                </Card>
            </div>
        )
    }
}

export default withRouter(Leaderboard);

const options = [
    "apple", "bottle", "nose"
]
