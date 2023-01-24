/* tslint:disable */
/* eslint-disable */
import { Button } from 'semantic-ui-react'
import React from 'react'
import {Link} from "react-router-dom";
import { DragDropContext } from "react-beautiful-dnd"
import Dropzone from "../component/ui/D&D/Dropzone"
import {GAME_STATE, move} from "../component/ui/D&D/utils"

const background = '/img/background/arena1.png'

const initialState = {
    // we initialize the state by populating the bench with a shuffled collection of heroes
    gameState: GAME_STATE.READY,
    deck_1: [],
    deck_2: [],
    plateau_1: [],
    plateau_2: []
};
export default class GamePage extends React.Component {
    state = initialState;

    startGame = () => {
        this.setState(
            {
                gameState: GAME_STATE.PLAYING
            },
        );
    };
    onDragEnd = (source: any, destination: any) => {
        if (!destination) {
            return;
        }
        this.setState(state => {
            return move(state, source, destination);
        });
    };
    endGame = () => {
        this.setState({
            gameState: GAME_STATE.DONE,
        });
    };
    render () {
        const { gameState } = this.state;
        const isDropDisabled = gameState === GAME_STATE.DONE;
        return (
            <div style={{
                background: `url(${background}) no-repeat center center fixed`,
                backgroundSize: 'cover',
                width: '100%',
                height: '100vh',
                position: 'relative'
            }}>
                <Button icon='remove' content='Leave Game' as={Link} to='/dashboard' negative={true} textAlign='center' floated={'right'} style={{ marginTop: '2em', marginRight: '1em'}}/>
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <Dropzone id="1" cards={ this.state["deck_1"] } isDropDisabled={isDropDisabled} />
                    <Dropzone id="plateau1" cards={ this.state["plateau_1"] } isDropDisabled={isDropDisabled} />
                    <Dropzone id="plateau2" cards={ this.state["plateau_2"] } isDropDisabled={isDropDisabled} />
                    <Dropzone id="2" cards={ this.state["deck_2"] } isDropDisabled={isDropDisabled} />
                </DragDropContext>
            </div>
        )
    }
}
