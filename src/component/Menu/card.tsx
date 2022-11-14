import React, { Component } from 'react'
import Shine from './card-shine'
import Glare from './card-glare'

import './card.css'

// make a card componnent like pokemon-cards-css

interface CardProps {
    number: number
    name: string
    subtypes: string
    supertype: string
    rarity: string
    types: string
    gallery: string
    styles: React.CSSProperties
    back_img: string
    front_img: string
    options?: any
}

interface CardState {
    mx: number
    my: number
    rx: number
    ry: number
    s: number
    o: number
    pos: number
    posx: number
    posy: number
    hyp: number
    galaxybg: number
}

export default class Card extends Component< CardProps, {}> {
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor

    private readonly back_loading: string
    private readonly front_loading: string
    private readonly img_base: string
    private readonly front_img: string

    private readonly galaxyPosition: number

    private width: number
    private height: number
    private left: number
    private top: number
    private readonly element: any
    private readonly settings: any
    private readonly reverse: number
    private transitionTimeout: any | null
    private updateCall: any | null
    public state: CardState

    constructor (props: CardProps) {
        super(props)

        this.state = {
            rx: 0,
            ry: 0,
            mx: 50,
            my: 50,
            s: 1,
            o: 1,
            pos: 0,
            posx: 0,
            posy: 0,
            hyp: 0,
            galaxybg: 0
        }

        this.back_loading = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAuCAYAAACmsnC6AAAANklEQVR42u3OMQEAAAQAMKJJJT4ZXJ4' +
        'twTKqJ56lhISEhISEhISEhISEhISEhISEhISEhMTdAodwTxGtMFP/AAAAAElFTkSuQmCC'
        this.front_loading = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAuCAYAAACmsnC6AAAN0lEQVR42u3OIQ' +
        'EAMAgAsNP/AkFfyIDCbAkWP6vfsZCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQ2BtyOnuhnmSZZAAAAABJRU5ErkJggg=='
        this.img_base = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/'
        this.front_img = ''
        this.galaxyPosition = Math.floor(Math.random() * 1500)

        this.element = React.createRef()
        this.width = 0
        this.height = 0
        this.left = 0
        this.top = 0

        this.transitionTimeout = null
        this.updateCall = null

        this.handleMouseEnter = this.handleMouseEnter.bind(this)
        this.handleMouseMove = this.handleMouseMove.bind(this)
        this.handleMouseLeave = this.handleMouseLeave.bind(this)

        const defaultSettings = {
            reverse: false,
            max: 35,
            perspective: 1000,
            easing: 'cubic-bezier(.03,.98,.52,.99)',
            scale: '1.1',
            speed: '1000',
            transition: true,
            axis: null,
            reset: true
        }

        this.settings = {
            ...defaultSettings,
            ...this.props.options
        }
        this.reverse = (this.settings.reverse) ? -1 : 1

        // TODO: Use alternative to spring
    }

    handleMouseEnter (e: React.MouseEvent<HTMLButtonElement>): void {
        this.updateElementPosition()
        this.setTransition()
    }

    reset (): void {
        window.requestAnimationFrame(() => {
            console.log('RESETTING TRANSFORM STATE', `perspective(${this.settings.perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`)
            this.setState({
                rx: 0,
                ry: 0,
                mx: 50,
                my: 50
            })
        })
    }

    handleMouseMove (e: React.MouseEvent<HTMLButtonElement>): void {
        e.persist()
        if (this.updateCall !== null) {
            window.cancelAnimationFrame(this.updateCall)
        }
        this.updateCall = requestAnimationFrame(this.update.bind(this, e))
    }

    setTransition (): void {
        clearTimeout(this.transitionTimeout)
        console.log('SET TRANSITION', `Speed: ${this.settings.speed}ms Easing: ${this.settings.easing}`)

        this.transitionTimeout = setTimeout(() => {
            console.log('TRANSITION COMPLETE')

            this.setState({
                rx: 0,
                ry: 0,
                mx: 50,
                my: 50
            })
        }, this.settings.speed)
    }

    handleMouseLeave (e: React.MouseEvent<HTMLButtonElement>): void {
        this.setTransition()
        if (this.settings.reset) {
            this.reset()
        }
    }

