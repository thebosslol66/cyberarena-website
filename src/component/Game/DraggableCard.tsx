import { CardModel } from '../../client'
import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import Card from '../ui/Card/card'
import {CardStatic} from "../ui/Card/card-static";

interface Props {
    index: number
    card: CardModel
    onCardClick?: (card: any) => void
    main: boolean
}
export class DraggableCard extends React.Component<Props, any> {
    render() {
        return (
            <Draggable draggableId={`card-${this.props.card.id}`} index={this.props.index}>
                {(provided) => {
                    const cardContent = this.props.main ? (
                        <Card
                            number={190}
                            name={'First'}
                            subtypes={'basic v'}
                            supertype={'pokemon'}
                            rarity={'rare ultra'}
                            gallery={'false'}
                            back_img={'/img/card_background_1.png'}
                            front_img={`http://localhost:8000/api/game/card/${this.props.card.id_pic}/imagefull`}
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
                    ) : (
                        <CardStatic
                            front_img={`http://localhost:8000/api/game/card/${this.props.card.id_pic}/image`}
                            hp={this.props.card.health}
                            dp={this.props.card.defense}
                            ap={this.props.card.damage}
                            cost={this.props.card.cost}
                            draggable_options={{
                                ...provided.draggableProps,
                                ...provided.dragHandleProps
                            }}
                            onCardClick={() => this.props.onCardClick?.(this.props.card.id)}
                            style={{
                                userSelect: 'none',
                                padding: 16,
                                margin: '0 0 8px 0',
                                minHeight: '50px',
                                ...provided.draggableProps.style
                            }}
                            forwardedRef={provided.innerRef}
                        />
                    )

                    return cardContent
                }}
            </Draggable>
        );
    }
}
