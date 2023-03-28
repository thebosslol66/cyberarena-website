import React from 'react'
import './card-static.css'

interface CardStaticProps {
    front_img: string
    style: React.CSSProperties
    draggable_options?: any
    forwardedRef?: any
    hp: number
    dp: number
    ap: number
    cost: number
    onCardClick?: (card: any) => void
}

export class CardStatic extends React.Component<CardStaticProps, any> {
    public render (): JSX.Element {
        return (
            <div className="card-static"
                {...this.props.draggable_options}
                ref={this.props.forwardedRef}
                onClick={this.props.onCardClick}
            >
                <div className="card-image" style={{ backgroundImage: `url(${this.props.front_img})` }}>
                    <div className="card-content">
                        <style>
                            @import url(&#39;https://fonts.cdnfonts.com/css/valorax&#39;);
                        </style>
                        <div className="card-cost">
                            {this.props.cost}
                        </div>
                        <div className="card-stats">
                            <div className="card-hp">
                                {this.props.hp}
                            </div>
                            <div className="card-ap">
                                {this.props.ap}
                            </div>
                            <div className="card-dp">
                                {this.props.dp}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
