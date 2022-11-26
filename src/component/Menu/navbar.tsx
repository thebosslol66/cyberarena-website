import React from 'react'
import { Link, NavLink } from 'react-router-dom'

import { Button, Container, Image, Menu } from 'semantic-ui-react'

import AuthContext from '../../context/AuthContext'

export default class Navbar extends React.Component {
    render (): JSX.Element {
        return (
            <AuthContext.Consumer>
                {({ isLogged }) => (
                    <Menu
                        primary
                        fixed="top"
                        borderless={true}>
                        <Container>
                            <Menu.Item as="a" header>
                                <Link to={'/'} inputMode="text">
                                    <Image size='mini' src='/logo192.png' style={{ marginRight: '1.5em' }}/>
                                </Link>
                                <Link to={'/'} inputMode="text">
                                    Project Name
                                </Link>
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
