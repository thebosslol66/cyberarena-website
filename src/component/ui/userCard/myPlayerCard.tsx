import React from 'react'
import { Card, Container, Icon, Placeholder } from 'semantic-ui-react'
import ProfileContext from '../../../context/ProfileContext'
import MyAvatar from './MyAvatar'

export default class MyGameProfile extends React.Component {
    render (): JSX.Element {
        return (
            <ProfileContext.Consumer>
                {({ username, loading }) => (
                    <Container>
                        <Card centered={true}>
                            <MyAvatar/>
                            <Card.Content extra={true}>
                                <Card.Header>
                                    { loading
                                        ? (
                                            <Placeholder>
                                                <Placeholder.Header>
                                                    <Placeholder.Line/>
                                                </Placeholder.Header>
                                            </Placeholder>
                                        )
                                        : (
                                            <>
                                                { username }
                                            </>
                                        )}
                                </Card.Header>
                                <Card.Description>
                                    <Icon name="gamepad" />
                                    Cyber Level :{ ' ' }
                                    { loading
                                        ? (
                                            <Placeholder>
                                                <Placeholder.Line />
                                            </Placeholder>
                                        )
                                        : (0)}
                                </Card.Description>
                                <Card.Description textAlign={ 'right' }>
                                    <Icon name='gem' />
                                Cyber Points :{' '}
                                    {loading
                                        ? (
                                            <Placeholder>
                                                <Placeholder.Line />
                                            </Placeholder>
                                        )
                                        : (0)}
                                </Card.Description>
                            </Card.Content>
                        </Card>
                    </Container>
                )}
            </ProfileContext.Consumer>
        )
    }
}
