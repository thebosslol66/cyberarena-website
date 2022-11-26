import React from 'react'
import { render, screen, within } from '@testing-library/react'
import App from './App'
import { MemoryRouter } from 'react-router-dom'
import AuthContext, { AuthProvider } from './context/AuthContext'

// For functional tests

describe('Good nav bar links in page ', () => {
    function testNavbarLinkUnlogged (): void {
        const navbar = screen.getByTestId('navbar')

        expect(within(navbar).getByText('Home')).toBeInTheDocument()

        expect(within(navbar).getByText('Sign In')).toBeInTheDocument()
        expect(within(navbar).getByText('Sign Up')).toBeInTheDocument()

        expect(within(navbar).queryByText('Dashboard')).not.toBeInTheDocument()
        expect(within(navbar).queryByText('Sign Out')).not.toBeInTheDocument()
    }

    function testNavbarLinkLogged (): void {
        const navbar = screen.getByTestId('navbar')
        expect(within(navbar).getByText('Home')).toBeInTheDocument()

        expect(within(navbar).queryByText('Sign In')).not.toBeInTheDocument()
        expect(within(navbar).queryByText('Sign Up')).not.toBeInTheDocument()

        expect(within(navbar).getByText('Dashboard')).toBeInTheDocument()
        expect(within(navbar).getByText('Sign Out')).toBeInTheDocument()
    }

    test('Home page', async () => {
        render(<MemoryRouter initialEntries={['/']}>
            <AuthProvider>
                <App/>

            </AuthProvider>
        </MemoryRouter>)
        testNavbarLinkUnlogged()
    })

    test('Sign in page', async () => {
        render(
            <MemoryRouter initialEntries={['/signin']}>
                <AuthProvider>
                    <App/>

                </AuthProvider>
            </MemoryRouter>
        )
        testNavbarLinkUnlogged()
    })

    test('Sign up page', async () => {
        render(
            <MemoryRouter initialEntries={['/signup']}>
                <AuthProvider>
                    <App/>

                </AuthProvider>
            </MemoryRouter>
        )
        testNavbarLinkUnlogged()
    })

    test('Dashboard page', async () => {
        render(
            <MemoryRouter initialEntries={['/dashboard']}>
                <AuthContext.Provider value={{ isLogged: true, setIsLogged: () => {} }}>
                    <App/>
                </AuthContext.Provider>
            </MemoryRouter>
        )
        testNavbarLinkLogged()
    })
})
