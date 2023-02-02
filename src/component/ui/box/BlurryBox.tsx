import React from 'react'
import { Container } from 'semantic-ui-react'
import './BlurryBox.css'

export class BlurryBox extends React.Component<{ children: JSX.Element | JSX.Element[] }> {
    render (): JSX.Element {
        return (
            <Container textAlign='left' className='blurry-box'>
                {this.props.children}
            </Container>
        )
    }
}
