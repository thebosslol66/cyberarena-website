import { act, fireEvent, screen, render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import SignInForm from './signin'
import React from 'react'
import AuthContext from '../../../context/AuthContext'

jest.mock('../../../services/auth.service', () => {
    return {
        signin: async (username: string, password: string) => {
            if (username === 'test' && password === 'A1#aaaaa') {
                return await Promise.resolve({ status: 200 })
            }
            if (username === 'test2' && password === 'A1#aaaaa') {
                // eslint-disable-next-line @typescript-eslint/no-throw-literal
                throw { response: { data: { detail: 'Incorrect username or password' } } }
            }
            // eslint-disable-next-line @typescript-eslint/no-throw-literal
            throw { response: { data: { detail: 'error' } } }
        }
    }
})

var mockRedirect: jest.Mock

jest.mock('react-router-dom', () => {
    mockRedirect = jest.fn(() => {})
    return ({
        ...jest.requireActual('react-router-dom'),
        redirect: mockRedirect
    })
})

// before all test reset mock
beforeEach(() => {
    mockRedirect.mockReset()
})

function renderSignInForm (): void {
    let isLogged = false
    const setIsLogged = (value: boolean): void => { isLogged = value }
    render(
        <AuthContext.Provider value={{ isLogged, setIsLogged }}>
            <MemoryRouter>
                <SignInForm/>
            </MemoryRouter>
        </AuthContext.Provider>
    )
}

async function tryToSubmitForm (username: string, password: string): Promise<void> {
    const usernameInput = screen.getByTestId('username-field')
    expect(usernameInput).toBeInTheDocument()
    const passwordInput = screen.getByTestId('password-field')
    expect(passwordInput).toBeInTheDocument()

    const submitButton = screen.getByTestId('submit-button')
    expect(submitButton).toBeInTheDocument()

    await act(() => {
        // for semantic ui component add childre because it add a div with the input inside
        fireEvent.change(usernameInput.children[0], { target: { value: username } })
        fireEvent.change(passwordInput.children[0], { target: { value: password } })
        fireEvent.click(submitButton)
    })
}

it('should render the form', () => {
    renderSignInForm()
    const usernameInput = screen.getByTestId('username-field')
    expect(usernameInput).toBeInTheDocument()
    const passwordInput = screen.getByTestId('password-field')
    expect(passwordInput).toBeInTheDocument()
    const submitButton = screen.getByTestId('submit-button')
    expect(submitButton).toBeInTheDocument()
})

it('should login successfully', async () => {
    renderSignInForm()
    await tryToSubmitForm('test', 'A1#aaaaa')
    expect(mockRedirect).toHaveBeenCalledWith('/dashboard')
})

it('should not login successfully', async () => {
    renderSignInForm()
    await tryToSubmitForm('test2', 'A1#aaaaa')
    expect(mockRedirect).toHaveBeenCalledTimes(0)
})

it('should produce an http error', async () => {
    renderSignInForm()
    await tryToSubmitForm('test3', 'A1#aaaaa')
    expect(mockRedirect).toHaveBeenCalledTimes(0)
})
