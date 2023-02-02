import React, { Component } from 'react'
import Shine from './card-shine'
import Glare from './card-glare'

import './card.css'
import Spring, { SpringConfig } from '../../../utils/spring'

// make a card componnent like pokemon-cards-css

interface CardProps {
    number: number
    name: string
    subtypes: string
    supertype: string
    rarity: string
    gallery: string
    style: React.CSSProperties
    back_img: string
    front_img: string
    options?: any
    draggable_options?: any
    forwardedRef?: any
}

interface CardState {
    mx: number
    my: number
    rx: number
    ry: number
    s: number
    o: number
    posx: number
    posy: number
    hyp: number
    galaxybg: number
}

export default class Card extends Component<CardProps, {}> {
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor

    public state: CardState
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
    private updateCall: any | null
    private readonly springR: SpringConfig
    private readonly springD: SpringConfig
    private readonly rx: Spring
    private readonly ry: Spring
    private readonly mx: Spring
    private readonly my: Spring
    private readonly s: Spring
    private readonly o: Spring
    private readonly posx: Spring
    private readonly posy: Spring
    private mouse: React.MouseEvent<HTMLButtonElement> | null
    private isReset: boolean
    private readonly SpringSnap: SpringConfig

    constructor (props: CardProps) {
        super(props)

        this.springR = { stiffness: 0.066, damping: 0.25 }
        this.springD = { stiffness: 0.033, damping: 0.45 }
        this.SpringSnap = { stiffness: 0.01, damping: 0.06 }

        this.state = {
            rx: 0,
            ry: 0,
            mx: 50,
            my: 50,
            s: 1,
            o: 0,
            posx: 0,
            posy: 0,
            hyp: 0,
            galaxybg: 0
        }

        this.rx = new Spring(0, this.springR)
        this.ry = new Spring(0, this.springR)
        this.mx = new Spring(50, this.springR)
        this.my = new Spring(50, this.springR)
        this.s = new Spring(1, this.springD)
        this.o = new Spring(0, this.springR)
        this.posx = new Spring(0, this.springR)
        this.posy = new Spring(0, this.springR)

        this.back_loading =
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAuCAYAAACmsnC6AAAANklEQVR42u3OMQEAAAQAMKJJJT4ZXJ4' +
            'twTKqJ56lhISEhISEhISEhISEhISEhISEhISEhMTdAodwTxGtMFP/AAAAAElFTkSuQmCC'
        this.front_loading =
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAuCAYAAACmsnC6AAAN0lEQVR42u3OIQ' +
            'EAMAgAsNP/AkFfyIDCbAkWP6vfsZCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQ2BtyOnuhnmSZZAAAAABJRU5ErkJggg=='
        this.img_base =
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/'
        this.front_img = ''
        this.galaxyPosition = Math.floor(Math.random() * 1500)

        this.element = React.createRef()
        this.width = 0
        this.height = 0
        this.left = 0
        this.top = 0

        this.updateCall = null

        this.handleMouseEnter = this.handleMouseEnter.bind(this)
        this.handleMouseLeave = this.handleMouseLeave.bind(this)
        this.handleMouseMove = this.handleMouseMove.bind(this)
        this.update = this.update.bind(this)

        const defaultSettings = {
            reverse: false,
            maxX: 16,
            maxY: 18,
            reset: false
        }

        this.settings = {
            ...defaultSettings,
            ...this.props.options
        }
        this.reverse = this.settings.reverse === true ? -1 : 1

        this.mouse = null
        this.isReset = false
    }

    handleMouseEnter (e: React.MouseEvent<HTMLButtonElement>): void {
        this.rx.setConfig(this.springR)
        this.ry.setConfig(this.springR)
        this.mx.setConfig(this.springR)
        this.my.setConfig(this.springR)
        this.s.setConfig(this.springD)
        this.o.setConfig(this.springR)
        this.posx.setConfig(this.springR)
        this.posy.setConfig(this.springR)

        this.rx.resetTime()
        this.ry.resetTime()
        this.mx.resetTime()
        this.my.resetTime()
        this.s.resetTime()
        this.o.resetTime()
        this.posx.resetTime()
        this.posy.resetTime()

        this.updateElementPosition()
        this.isReset = false
        this.mouse = e
        this.o.setValue(1)

        this.updateCall = requestAnimationFrame(this.update)
    }

    reset (): void {
        this.rx.forceValue(0)
        this.ry.forceValue(0)
        this.mx.forceValue(50)
        this.my.forceValue(50)
        this.s.forceValue(1)
        this.o.forceValue(0)
        this.posx.forceValue(0)
        this.posy.forceValue(0)
        this.o.forceValue(0)

        this.updateCard()
        this.mouse = null
    }

    handleMouseLeave (): void {
        this.isReset = true
        this.mouse = null
        this.o.setValue(0)

        this.rx.setConfigUpdate({ soft: 1 })
        this.rx.setConfig(this.SpringSnap)
        this.ry.setConfigUpdate({ soft: 1 })
        this.ry.setConfig(this.SpringSnap)
        this.mx.setConfigUpdate({ soft: 1 })
        this.mx.setConfig(this.SpringSnap)
        this.my.setConfigUpdate({ soft: 1 })
        this.my.setConfig(this.SpringSnap)
        this.s.setConfigUpdate({ soft: 1 })
        this.s.setConfig(this.SpringSnap)
        this.s.setConfigUpdate({ soft: 1 })
        this.o.setConfig(this.SpringSnap)
        this.posx.setConfigUpdate({ soft: 1 })
        this.posx.setConfig(this.SpringSnap)
        this.posy.setConfigUpdate({ soft: 1 })
        this.posy.setConfig(this.SpringSnap)

        if (this.settings.reset === true) {
            cancelAnimationFrame(this.updateCall)
            this.reset()
        }
    }

