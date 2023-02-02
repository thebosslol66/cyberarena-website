import React from 'react'
import { NavLink } from 'react-router-dom'

import { Button, Container, Image, Menu } from 'semantic-ui-react'

import AuthContext from '../../context/AuthContext'

export default class Navbar extends React.Component {
    render (): JSX.Element {
        return (
            <AuthContext.Consumer>
                {({ isLogged }) => (
                    <Menu
                        fixed="top"
                        borderless={true}
                        data-testid="navbar"
                    >
                        <Container>
                            <Menu.Item as="a" to={'/'} header>
                                <Image size='mini' src='/logo192.png' style={{ marginRight: '1.5em' }}/>
                                CyberArena
                            </Menu.Item>
                            <Menu.Item
                                as={NavLink}
                                to="/"
                                name='home'
                            />
                            <Menu.Item
                                as={NavLink}
                                to="/theming"
                                name='theming'
                            />
                            {isLogged && (
                                <Menu.Item
                                    as={NavLink}
                                    to="/dashboard"
                                    name='dashboard'
                                />
                            )}
                            {isLogged && (
                                <Menu.Item
                                    as={NavLink}
                                    to="/profile"
                                    name='profile'
                                />
                            )}
                            <Menu.Menu position="right">
                                {!isLogged && (
                                    <Menu.Item>
                                        <Button as={NavLink} to="/signin" name="signin" className={'signin-button'}
                                            primary>Sign In</Button>
                                    </Menu.Item>
                                )}
                                {!isLogged && (
                                    <Menu.Item>
                                        <Button as={NavLink} to="/signup" name="signup" className={'signup-button'}>Sign
                                            Up</Button>
                                    </Menu.Item>
                                )}
                                {isLogged && (
                                    <Menu.Item>
                                        <Button as={NavLink} to="/signout" name="signout" className={'signout-button'}>Sign
                                            Out</Button>
                                    </Menu.Item>
                                )}
                            </Menu.Menu>
                        </Container>
                    </Menu>
                )}
            </AuthContext.Consumer>
        )
    }
}