    getValues (e: React.MouseEvent<HTMLButtonElement>): { tiltY: string, percentageX: number, tiltX: string, percentageY: number } {
        const x = (e.nativeEvent.clientX - this.left) / this.width
        const y = (e.nativeEvent.clientY - this.top) / this.height
        const _x = Math.min(Math.max(x, 0), 1)
        const _y = Math.min(Math.max(y, 0), 1)
        const tiltX = (this.reverse * (this.settings.max / 2 - _x * this.settings.max)).toFixed(2)
        const tiltY = (this.reverse * (_y * this.settings.max - this.settings.max / 2)).toFixed(2)
        const percentageX = _x * 100
        const percentageY = _y * 100
        console.log('JUST GOT NEW VALUES', `X: ${x} Y: ${y} -- TILT X: ${tiltX} TILT Y: ${tiltY} -- TILT X%: ${percentageX} TILT Y%: ${percentageY}`)
        console.log('Notice how X turned into percentageX.')
        return {
            tiltX,
            tiltY,
            percentageX,
            percentageY
        }
    }

    updateElementPosition (): void {
        const rect = this.element.current.getBoundingClientRect()
        this.width = this.element.current.offsetWidth
        this.height = this.element.current.offsetHeight
        this.left = rect.left
        this.top = rect.top
        console.log('UPDATED ELEMENT POSITION', `Width: ${this.width} Height: ${this.height} -- Left: ${this.left} Top: ${this.top}`)
    }

    update (e: React.MouseEvent<HTMLButtonElement>): void {
        const values = this.getValues(e)
        console.log('VALUES', values)
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        console.log('NEW CSS TRANSFORM VALUES', `perspective(${this.settings.perspective}px) rotateX(${this.settings.axis === 'x' ? 0 : values.tiltY}deg) rotateY(${this.settings.axis === 'y' ? 0 : values.tiltX}deg) scale3d(${this.settings.scale}, ${this.settings.scale}, ${this.settings.scale})`)
        this.setState({
            rx: this.settings.axis === 'y' ? 0 : values.tiltX,
            ry: this.settings.axis === 'x' ? 0 : values.tiltY,
            mx: values.percentageX,
            my: values.percentageY
        })

        this.updateCall = null
    }

    public render (): JSX.Element {
        return (

            <div
                className="card"
                data-number={this.props.number}
                data-subtypes={this.props.subtypes}
                data-supertype={this.props.supertype}
                data-rarity={this.props.rarity}
                data-gallery={this.props.gallery}
                style={{
                    ...this.props.styles,
                    ['--mx' as any]: this.state.mx.toString() + '%',
                    ['--my' as any]: this.state.my.toString() + '%',
                    ['--o' as any]: this.state.o.toString(),
                    ['--s' as any]: this.state.s.toString(),
                    ['--rx' as any]: this.state.rx.toString() + 'deg',
                    ['--ry' as any]: this.state.ry.toString() + 'deg',
                    ['--pos' as any]: this.state.pos.toString() + '%',
                    ['--posx' as any]: this.state.posx.toString() + '%',
                    ['--posy' as any]: this.state.posy.toString() + '%',
                    ['--hyp' as any]: '0',
                    ['--galaxybg' as any]: 'center ' + this.state.galaxybg.toString() + 'px'
                }}
                // onChange={this.interact}
            >
                <div className="card__translater">
                    <button
                        className="card__rotator"
                        // onChange={this.rotator}
                        // onClick={this.active}
                        // onPointerMove={this.interact}
                        // onMouseOut={this.interact}
                        // onBlur={this.deactivate}

                        aria-label="Expand the Pokemon Card; {name}."
                        tabIndex={0}

                        onMouseEnter={this.handleMouseEnter}
                        onMouseMove={this.handleMouseMove}
                        onMouseLeave={this.handleMouseLeave}

                        ref={this.element}
                    >
                        <img
                            className="card__back"
                            src={this.props.back_img}
                            alt="The back of a Pokemon Card, a Pokeball in the center with Pokemon logo above and below"
                            loading="lazy"
                            width="660"
                            height="921"
                        />
                        <div className="card__front">
                            <img
                                src={this.props.front_img}
                                alt="Front design of the {name} Pokemon Card, with the stats and info around the edge"
                                // onLoad={this.imageLoader}
                                loading="lazy"
                                width="660"
                                height="921"
                            />
                            <Shine />
                            <Glare />
                        </div>
                    </button>
                </div>
            </div>
        )
    }
}
