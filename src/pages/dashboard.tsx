import React from 'react'
import { Container, Segment } from 'semantic-ui-react'
import MyProfile from '../component/ui/userCard/myPlayerCard'
import MatchmakingButton from '../component/ui/button/MatchmakingButton'
function Dashboard (): JSX.Element {
    return (
        <Segment basic style={{ paddingTop: '6em' }} fluid="true">
            <Container textAlign='center'>
                <MatchmakingButton/>
            </Container>
            <Container>
                <MyProfile/>
            </Container>
        </Segment>
    )
}

export default Dashboard
