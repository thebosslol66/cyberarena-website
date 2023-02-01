/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { Button } from 'semantic-ui-react'
import React from 'react'
import { Link } from 'react-router-dom'
import { DragDropContext } from 'react-beautiful-dnd'
import Dropzone from '../component/ui/D&D/Dropzone'
import { GAME_STATE, move } from '../component/ui/D&D/utils'
import { GameService } from '../client/services/GameService'

const background = '/img/background/arena1.png'

interface State {
    gameState: typeof GAME_STATE.READY
    main_1: string[]
    main_2: string[]
    plateau_1: string[]
    plateau_2: string[]
}
export default class GamePage extends React.Component < {}, State > {
    componentDidMount () {
        //this.getCardInfo(1)
        this.generateCard(3)
    }
    constructor (props: any) {
        super(props)
        this.state = {
            gameState: GAME_STATE.READY,
            main_1: [],
            main_2: [],
            plateau_1: [],
            plateau_2: []
        }
    }

    getCardInfo = (count: number) => {
        GameService.getCardApiGameCardCardIdDataGet(1).then((response) => {
            //this.setState({ main_1: this.state.main_1.concat(response) })
        })
    }

    generateCard = (count: number) => {
        for (let i = 0; i < count; i++) {
            this.setState({ main_1: this.state.main_1.concat("test "+i) })
        }
    }

    startGame = () => {
        this.setState(
            {
                gameState: GAME_STATE.PLAYING
            }
        )
    }

    onDragEnd = (result: any) => {
        const { source, destination } = result
        if (!destination) {
            return
        }

        this.setState(state => move(state, source, destination, source.droppableId))
    }

    endGame = () => {
        this.setState({
            gameState: GAME_STATE.DONE
        })
    }

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
                <DragDropContext onDragEnd={ this.onDragEnd }>
                    <Dropzone id="main_1" cards={ this.state.main_1 } isDropDisabled={ false } color={ 'red' } height={ '15%' } width={ '50%' }/>
                    <Dropzone id="plateau_1" cards={ this.state.plateau_1 } isDropDisabled={ false } color={ 'blue' } height={ '30%' } width={ '100%' }/>
                    <Dropzone id="plateau_2" cards={ this.state.plateau_2 } isDropDisabled={ false } color={ 'green' } height={ '30%' } width={ '100%' }/>
                    <Dropzone id="main_2" cards={ this.state.main_2 } isDropDisabled={ false } color={ 'yellow' } height={ '25%' } width={ '70%' }/>
                </DragDropContext>
            </div>
        )
    }
}
