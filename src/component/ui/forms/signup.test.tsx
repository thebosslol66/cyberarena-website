import React from 'react'
import { act, fireEvent, render, screen } from '@testing-library/react'

import { MemoryRouter } from 'react-router-dom'

import SignUpForm from './signup'

jest.mock('../../../services/auth.service', () => {
    return {
        signup: async (username: string, email: string, password: string) => {
            if (username === 'test2' && email === 'test@test.com' && password === 'A1#aaaaa') {
                return await Promise.resolve({ status: 1, message: 'username already taken' })
            }
            if (username === 'test' && email === 'test2@test.com' && password === 'A1#aaaaa') {
                return await Promise.resolve({ status: 2, message: 'email already taken' })
            }
            if (username === 'test' && email === 'test@test.com' && password === 'A1#aaaaa') {
                return await Promise.resolve({ status: 0, message: '' })
            }
            if (username !== 'test' && email === 'test@test.com' && password === 'A1#aaaaa') {
                return await Promise.resolve({ status: 1, message: 'username already taken' })
            }
            if (username === 'test' && email !== 'test@test.com' && password === 'A1#aaaaa') {
                return await Promise.resolve({ status: 2, message: 'email already taken' })
            }
            if (username === 'test' && email === 'test@test.com' && password !== 'A1#aaaaa') {
                return await Promise.resolve({ status: 3, message: 'password is not strong enough' })
            }
            return await Promise.reject(Error('error'))
        }
    }
})

function renderSignUpForm (): void {
    render(
        <MemoryRouter>
            <SignUpForm/>
        </MemoryRouter>
    )
}

async function tryToSubmitForm (username: string, email: string, password: string, confirmPassword: string): Promise<void> {
    const usernameInput = screen.getByTestId('username-field')
    expect(usernameInput).toBeInTheDocument()
    const emailInput = screen.getByTestId('email-field')
    expect(emailInput).toBeInTheDocument()
    const passwordInput = screen.getByTestId('password-field')
    expect(passwordInput).toBeInTheDocument()
    const passwordConfirmInput = screen.getByTestId('password-confirm-field')
    expect(passwordConfirmInput).toBeInTheDocument()

    const submitButton = screen.getByTestId('submit-button')
    expect(submitButton).toBeInTheDocument()

    await act(() => {
        // for semantic ui component add childre because it add a div with the input inside
        fireEvent.change(usernameInput.children[0], { target: { value: username } })
        fireEvent.change(emailInput.children[0], { target: { value: email } })
        fireEvent.change(passwordInput.children[0], { target: { value: password } })
        fireEvent.change(passwordConfirmInput.children[0], { target: { value: confirmPassword } })
        fireEvent.click(submitButton)
    })
}

test('Correct registration', async () => {
    renderSignUpForm()

    await tryToSubmitForm('test', 'test@test.com', 'A1#aaaaa', 'A1#aaaaa')

    const error = screen.queryByTestId('error-signup-message')
    expect(error).toBeNull()
})

test('Minimum username length', async () => {
    renderSignUpForm()
    await tryToSubmitForm('a', 'test@test.com', 'A1#aaaaa', 'A1#aaaaa')

    const error = screen.queryByTestId('error-signup-message')
    expect(error).toBeInTheDocument()
})

describe('Password without ', () => {
    test('special character', async () => {
        renderSignUpForm()
        await tryToSubmitForm('test', 'test@test.com', 'A1aaaaaa', 'A1aaaaaa')

        const error = screen.queryByTestId('error-signup-message')
        expect(error).toBeInTheDocument()
    })

    test('number', async () => {
        renderSignUpForm()
        await tryToSubmitForm('test', 'test@test.com', 'Aa#aaaaa', 'Aa#aaaaa')

        const error = screen.queryByTestId('error-signup-message')
        expect(error).toBeInTheDocument()
    })

    test('uppercase', async () => {
        renderSignUpForm()
        await tryToSubmitForm('test', 'test@test.com', 'a1#aaaaa', 'a1#aaaaa')

        const error = screen.queryByTestId('error-signup-message')
        expect(error).toBeInTheDocument()
    })

    test('lowercase', async () => {
        renderSignUpForm()
        await tryToSubmitForm('test', 'test@test.com', 'A1#AAAAA', 'A1#AAAAA')

        const error = screen.queryByTestId('error-signup-message')
        expect(error).toBeInTheDocument()
    })

    test('minimum length', async () => {
        renderSignUpForm()
        await tryToSubmitForm('test', 'test@test.com', 'A1#aaaa', 'A1#aaaa')

        const error = screen.queryByTestId('error-signup-message')
        expect(error).toBeInTheDocument()
    })

    test('any caracters', async () => {
        renderSignUpForm()
        await tryToSubmitForm('test', 'test@test.com', '', '')

        const error = screen.queryByTestId('error-signup-message')
        expect(error).toBeInTheDocument()
    })
})

test('Password and confirm password not the same', async () => {
    renderSignUpForm()
    await tryToSubmitForm('test', 'test@test.com', 'A1#AAAAA', 'A1#AAAA')

    const error = screen.queryByTestId('error-signup-message')
    expect(error).toBeInTheDocument()
})

test('Username already taken', async () => {
    renderSignUpForm()
    await tryToSubmitForm('test2', 'test@test.com', 'A1#AAAAA', 'A1#AAAAA')

    const error = screen.queryByTestId('error-signup-message')
    expect(error).toBeInTheDocument()
})

test('Email already taken', async () => {
    renderSignUpForm()
    await tryToSubmitForm('test', 'test2@test.com', 'A1#AAAAA', 'A1#AAAAA')

    const error = screen.queryByTestId('error-signup-message')
    expect(error).toBeInTheDocument()
})
