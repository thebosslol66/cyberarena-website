import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../component/Menu/navbar'
import Footer from '../component/Menu/footer'

// Create the template in common for all pages

const Layout = (): JSX.Element => {
    return (
        <>
            <div className="flex-layout">
                <div className="flex-layout-content">
                    <Navbar/>
                    <Outlet/>
                </div>
                <Footer/>
            </div>
        </>
    )
}

export default Layout
