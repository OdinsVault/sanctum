import React from 'react';
import { PageHeader, Card} from 'antd';
import {withRouter} from 'react-router';

class SDKDownload extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
           sdk:''
        };
    }


    async componentDidMount() {

    }

    render() {
        return (
            <div>
                <Card>
                    <PageHeader className="site-page-header" title="SDK Downloads"/>
                    <div className="site-card-wrapper">
                        sdk downloads here
                    </div>
                </Card>
            </div>
        )
    }
}

export default withRouter(SDKDownload);


