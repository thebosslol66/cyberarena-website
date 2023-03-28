import React from 'react'
import { Container, Divider, Embed, Grid, Header, Image, Segment } from 'semantic-ui-react'
import Card from '../component/ui/Card/card'
import { PlayNowButtonRight } from '../component/ui/button/PlayNowButton'
import { BlurryBox } from '../component/ui/box/BlurryBox'
import {FixedBackgroundDivImage, FixedBackgroundDivVideo } from '../component/ui/box/FixedBackgroundDiv'

const backgroundVideo = '/video/videoplayback.webm'
const backgroundVideoPoster = '/img/vidoeplayback.png'
const background2 = '/img/background/testreact2.jpg'
/*
1. Enter the CyberArena and take your chances in the ultimate card game challenge!
2. Face off against opponents from around the world and prove you're the best in this epic cyber showdown!
3. Step into a digital world where every move counts - can you become king of CyberArena?
4. Unleash your strategic genius and show them who's boss in an electrifying game of cards!
5. Get ready for an adventure like no other - welcome to CyberArena!
 <p>
                                Enter the thrilling world of CyberArena, where strategy and skill determine your victory. Challenge yourself against players from around the world and see if you have what it takes to be crowned champion of the virtual arena! Join now and test your mettle in a digital duel that will push you to your limits.
                            </p>

 */
const cardNumber = (Math.floor(Math.random() * 13) + 1)

function FirstPartHomePage (): JSX.Element {
    return (

        <div style={{
            position: 'relative',
            width: '100%',
            height: '100vh'

        }}>
            <FixedBackgroundDivVideo src={backgroundVideo} poster={backgroundVideoPoster} />
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle' columns={2}>
                <Grid.Column
                    widescreen={6}
                    largeScreen={6}
                    computer={8}
                    tablet={12}
                    mobile={14}
                >
                    <BlurryBox>
                        <Header as='h1'>
                            &quot;Dominate the Virtual Battlefield&quot;
                        </Header>
                        <p>
                            Welcome to CyberArena, the ultimate card game experience!
                            With stunning graphics and immersive gameplay, you&apos;ll feel like you&apos;ve stepped
                            right into the cyber world. Test your skills and strategy against players from all over the
                            world in this fast-paced, high-stakes card game. Challenge yourself to become a master of
                            CyberArena and prove your worth on the virtual battlefield! Are you ready for an
                            electrifying adventure? Play now and find out what CyberArena has to offer!
                        </p>
                        <PlayNowButtonRight />
                    </BlurryBox>
                </Grid.Column>
                <Grid.Column only='large screen'>
                    <Container textAlign='center'>
                        <Card number={190}
                            name={'First'}
                            subtypes={'basic v'}
                            supertype={'pokemon'}
                            rarity={'rare ultra'}
                            gallery={'false'}
                            style={{ maxWidth: '35vmin', margin: 'auto' }}

                            back_img={'/img/card_background_1.png'}
                            front_img={'http://localhost:8000/api/game/card/' + cardNumber.toString() + '/imagefull'}/>
                    </Container>
                </Grid.Column>
            </Grid>
        </div>
    )
}

/*

Loot Box System

Welcome to the CyberArena loot box system! Here you can find out more about the types of items you can get through our loot boxes, as well as any special promotions or events related to loot boxes.

Types of Items:

Common cards: These cards can be found in most loot boxes and can be used to build a wide range of decks.
Rare cards: These cards are harder to find, but can be powerful additions to your deck.
Epic cards: These are the most powerful cards in the game and can be hard to come by.
Cosmetic items: In addition to cards, you may also find cosmetic items in loot boxes, such as card backs and player avatars.
Special Promotions and Events:

Double drop rate: During certain events, the drop rate for rare and epic cards will be doubled, giving you a better chance of getting these powerful cards.
Special loot boxes: From time to time, we will offer special loot boxes with unique items not available in regular loot boxes. Keep an eye out for these limited-time offers!
Thank you for choosing CyberArena for all your card gaming needs. We hope you enjoy opening loot boxes and finding new cards to add to your collection.

 */
