/* tslint:disable */
/* eslint-disable */
import {Button, GridRow} from 'semantic-ui-react'
import React from 'react'
import {Link} from "react-router-dom";
import {DragDropContext, Draggable, DraggingStyle, Droppable, NotDraggingStyle} from "react-beautiful-dnd"
import Dropzone from "../component/ui/D&D/Dropzone"
import {GAME_STATE, move} from "../component/ui/D&D/utils"
import {GameService} from '../client/services/GameService'


const background = '/img/background/arena1.png'


export default class GamePage extends React.Component {
    componentDidMount () {
        this.getCards(5)
    }

    state = {
        gameState: GAME_STATE.READY,
        deck_1: [],
        deck_2: [],
        plateau_1: [],
        plateau_2: []
    };
    getCards = (count: number) => {
        GameService.getCardApiGameCardCardIdDataGet(1).then((response) => {
            console.log(typeof response)
            console.log(response)
            console.log(typeof this.state.deck_1)
            this.setState({deck_1: this.state.deck_1.concat(response)})
            console.log(typeof this.state.deck_1)

            //this.setState({deck_1: response})
        })
    }



    startGame = () => {
        this.setState(
            {
                gameState: GAME_STATE.PLAYING
            },
        );
    };

    getItemStyle = (isDragging: boolean, draggableStyle: DraggingStyle | NotDraggingStyle | undefined) => ({
        // some basic styles to make the items look a bit nicer
        userSelect: 'none',
        padding: 8 * 2,
        margin: `0 8px 0 0`,

        // change background colour if dragging
        background: isDragging ? 'lightgreen' : 'grey',

        // styles we need to apply on draggables
        ...draggableStyle,
    });
    getListStyle = (isDraggingOver: boolean) => ({
        background: isDraggingOver ? 'lightblue' : 'lightgrey',
        display: 'flex',
        padding: 8,
        overflow: 'auto',
    });
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
                        <Droppable droppableId="droppable" direction="horizontal">
                            {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}
                                   {...provided.droppableProps}
                                    style={this.getListStyle(snapshot.isDraggingOver)}
                                >
                                    {this.state.deck_1.map((card, index) => (
                                        <Draggable key={card.id} draggableId={card.id} index={index}>
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    style={{ background: 'lightblue' }}
                                                >
                                                    {card.name}
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}

                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>

                        <GridRow color={'blue'} margin>
                            <Dropzone id="plateau1" cards={ this.state["plateau_1"] } isDropDisabled={isDropDisabled} />
                        </GridRow>
                        <GridRow color={'red'}>
                            <Dropzone id="plateau2" cards={ this.state["plateau_2"] } isDropDisabled={isDropDisabled} />
                        </GridRow>
                        <GridRow color={'blue'}>
                            <Dropzone id="2" cards={ this.state["deck_2"] } isDropDisabled={isDropDisabled} />
                        </GridRow>

                    </DragDropContext>

            </div>
        )
    }
}
