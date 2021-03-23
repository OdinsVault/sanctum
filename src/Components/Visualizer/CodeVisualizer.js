import React from 'react';
import {PageHeader, Card} from 'antd';
import {withRouter} from 'react-router';

class Visualizer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {

    }

    render() {
        return (
            <div>
                <Card>
                    <PageHeader className="site-page-header" title="Code Visualizer"/>
                    This page will include the code visualizer
                    {/*{include visualizer properties here}*/}
                </Card>
            </div>
        )
    }
}

export default withRouter(Visualizer);


