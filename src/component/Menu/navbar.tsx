import React from 'react'
import { Link } from 'react-router-dom'

import AuthService from '../../services/auth.service'

function Navbar (): JSX.Element {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                {(AuthService.getCurrentUser() !== null)
                    ? (
                        <>
                            <li>
                                <Link to="/dashboard">Dashboard</Link>
                            </li>
                            <li>
                                <Link to="/signout">Sign Out</Link>
                            </li>
                        </>
                    )
                    : (
                        <>
                            <li>
                                <Link to="/signin">Sign in</Link>
                            </li>
                            <li>
                                <Link to="/signup">Sign up</Link>
                            </li>
                        </>
                    )}
            </ul>
        </nav>
    )
}

export default Navbar
