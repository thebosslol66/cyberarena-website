import { Link } from 'react-router-dom'
import { Button } from 'semantic-ui-react'
import React from 'react'

export function PlayNowButton (): JSX.Element {
    return (
        <Button
            primary={true}
            content='Play Now'
            icon='play'
            labelPosition='right'
            as={Link}
            to={'/dashboard'}
        />
    )
}

export function PlayNowButtonRight (): JSX.Element {
    return (
        <div style={{ justifyContent: 'end', display: 'flex' }}>
            <PlayNowButton />
        </div>
    )
}
