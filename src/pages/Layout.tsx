import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '../component/Menu/navbar'
import Footer from '../component/Menu/footer'
// Create the template in common for all pages

function Layout (): JSX.Element {
    const location = useLocation()
    return (
        <>
            {location.pathname !== '/game'
                ? (
                    <div className="flex-layout">
                        <div className="flex-layout-content">
                            <Navbar/>
                            <Outlet/>
                        </div>
                        <Footer/>
                    </div>
                )
                : (
                    <Outlet/>
                )
            }
        </>
    )
}

export default Layout
