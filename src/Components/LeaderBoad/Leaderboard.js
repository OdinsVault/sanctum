import React from 'react';
import {withRouter} from "react-router";

//SERVICES
import {getRankings, getUserAutocomplete, getFiltered, searchUser} from "../../Services/LeaderboardService";
import {CheckLogOnStatus} from "../../Services/UserLoginService";

//STYLES
import {
    Button, Card, Col, List, PageHeader,
    Row, Spin, Input, Avatar, notification, AutoComplete
} from "antd";
import {ReloadOutlined} from "@ant-design/icons";
class Leaderboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            total: 0, //total number of users per page,
            userList: [],
            rankList: '',
            filter: { institute: '', score: '' },
            userAutoCompleteOptions: [],
            throttleTime: null,
            userId: ''
        }
    }

    handleSearch = async (value) => {
        this.setState({loading: true});
        try {
            const selectedOp = this.state.userAutoCompleteOptions.find(op => op.value === value);
            if (selectedOp) {
                const filteredRankings = await searchUser(selectedOp.id);
                this.setState({rankList: {results: [filteredRankings]}, filter: {institute: '', score: ''}});
            }
        } catch (e) {
            notification.error({
                message: "Error!",
                description: e.message ? e.message : 'Cannot retrieve data at the moment'
            });
        }
        this.setState({loading: false});
    }
    getUserAutoCompletion = async (value) => {
        if (!value) return;
        if (this.state.throttleTime !== null) return;

        try {
            const {results} = await getUserAutocomplete(value);
            this.setState({
                userAutoCompleteOptions: results
                    .map(r => ({value: `${r.fname+" "+r.lname}`, label: `${r.fname+" "+r.lname}`, id: r._id}))
                });
        } catch (e) {
            console.error(e);
        }

        const timer = setTimeout(() => this.setState({throttleTime: null}), 800);
        this.setState({throttleTime: timer});
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

    getFilteredRanks = async () => {
        this.setState({loading: true});
        try {
            const filteredRankings = await getFiltered(this.state.filter);
            this.setState({rankList: filteredRankings});
        } catch (e) {
            notification.error({
                message: "Error!",
                description: e.message ? e.message : 'Cannot retrieve data at the moment'
            });
        }
        this.setState({loading: false});
    }

    refreshLeaderboard = async () => {
        this.setState((state) => ({filter: {...state.filter, score: '', institute: ''}}));
        this.getLeaderboardList(0,10);
    }

    async componentDidMount() {
        let loggedIn = CheckLogOnStatus();
        if (loggedIn) {
            await this.getLeaderboardList(0, 10);
            const usersession = JSON.parse(localStorage.getItem('usersession'));
            this.setState({ userId: usersession.Id });
        } else {
            this.props.history.push({
                pathname: `/dashboard`,
                state: ''
            });
        }
    }

    render() {
        return (
            <div>
                <Card>
                    <PageHeader className="site-page-header" title="Leaderboard"/>
                    <Row style={{marginBottom: '40px'}}>
                        <Col offset={22}>
                            <Button onClick={this.refreshLeaderboard}><ReloadOutlined/> Refresh</Button>
                        </Col>
                    </Row>
                    <Card title={"Search"}>
                        <Row>
                            <AutoComplete
                                style={{ width: 300 }}
                                placeholder="Search user"
                                allowClear
                                options={this.state.userAutoCompleteOptions}
                                onSelect={this.handleSearch}
                                onSearch={this.getUserAutoCompletion}
                                onClear={this.refreshLeaderboard}
                            />
                            <Col offset={2} span={14}>
                                <Input.Group compact>
                                    <Input
                                      allowClear
                                        style={{ width: '25%' }}
                                        value={this.state.filter.institute}
                                        onChange={(e) => this.setState((state) => ({ filter: { ...state.filter, institute: e.target.value } }))} placeholder={"By institute"} />
                                    <Input
                                      allowClear
                                        style={{ width: '25%' }}
                                        value={this.state.filter.score}
                                        onChange={(e) => this.setState((state) => ({ filter: { ...state.filter, score: e.target.value } }))} placeholder={"By score"} />
                                    <Button type='primary' onClick={this.getFilteredRanks}>Search</Button>
                                </Input.Group>
                            </Col>
                        </Row>
                    </Card>
                    <div className="site-card-wrapper">
                        <Spin spinning={this.state.loading}>
                            {/*<PageHeader className="site-page-header" />*/}
                            <Card title="Rankings">
                                <List
                                    itemLayout="horizontal"
                                    dataSource={this.state.rankList.results}
                                    pagination={{
                                        onChange: page => {
                                            this.getLeaderboardList(page - 1,10);
                                        },
                                        pageSize: 10,
                                        total: this.state.rankList.pageInfo?.total
                                    }}
                                    renderItem={item => (
                                        <List.Item style={{backgroundColor: item._id === this.state.userId? '#fdf5d4': 'white'}}>
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
                                                            <Col span={6}>Score: &nbsp;{item.score}</Col><Col
                                                            offset={2}>Institute: &nbsp;{item.institute}</Col>
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
