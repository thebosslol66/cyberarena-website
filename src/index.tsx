import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Background from './component/Menu/Background'
import reportWebVitals from './reportWebVitals'
import Card from './component/ui/Card/card'

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
)

root.render(
    <React.StrictMode>
        <Background/>

        <Card number={190}
            name={'First'}
            subtypes={'basic v'}
            supertype={'pokémon'}
            rarity={'rare ultra'}
            gallery={'false'}
            styles={{ }}

            back_img={'https://images.pokemontcg.io/base1/1_hires.png'}
            front_img={'https://images.pokemontcg.io/base1/1_hires.png'}/>

    </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
