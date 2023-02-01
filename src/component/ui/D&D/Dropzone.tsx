import React from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import Card from '../Card/card'
import {CardModel} from "../../../client";
interface Props {
    isDropDisabled: boolean
    cards: string[]
    id: string
    color: string
    height: string
    width: string
}
const Dropzone: React.FC<Props> = ({ isDropDisabled, cards, id , color, height, width}) => {
    return (
        <Droppable key={id} droppableId={id} direction="horizontal" isDropDisabled={isDropDisabled}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={{backgroundColor: color, width: width, height: height, margin: 'auto'}}
                >
                    {cards.map((card, index) => (
                        CardDrag(card, index)
                    ))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    )
}
//<Card number={190}
//                             name={'First'}
//                             subtypes={'basic v'}
//                             supertype={'pokemon'}
//                             rarity={'rare ultra'}
//                             gallery={'false'}
//                             style={{ maxWidth: '35vmin', margin: 'auto' }}
//
//                             back_img={'https://images.pokemontcg.io/base1/1_hires.png'}
//                             front_img={'https://images.pokemontcg.io/base1/1_hires.png'}/>
const CardDrag = (card: string, index: number): JSX.Element => {
    return (
        <Draggable key={card} draggableId={(card).toString()} index={index}>
            {provided => {
                return (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                        {card}
                    </div>
                )
            }}
        </Draggable>
    )
}

export default Dropzone
