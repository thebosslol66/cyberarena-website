import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../component/Menu/navbar'

// Create the template in common for all pages

const Layout = (): JSX.Element => {
    return (
        <>
            <Navbar/>
            <Outlet/>
        </>
    )
}

export default Layout