    getValues (): {
        tiltY: number
        percentageX: number
        tiltX: number
        percentageY: number
        backgroundX: number
        backgroundY: number
    } {
        const e = this.mouse
        if (e == null) {
            return {
                tiltY: 0,
                percentageX: 0,
                tiltX: 0,
                percentageY: 0,
                backgroundX: 0,
                backgroundY: 0
            }
        }

        let x = 0.5
        let y = 0.5
        if (!this.isReset) {
            x = (e.nativeEvent.clientX - this.left) / this.width
            y = (e.nativeEvent.clientY - this.top) / this.height
        }

        const _x = Math.min(Math.max(x, 0), 1)
        const _y = Math.min(Math.max(y, 0), 1)
        const percentageX = _x * 100
        const percentageY = _y * 100

        const center = {
            x: percentageX - 50,
            y: percentageY - 50
        }

        const tiltX = this.reverse * -(center.x / 3.5)
        const tiltY = this.reverse * (center.y / 2)

        const backgroundX = 50 + (_x * 100) / 4 - 12.5
        const backgroundY = 50 + (_y * 100) / 3 - 16.67

        return {
            tiltX,
            tiltY,
            percentageX,
            percentageY,
            backgroundX,
            backgroundY
        }
    }

    updateElementPosition (): void {
        const rect = this.element.current.getBoundingClientRect()
        this.width = this.element.current.offsetWidth
        this.height = this.element.current.offsetHeight
        this.left = rect.left
        this.top = rect.top
    }

    update (): void {
        if (this.isReset && this.rx.getValue() === 0 && this.ry.getValue() === 0) {
            cancelAnimationFrame(this.updateCall)
            return
        }
        const values = this.getValues()

        this.rx.setValue(values.tiltX)
        this.ry.setValue(values.tiltY)
        this.mx.setValue(values.percentageX)
        this.my.setValue(values.percentageY)
        this.posx.setValue(values.backgroundX)
        this.posy.setValue(values.backgroundY)

        this.rx.update()
        this.ry.update()
        this.mx.update()
        this.my.update()
        this.posx.update()
        this.posy.update()
        this.s.update()
        this.o.update()

        this.updateCard()

        setTimeout(() => {
            this.updateCall = requestAnimationFrame(this.update)
        }, 1000 / 60)
    }

    handleMouseMove (e: React.MouseEvent<HTMLButtonElement>): void {
        e.persist()
        this.mouse = e
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
                {...this.props.draggable_options}
                style={{
                    ...this.props.style,
                    ['--mx' as any]: this.state.mx.toString() + '%',
                    ['--my' as any]: this.state.my.toString() + '%',
                    ['--o' as any]: this.state.o.toString(),
                    ['--s' as any]: this.state.s.toString(),
                    ['--rx' as any]: this.state.rx.toString() + 'deg',
                    ['--ry' as any]: this.state.ry.toString() + 'deg',
                    ['--pos' as any]:
                    this.state.posx.toString() + '%' + this.state.posy.toString() + '%',
                    ['--posx' as any]: this.state.posx.toString() + '%',
                    ['--posy' as any]: this.state.posy.toString() + '%',
                    ['--hyp' as any]: '0',
                    ['--galaxybg' as any]:
                    'center ' + this.state.galaxybg.toString() + 'px'
                }}
                ref={this.props.forwardedRef}
                onMouseEnter={this.handleMouseEnter}
                onMouseMove={this.handleMouseMove}
                onMouseLeave={this.handleMouseLeave}
                // onChange={this.interact}
            >
                <div className="card__translater"
                    style={{
                        width: this.props.style.width,
                        maxWidth: this.props.style.maxWidth,
                        height: this.props.style.height,
                        maxHeight: this.props.style.maxHeight,
                        pointerEvents: 'none'
                    }}
                >
                    <button
                        className="card__rotator"
                        aria-label="Expand the Pokemon Card; {name}."
                        tabIndex={0}
                        ref={this.element}
                        style={{
                            width: '100%',
                            height: '100%'
                        }}
                    >
                        <img
                            className="card__back"
                            src={this.props.back_img}
                            alt="The back of a Pokemon Card, a Pokeball in the center with Pokemon logo above and below"
                            loading="lazy"
                            style={{
                                width: '100%',
                                height: '100%',
                                pointerEvents: 'none'

                            }}
                        />
                        <div className="card__front">
                            <img
                                src={this.props.front_img}
                                alt="Front design of the {name} Pokemon Card, with the stats and info around the edge"
                                // onLoad={this.imageLoader}
                                loading="lazy"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    pointerEvents: 'none'
                                }}
                            />
                            <Shine/>
                            <Glare/>
                        </div>
                    </button>
                </div>
            </div>
        )
    }

    private updateCard (): void {
        this.setState({
            rx: this.rx.getValue(),
            ry: this.ry.getValue(),
            mx: this.mx.getValue(),
            my: this.my.getValue(),
            s: this.s.getValue(),
            o: this.o.getValue(),
            posx: this.posx.getValue(),
            posy: this.posy.getValue()
        })
    }
}
