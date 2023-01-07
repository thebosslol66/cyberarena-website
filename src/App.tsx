import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Layout from './pages/Layout'
import HomePage from './pages/home'
import SigninPage from './pages/signin'
import SignupPage from './pages/signup'
import RequireLoginRoutes from './pages/RequireLoginRoutes'
import DashboardPage from './pages/dashboard'
import SignoutPage from './pages/signout'
import ThemingLayout from './pages/theming'
import NoPage from './pages/NoPage'
import PrivacyPolicyPage from './pages/privacyPolicy'
import AboutUsPage from './pages/aboutUs'

function App (): JSX.Element {
    return (
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
                <Route path='aboutus' element={<AboutUsPage/>}/>
                <Route path='privacypolicy' element={<PrivacyPolicyPage/>}/>
                <Route path="*" element={<NoPage/>}/>
            </Route>
        </Routes>
    )
}

export default App