function SecondPartHomePage (): JSX.Element {
    /*
        Explain how work the game, the features, the cards,
     */
    return (
        <Segment basic
            style={{
                width: '100%',
                position: 'relative',
                marginTop: 0
            }}>
            <Container>
                <Grid columns={2} relaxed='very' stackable={true} reversed={'tablet computer'}
                    style={{ marginTop: '20px', marginBottom: '20px' }}>
                    <Grid.Column>
                        <Card number={190}
                              name={'First'}
                              subtypes={'basic v'}
                              supertype={'pokemon'}
                              rarity={'rare ultra'}
                              gallery={'false'}
                              style={{ maxWidth: '35vmin', margin: 'auto' }}

                              back_img={'/img/card_background_1.png'}
                              front_img={'http://localhost:8000/api/game/card/1/imagefull'}/>
                    </Grid.Column>
                    <Grid.Column>
                        <Container style={{ position: 'relative', top: '50%', transform: 'translateY(-50%)' }}>
                            <Header as='h2'>
                                Fight for glory!
                            </Header>
                            <p>
                                Enter the thrilling world of CyberArena, where strategy and skill determine your
                                victory.
                                Challenge yourself against players from around the world and see if you have what it
                                takes
                                to be crowned champion of the cyber arena! Join now and test your mettle in a digital
                                duel
                                that will push you to your limits.
                            </p>
                        </Container>
                    </Grid.Column>

                </Grid>

                <Divider hidden={true} clearing={true}/>

                <Grid columns={2} relaxed='very' stackable={true} style={{ marginTop: '20px', marginBottom: '20px' }}>
                    <Grid.Column>
                        <Card number={190}
                            name={'First'}
                            subtypes={'basic v'}
                            supertype={'pokemon'}
                            rarity={'rare ultra'}
                            gallery={'false'}
                            style={{ maxWidth: '35vmin', margin: 'auto' }}

                            back_img={'/img/card_background_1.png'}
                            front_img={'http://localhost:8000/api/game/card/2/imagefull'}/>
                    </Grid.Column>
                    <Grid.Column>
                        <Container style={{ position: 'relative', top: '50%', transform: 'translateY(-50%)' }}>
                            <Header as='h2'>
                                Collect cards and build your deck!
                            </Header>
                            <p>
                                Collect hundreds of incredible cards and build your deck to suit your play style. With
                                hundreds of cards to choose from, you can create a deck that is truly your own. Whether
                                you
                                prefer to play a fast-paced, aggressive deck or a more defensive, control deck,
                                you&apos;ll
                                find the cards you need to build the deck of your dreams.
                            </p>
                        </Container>
                    </Grid.Column>
                </Grid>
            </Container>
        </Segment>
    )
}

function ThirdPartHomePage (): JSX.Element {
    return (
        <FixedBackgroundDivImage src={background2}>
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle' columns={2}>
                <Grid.Column>
                </Grid.Column>
                <Grid.Column
                    widescreen={5}
                    largeScreen={5}
                    computer={7}
                    tablet={12}
                    mobile={14}
                >
                    <BlurryBox>
                        <Header as='h2'>
                            Discover the world of CyberArena!
                        </Header>
                        <p>
                            CyberArena take place in a futuristic world where humans and machines live side by side. The
                            world is
                            divided into four factions, each with their own unique play style. Choose your faction and
                            fight for
                            glory in the cyber arena!
                        </p>
                        <PlayNowButtonRight />
                    </BlurryBox>
                </Grid.Column>
            </Grid>
        </FixedBackgroundDivImage>
    )
}

const MediaSection = (): JSX.Element => {
    return (
        <div className="media-section">
            <Header as="h2">Check out our game</Header>
            <Grid columns={3}>
                <Grid.Column>
                    <Image src="/screenshots/screenshot1.png" alt="Screenshot of CyberArena gameplay"/>
                </Grid.Column>
                <Grid.Column>
                    <Image src="/screenshots/screenshot2.png" alt="Screenshot of CyberArena gameplay"/>
                </Grid.Column>
                <Grid.Column>
                    <Image src="/screenshots/screenshot3.png" alt="Screenshot of CyberArena gameplay"/>
                </Grid.Column>
            </Grid>
            <Header as="h3">Watch the trailer</Header>
            <Embed
                id="dQw4w9WgXcQ"
                placeholder="/trailer-thumbnail.png"
                source="youtube"
            />
        </div>
    )
}

function HomePage (): JSX.Element {
    return (
        <div style={{ paddingTop: '20px' }}>
            <FirstPartHomePage/>
            <SecondPartHomePage/>
            <ThirdPartHomePage/>
        </div>
    )
}

export default HomePage
