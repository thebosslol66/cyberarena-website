import React from 'react'
import ReactDOM from 'react-dom/client'
import 'semantic-ui-less/semantic.less'
import './index.css'
import reportWebVitals from './reportWebVitals'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ProfileProvider } from './context/ProfileContext'

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
)

root.render(
    <BrowserRouter>
        <AuthProvider>
            <ProfileProvider>
                <App/>
            </ProfileProvider>
        </AuthProvider>
    </BrowserRouter>

)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log)
