import React from 'react';
import {withRouter} from 'react-router';

//STYLES
import {PageHeader, Card, Anchor, Col, Row, Space} from 'antd';

const {Link} = Anchor;


class GettingStart extends React.Component {

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

                    <PageHeader className="site-page-header" title="Getting start with Simply"/>
                    <Row>
                        <Col span={20}>
                            <div id="getting_start">
                                <p>This page is an overview of the Simply documentation and related resources.
                                    Simply is a JavaScript library for building user interfaces. Learn what Simply is
                                    all
                                    about on our homepage or in the tutorial.</p>
                            </div>
                            <br/> <br/>
                            <div id="Try_Simply">
                                <h3> Try Simply</h3>
                                Simply has been designed from the start for gradual adoption, and you can use as little
                                or as much Simply as you need. Whether you want to get a taste of Simply, add some
                                interactivity to a simple HTML page, or start a complex Simply-powered app, the links in
                                this section will help you get started.
                            </div>
                            <br/>
                            <div id='Online_Playgrounds'>
                                <h3> Online Playgrounds</h3>
                                If you’re interested in playing around with Simply, you can use an online code
                                playground. Try a Hello World template on CodePen, CodeSandbox, or Stackblitz.


                                If you prefer to use your own text editor, you can also download this HTML file, edit
                                it, and open it from the local filesystem in your browser. It does a slow runtime code
                                transformation, so we’d only recommend using this for simple demos.
                            </div>
                            <br/>
                            <div id="Add_Simply_Website">
                                <h3> Add Simply to a Website</h3>
                                You can add Simply to an HTML page in one minute. You can then either gradually expand
                                its presence, or keep it contained to a few dynamic widgets.
                            </div>
                            <br/>
                            <div id="New_Simply_App">
                                <h3> Create a New Simply App</h3>
                                When starting a Simply project, a simple HTML page with script tags might still be the
                                best option. It only takes a minute to set up!

                                As your application grows, you might want to consider a more integrated setup. There are
                                several JavaScript toolchains we recommend for larger applications. Each of them can
                                work with little to no configuration and lets you take full advantage of the rich Simply
                                ecosystem. Learn how.

                            </div>
                            <br/>
                            <div id="Learn_Simply">
                                <h3> Learn Simply </h3>
                                People come to Simply from different backgrounds and with different learning styles.
                                Whether you prefer a more theoretical or a practical approach, we hope you’ll find this
                                section helpful.

                                If you prefer to learn by doing, start with our practical tutorial.
                                If you prefer to learn concepts step by step, start with our guide to main concepts.
                                Like any unfamiliar technology, Simply does have a learning curve. With practice and
                                some
                                patience, you will get the hang of it.
                            </div>
                            <br/>
                            <div id="First_Examples">
                                <h3> First Examples</h3>
                                The Simply homepage contains a few small Simply examples with a live editor. Even if you
                                don’t know anything about Simply yet, try changing their code and see how it affects the
                                result.
                            </div>
                            <br/>
                            <div id="Simply_for_Beginners">

                                <h3>Simply for Beginners</h3>
                                If you feel that the Simply documentation goes at a faster pace than you’re comfortable
                                with, check out this overview of Simply by Tania Rascia. It introduces the most
                                important
                                Simply concepts in a detailed, beginner-friendly way. Once you’re done, give the
                                documentation another try!
                            </div>
                            <br/>
                            <div id="Simply_for_Designers">
                                <h3>Simply for Designers</h3>
                                If you’re coming from a design background, these resources are a great place to get
                                started.
                            </div>
                            <br/>
                            <div id="JavaScript_Resources">
                                <h3>JavaScript Resources</h3>
                                The Simply documentation assumes some familiarity with programming in the JavaScript
                                language. You don’t have to be an expert, but it’s harder to learn both Simply and
                                JavaScript at the same time.
                            </div>
                            <br/>
                            <p> We recommend going through this JavaScript overview to check your knowledge level.
                                It will take you between 30 minutes and an hour but you will feel more confident
                                learning Simply.</p>
                        </Col>
                        <Col span={3} offset={1}>
                            <Anchor>
                                <Link href="#getting_start" title="Getting Start"/>
                                <Link href="#Try_Simply" title="Try Simply"/>
                                <Link href="#Online_Playgrounds" title="Online Playgrounds"/>
                                <Link href="#Simply_for_Beginners" title="Simply for Beginners"/>
                                <Link href="#Simply_for_Designers" title="Simply for Designers"/>
                                <Link href="#JavaScript_Resources" title="JavaScript Resources"/>
                            </Anchor>
                        </Col>
                    </Row>

                </Card>
            </div>
        )
    }
}

export default withRouter(GettingStart);


