import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import AuthContext from './context/authContext';

test('renders home text', () => {
    const login = jest.fn();
    const logout = jest.fn();

    const { getByText } = render(
        <AuthContext.Provider value={{
            isAuthenticated: false,
            login,
            logout
        }}>
            <App />
        </AuthContext.Provider>
    );

    const linkElement = getByText(/home/i);
    expect(linkElement).toBeInTheDocument();
});
