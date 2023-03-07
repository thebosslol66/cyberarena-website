import { CardModel } from '../../client'
import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import Card from '../ui/Card/card'

interface Props {
    index: number
    card: CardModel
}
export class DraggableCard extends React.Component<Props, any> {
    render (): JSX.Element {
        return (
            <Draggable draggableId={`card-${this.props.card.id}`} index={this.props.index} >
                {(provided) => (

                    <Card number={190}
                        name={'First'}
                        subtypes={'basic v'}
                        supertype={'pokemon'}
                        rarity={'rare ultra'}
                        gallery={'false'}

                        back_img={'https://images.pokemontcg.io/base1/1_hires.png'}
                        front_img={`http://localhost:8000/api/game/card/${this.props.card.id}/image`}

                        draggable_options={{
                            ...provided.draggableProps,
                            ...provided.dragHandleProps
                        }}

                        style={{
                            userSelect: 'none',
                            padding: 16,
                            margin: '0 0 8px 0',
                            minHeight: '50px',

                            ...provided.draggableProps.style
                        }}

                        forwardedRef={provided.innerRef}
                    />
                )}
            </Draggable>
        )
    }
}
