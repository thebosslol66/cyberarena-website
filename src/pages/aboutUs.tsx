import { Accordion, AccordionTitleProps, Container, Header, Icon, List } from 'semantic-ui-react'
import React from 'react'

export default class AboutUsPage extends React.Component {
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

                    <Header as='h1'>About Us</Header>

                    <Accordion styled={true} fluid={true}>
                        <Accordion.Title
                            active={this.state.activeIndex === 0}
                            index={0}
                            onClick={this.handleClick}
                        >
                            <Icon name='dropdown'/>
                            Who are we ?
                        </Accordion.Title>
                        <Accordion.Content active={this.state.activeIndex === 0}>
                            <p>
                                We are a team of three students who are passionate about
                                creating innovative and exciting online games.
                                Our latest project is a digital card game that draws inspiration from popular games such as Hearthstone.
                            </p>
                        </Accordion.Content>
                        <Accordion.Title
                            active={this.state.activeIndex === 1}
                            index={1}
                            onClick={this.handleClick}
                        >
                            <Icon name='dropdown'/>
                            What is CyberArena ?
                        </Accordion.Title>
                        <Accordion.Content active={this.state.activeIndex === 1}>
                            <p>
                                Introducing CyberArena, the exciting new online platform game brought to you by a team of three third-year college students.
                                <br/>
                                CyberArena immerses players in a vibrant cyberpunk world where
                                they can battle against each other using a range of unique and powerful cards.
                                Each card represents a character, ability, or special equipment,
                                and players must use them strategically to defeat their opponents.
                            </p>
                            <List bulleted={true}>
                                <List.Item>
                                    <b>Strategy</b> - Players must use their cards to their advantage to defeat their opponents.
                                </List.Item>
                                <List.Item>
                                    <b>Excitement</b> - The game is fast-paced and exciting, with players able to play against each other in real-time.
                                </List.Item>
                                <List.Item>
                                    <b>Customization</b> - Players can customize their decks to suit their playstyle.
                                </List.Item>
                            </List>
                        </Accordion.Content>
                        <Accordion.Title
                            active={this.state.activeIndex === 2}
                            index={2}
                            onClick={this.handleClick}
                        >
                            <Icon name='dropdown'/>
                            How we did it ?
                        </Accordion.Title>
                        <Accordion.Content active={this.state.activeIndex === 2}>
                            <p>
                                Our project, CyberArena, has been built using the latest technologies to ensure a smooth
                                and seamless experience for our players.
                            </p>
                            <List bulleted={true}>
                                <List.Item>
                                    For the front-end, we have utilized React, a popular JavaScript library
                                    that allows for efficient rendering of user interfaces.
                                </List.Item>
                                <List.Item>
                                    On the back-end, we have employed Python, a powerful and versatile programming language,
                                    to handle the more complex tasks.
                                </List.Item>
                                <List.Item>
                                    To facilitate development and ensure consistency across all team members, we have utilized Docker,
                                    a tool that allows us to package and deploy our application with ease.
                                </List.Item>
                            </List>
                        </Accordion.Content>
                    </Accordion>
                </Container>
            </Container>
        )
    }
}
