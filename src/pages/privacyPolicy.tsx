import { Accordion, AccordionTitleProps, Container, Header, Icon, List } from 'semantic-ui-react'
import React from 'react'

export default class PrivacyPolicyPage extends React.Component {
    state = { activeIndex: -1 }

    handleClick = (e: any, titleProps: AccordionTitleProps): void => {
        const { index } = titleProps
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index

        this.setState({ activeIndex: newIndex })
    }

    render (): JSX.Element {
        return (
            <Container fluid={true} style={{ paddingTop: '7em' }}>
                <Container text={true}>

                    <Header as='h1'>Privacy Policy</Header>
                    <p>
                        At CyberArena, we take your privacy seriously. This privacy policy explains how we collect, use,
                        and share information about you when you use our website and online game services (collectively,
                        the &quot;Services&quot;).
                    </p>

                    <Accordion styled={true} fluid={true}>
                        <Accordion.Title
                            active={this.state.activeIndex === 0}
                            index={0}
                            onClick={this.handleClick}
                        >
                            <Icon name='dropdown'/>
                            Information We Collect
                        </Accordion.Title>
                        <Accordion.Content active={this.state.activeIndex === 0}>
                            <p>
                                We collect information about you in the following ways:
                            </p>
                            <List bulleted={true}>
                                <List.Item>
                                    When you create an account, we may collect your name, email address, and other
                                    contact information.
                                </List.Item>
                                <List.Item>
                                    When you play the game, we may collect information about your gameplay, including
                                    your progress, achievements, and in-game purchases.
                                </List.Item>
                                <List.Item>
                                    When you communicate with us or other users through the Services, we may collect the
                                    content of those communications.
                                </List.Item>
                                <List.Item>
                                    We may also collect information about your device, including your IP address, device
                                    type, and browser type.
                                </List.Item>
                            </List>
                        </Accordion.Content>

                        <Accordion.Title
                            active={this.state.activeIndex === 1}
                            index={1}
                            onClick={this.handleClick}
                        >
                            <Icon name='dropdown'/>
                            Use of Information
                        </Accordion.Title>
                        <Accordion.Content active={this.state.activeIndex === 1}>
                            <p>
                                We use the information we collect for the following purposes:
                            </p>
                            <List bulleted={true}>
                                <List.Item>
                                    To provide, maintain, and improve the Services.
                                </List.Item>
                                <List.Item>
                                    To personalize your experience and provide recommendations for in-game content or
                                    purchases.
                                </List.Item>
                                <List.Item>
                                    To communicate with you about the Services, including to send you updates, news, or
                                    promotional materials.
                                </List.Item>
                                <List.Item>
                                    To enforce our terms of service and prevent fraud or other illegal activity.
                                </List.Item>
                            </List>
                        </Accordion.Content>

                        <Accordion.Title
                            active={this.state.activeIndex === 2}
                            index={2}
                            onClick={this.handleClick}
                        >
                            <Icon name='dropdown'/>
                            Sharing of Information
                        </Accordion.Title>
                        <Accordion.Content active={this.state.activeIndex === 2}>
                            <p>
                                We may share your information in the following circumstances:
                            </p>
                            <List bulleted={true}>
                                <List.Item>
                                    With our affiliates, partners, or service providers who need the information to
                                    perform a specific task on our behalf.
                                </List.Item>
                                <List.Item>
                                    If we are required to do so by law, or to protect the rights, property, or safety of
                                    ourselves or others.
                                </List.Item>
                                <List.Item>
                                    In the event of a merger, acquisition, or sale of all or part of our company, we may
                                    share your information with the relevant parties.
                                </List.Item>
                            </List>
                        </Accordion.Content>

                        <Accordion.Title
                            active={this.state.activeIndex === 3}
                            index={3}
                            onClick={this.handleClick}
                        >
                            <Icon name='dropdown'/>
                            Security
                        </Accordion.Title>
                        <Accordion.Content active={this.state.activeIndex === 3}>
                            <p>
                                We take reasonable measures to protect your information from unauthorized access or
                                disclosure. However, no security measures are perfect, and we cannot guarantee the
                                security of your information.
                            </p>
                        </Accordion.Content>

                        <Accordion.Title
                            active={this.state.activeIndex === 4}
                            index={4}
                            onClick={this.handleClick}
                        >
                            <Icon name='dropdown'/>
                            Changes to This Policy
                        </Accordion.Title>
                        <Accordion.Content active={this.state.activeIndex === 4}>
                            <p>
                                We may update this privacy policy from time to time. We will post any changes on this
                                page, and we encourage you to review the policy regularly. By continuing to use the
                                Services after any changes have been made, you agree to the revised policy.
                            </p>
                        </Accordion.Content>

                        <Accordion.Title
                            active={this.state.activeIndex === 5}
                            index={5}
                            onClick={this.handleClick}
                        >
                            <Icon name='dropdown'/>
                            Contact Us
                        </Accordion.Title>
                        <Accordion.Content active={this.state.activeIndex === 5}>
                            <p>
                                If you have any questions or concerns about this privacy policy, please contact us at
                                [contact information].
                            </p>
                        </Accordion.Content>

                        <Accordion.Title
                            active={this.state.activeIndex === 6}
                            index={6}
                            onClick={this.handleClick}
                        >
                            <Icon name='dropdown'/>
                            Additional Information
                        </Accordion.Title>
                        <Accordion.Content active={this.state.activeIndex === 6}>
                            <p>
                                This privacy policy provides a general outline of how we collect and use information
                                about users of the Services. It is not intended to be exhaustive, and we encourage you
                                to read it carefully and contact us if you have any questions.
                            </p>
                        </Accordion.Content>
                    </Accordion>
                </Container>

            </Container>
        )
    }
}
