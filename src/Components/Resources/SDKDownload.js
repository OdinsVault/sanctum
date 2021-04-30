import React from 'react';
import {withRouter} from 'react-router';

//STYLES
import { PageHeader, Card} from 'antd';

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


