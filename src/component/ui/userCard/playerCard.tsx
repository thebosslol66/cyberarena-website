import React from 'react'
import { Grid, Placeholder, Segment } from 'semantic-ui-react'

export default class userCard extends React.Component {
    render () {
        return (
            <Segment>
                <Grid centered={true}
                >
                    <Grid.Column
                        width={6}>
                        <Placeholder>
                            <Placeholder.Line></Placeholder.Line>
                        </Placeholder>
                    </Grid.Column>
                </Grid>

            </Segment>
        )
    }
}
