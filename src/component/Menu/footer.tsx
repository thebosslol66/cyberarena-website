import React from 'react'
import { Container, Grid, Header, Icon, List, Segment } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

export default class Footer extends React.Component {
    render (): JSX.Element {
        return (
            <Segment inverted vertical style={{ padding: '5em 0em', marginTop: '2em' }}>
                <Container>
                    <Grid divided inverted stackable>
                        <Grid.Row>
                            <Grid.Column width={3}>
                                <Header inverted as='h4' content='About'/>
                                <List link inverted>
                                    <List.Item as={NavLink} to={'#'}>Contact Us</List.Item>
                                    <List.Item as={NavLink} to={'/aboutus'} >About Us</List.Item>
                                    <List.Item as={NavLink} to={'#'}>FAQ</List.Item>
                                </List>
                            </Grid.Column>
                            <Grid.Column width={3}>
                                <Header inverted as='h4' content='Legal'/>
                                <List link inverted>
                                    <List.Item as={NavLink} to={'#'}>Terms of Use</List.Item>
                                    <List.Item as={NavLink} to={'/privacypolicy'}>Privacy Policy</List.Item>
                                </List>
                            </Grid.Column>
                            <Grid.Column width={7}>
                                <Header as='h4' inverted>Stay Connected</Header>
                                <p>
                                    Follow us on social media to stay up to date on the latest news and updates for
                                    CyberArena:
                                </p>
                                <List horizontal inverted>
                                    <List.Item as='a' href="#"><Icon name='facebook'/>Facebook</List.Item>
                                    <List.Item as='a' href="#"><Icon name='twitter'/>Twitter</List.Item>
                                    <List.Item as='a' href="#"><Icon name='instagram'/>Instagram</List.Item>
                                </List>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </Segment>
        )
    }
}
