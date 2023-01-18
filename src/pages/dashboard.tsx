import React from 'react'
import { Container, Segment } from 'semantic-ui-react'
import MyProfile from '../component/ui/userCard/myPlayerCard'

function Dashboard (): JSX.Element {
    return (
        <Segment basic style={{ paddingTop: '6em' }} fluid="true">
            <Container>
                <MyProfile/>
            </Container>
        </Segment>
    )
}

export default Dashboard
