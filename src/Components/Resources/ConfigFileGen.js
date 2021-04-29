import React from 'react';
import { PageHeader, Card} from 'antd';
import {withRouter} from 'react-router';

class configFileGeneration extends React.Component {

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
                    <PageHeader className="site-page-header" title="Generate Config File"/>
                    <div className="site-card-wrapper">
                        configure file generation component here
                    </div>
                </Card>
            </div>
        )
    }
}

export default withRouter(configFileGeneration);


