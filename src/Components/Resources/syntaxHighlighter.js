import React from 'react';
import { PageHeader, Card} from 'antd';
import {withRouter} from 'react-router';

class syntaxHighlighter extends React.Component {

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
                    <PageHeader className="site-page-header" title="Syntax Highlighter"/>
                    <div className="site-card-wrapper">
                        syntax highlighter component here
                    </div>
                </Card>
            </div>
        )
    }
}

export default withRouter(syntaxHighlighter);


