import { CardModel } from '../../client'
import React from 'react'
import Card from '../ui/Card/card'

interface Props {
    cards: CardModel[]
    height: string
    width: string
}

export class Deck extends React.Component<Props, {}> {
    render (): JSX.Element {
        return (
            <div
                style={{
                    width: this.props.width,
                    height: this.props.height,
                    margin: 'auto',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center'
                }}
            >
                {this.props.cards.map((card, index) => (
                    <Card number={190}
                        name={'First'}
                        subtypes={'basic v'}
                        supertype={'pokemon'}
                        rarity={'rare ultra'}
                        gallery={'false'}
                        back_img={'/img/card_background_1.png'}
                        front_img={'/img/card_background_1.png'}
                        style={{
                            userSelect: 'none',
                            padding: 16,
                            margin: '0 0 8px 0',
                            minHeight: '50px'
                        }}
                        key={index}
                    />
                ))}
            </div>
        )
    }
}
