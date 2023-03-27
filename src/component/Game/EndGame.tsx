import React from 'react'
import { Button, Header, Modal } from 'semantic-ui-react'
import { Navigate } from 'react-router-dom'

interface IEndGameProps {
    open: boolean
    winner: number
}

interface EndGameStates {
    leaveGame: boolean
}
export default class EndGame extends React.Component< IEndGameProps, {}> {
    state: EndGameStates = { leaveGame: false }
    leaveGame = (): void => {
        this.setState({ leaveGame: true })
    }

    render (): JSX.Element {
        return (
            <Modal
                basic
                open={this.props.open}
                size='small'
            >
                {this.props.winner === 1
                    ? (
                        <>
                            <Header size='huge' icon='trophy' content='You won the game !' />
                            <Modal.Content>
                                <p>
                                    Congratulations!
                                </p>
                            </Modal.Content>
                        </>
                    )
                    : (
                        <>
                            <Header size='huge' icon='close' content='You lost the game !' />
                            <Modal.Content>
                                <p>
                                    Try again!
                                </p>
                            </Modal.Content>
                        </>
                    )
                }
                <Modal.Actions>
                    <Button align='center' icon='play' color={this.props.winner === 1 ? 'green' : 'red'} onClick={this.leaveGame} content='Play Again'/>
                    {this.state.leaveGame && <Navigate to="/dashboard" />}
                </Modal.Actions>
            </Modal>
        )
    }
}
