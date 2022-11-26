import React from 'react'
import { Container } from 'semantic-ui-react'
import background from '../assets/background/testreact.jpg'

function HomePage (): JSX.Element {
    return (
        <div style={{ backgroundImage: `url(${background})`, width: '100vw', height: '100vh' }}>
            <Container fluid={true} style={{ marginTop: '7em' }}>
                <h1>Home Page</h1>
            </Container>
        </div>

    )
}

export default HomePage
