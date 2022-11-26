import React from 'react'
import ReactDOM from 'react-dom/client'
import 'semantic-ui-less/semantic.less'
import './index.css'
import reportWebVitals from './reportWebVitals'

import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Layout from './pages/Layout'
import HomePage from './pages/home'
import SigninPage from './pages/signin'
import SignupPage from './pages/signup'
import NoPage from './pages/NoPage'
import DashboardPage from './pages/dashboard'
import SignoutPage from './pages/signout'
import ThemingLayout from './pages/theming'
import { AuthProvider } from './context/AuthContext'
import RequireLoginRoutes from './pages/RequireLoginRoutes'

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
)

root.render(
    <React.StrictMode>
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout/>}>
                        <Route index element={<HomePage/>}/>
                        <Route path="signin" element={<SigninPage/>}/>
                        <Route path="signup" element={<SignupPage/>}/>
                        <Route element={<RequireLoginRoutes/>}>
                            <Route path="dashboard" element={<DashboardPage/>}/>
                            <Route path="signout" element={<SignoutPage/>}/>
                        </Route>
                        {process.env.NODE_ENV === 'development' && <Route path="theming" element={<ThemingLayout/>}/>}
                        <Route path="*" element={<NoPage/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log)
