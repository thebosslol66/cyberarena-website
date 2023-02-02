/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { Button } from 'semantic-ui-react'
import React from 'react'
import { Link } from 'react-router-dom'
import { CardModel } from '../client'
import {Board} from "../component/Game/Board";
import {GAME_STATE} from "../component/ui/D&D/utils";

let board = {

    cards_on_board: {
        1: {
            id: 1,
            name: 'Heisenberg',
            description: 'useless',
            cost: 10,
            damage: 5,
            health: 22,
            defense: 13
        } as CardModel,
        2: {id: 2, name: 'Walter', description: 'useless', cost: 10, damage: 5, health: 22, defense: 13} as CardModel,
        3: {id: 3, name: 'Jesse', description: 'useless', cost: 10, damage: 5, health: 22, defense: 13} as CardModel,
        4: {id: 4, name: 'Saul', description: 'useless', cost: 10, damage: 5, health: 22, defense: 13} as CardModel,

    },
    main_1: [1, 2, 3, 4],
}

const background = '/img/background/arena1.png'


export default class GamePage extends React.Component <{ }, { } > {
    render () {
        return (
            <div style={{
                background: `url(${background}) no-repeat center center fixed`,
                backgroundSize: 'cover',
                width: '100%',
                height: '100vh',
                position: 'relative'
            }}>
                <Button icon='remove' content='Leave Game' as={Link} to='/dashboard' negative={ true } floated={ 'right' } style={{ marginTop: '2em', marginRight: '1em' }}/>
                <Board  board={board}></Board>
            </div>
        )
    }
}
