import React from 'react'
import { Card, Image, Icon, Grid } from 'semantic-ui-react'

interface ImageCarousel {
    src: string
    description: string
}

interface Props {
    images: ImageCarousel[]
}

interface State {
    activeIndex: number
    images: ImageCarousel[]
}

class Carousel extends React.Component<Props, State> {
    constructor (props: Props) {
        super(props)
        this.state = {
            activeIndex: 0,
            images: props.images
        }
    }

    handleNext = (): void => {
        const nextIndex = this.state.activeIndex + 1
        if (nextIndex >= this.state.images.length) {
            this.setState({ activeIndex: 0 })
        } else {
            this.setState({ activeIndex: nextIndex })
        }
    }

    handlePrev = (): void => {
        const prevIndex = this.state.activeIndex - 1
        if (prevIndex < 0) {
            this.setState({ activeIndex: this.state.images.length - 1 })
        } else {
            this.setState({ activeIndex: prevIndex })
        }
    }

    render (): JSX.Element {
        return (
            <Card>
                <Image src={this.state.images[this.state.activeIndex].src} wrapped ui={false} />
                <Card.Content>
                    <Card.Description>{this.state.images[this.state.activeIndex].description}</Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Grid columns={2}>
                        <Grid.Column textAlign="left">
                            <Icon name="chevron left" onClick={this.handlePrev} />
                        </Grid.Column>
                        <Grid.Column textAlign="right">
                            <Icon name="chevron right" onClick={this.handleNext} />
                        </Grid.Column>
                    </Grid>
                </Card.Content>
            </Card>
        )
    }
}

export default Carousel
