import React from 'react'
import { Button, Container, Grid, Header } from 'semantic-ui-react'
import background from '../assets/background/testreact.jpg'
import Card from '../component/ui/Card/card'
import { Link } from 'react-router-dom'

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

function FirstPartHomePage (): JSX.Element {
    return (
        <div style={{
            background: `url(${background}) no-repeat center center fixed`,
            backgroundSize: 'cover',
            width: '100vw',
            height: '100vh',
            position: 'relative'
        }}>
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle' columns={2} >
                <Grid.Column
                    style={{
                        padding: '5px 10px 5px 10px',
                        borderRadius: '10px',
                        backgroundColor: 'rgba(255, 255, 255, 0.5)'
                    }}
                    widescreen={6}
                    largeScreen={6}
                    computer={8}
                    tablet={12}
                    mobile={14}
                >
                    <Container textAlign='left'>
                        <Header as='h1'>
                            Welcome to CyberArena traveller!
                        </Header>
                        <p>
                            Welcome to CyberArena, the ultimate card game experience!
                            With stunning graphics and immersive gameplay, you&apos;ll feel like you&apos;ve stepped right into the cyber world. Test your skills and strategy against players from all over the world in this fast-paced, high-stakes card game. Challenge yourself to become a master of CyberArena and prove your worth on the virtual battlefield! Are you ready for an electrifying adventure? Play now and find out what CyberArena has to offer!
                        </p>
                        <Button
                            primary={ true }
                            content='Play Now'
                            icon='play'
                            labelPosition='right'
                            floated={ 'right' }
                            as={ Link }
                            to={ '/dashboard' }
                        />
                    </Container>
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

                            back_img={'https://images.pokemontcg.io/base1/1_hires.png'}
                            front_img={'https://images.pokemontcg.io/base1/1_hires.png'}/>
                    </Container>
                </Grid.Column>
            </Grid>
        </div>
    )
}

function HomePage (): JSX.Element {
    return (
        <>
            <FirstPartHomePage/>
        </>
    )
}

export default HomePage
