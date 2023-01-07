import React from 'react'
import { Grid, Header, Placeholder, Segment } from 'semantic-ui-react'

export default class myUserCard extends React.Component {
    state = { loading: true }

    componentDidMount () {
        setTimeout(() => this.setState({ loading: false }), 1500)
    }

    render () {
        return (
            <Segment>
                <Grid centered={true}
                >
                    <Grid.Row>
                        <Header as='h2' textAlign='center'>
                            My Cyber Profile
                        </Header>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column
                            width={6}>
                            {this.state.loading
                                ? (
                                    <Placeholder>
                                        <Placeholder.Image square/>
                                    </Placeholder>
                                )
                                : (
                                    <img src='https://react.semantic-ui.com/images/wireframe/square-image.png'/>
                                )}
                        </Grid.Column>
                    </Grid.Row>
                </Grid>

            </Segment>
        )
    }
}
