/* tslint:disable */
/* eslint-disable */
import { Button } from 'semantic-ui-react'
import React from 'react'
import {Link} from "react-router-dom";

const background = '/img/background/arena1.png'
export default class GamePage extends React.Component {
    render () {
        return (
            <div style={{
                background: `url(${background}) no-repeat center center fixed`,
                backgroundSize: 'cover',
                width: '100%',
                height: '100vh',
                position: 'relative'
            }}>
                <Button icon='remove' content='Leave Game' as={Link} to='/dashboard' negative={true} textAlign='center' floated={'right'} style={{ marginTop: '2em', marginRight: '1em'}}/>

            </div>
        )
    }
}
