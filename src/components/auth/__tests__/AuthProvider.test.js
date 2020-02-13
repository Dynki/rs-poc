import React, { useContext, useDebugValue } from 'react';
import { render } from '@testing-library/react';
import AuthContext from '../../../context/authContext';
import AuthProvider from '../AuthProvider';

describe('AuthProvider', () => {
    it('should render children', () => {
        const { getByText } = render(
            <AuthProvider clientId={'C123'} domain={'D123'}>
                <div data-testid="authtest">Auth Test</div>
            </AuthProvider>
        );
    
        const linkElement = getByText(/Auth Test/i);
        expect(linkElement).toBeInTheDocument();
    });
    
    it('should display auth status', () => {
        const TestChild = () => {
            const { isAuthenticated } = useContext(AuthContext);
            return <label data-testid="authlabel">{isAuthenticated ? 'YES' : 'NO'}</label>
        }

        const { getByTestId } = render(
            <AuthProvider clientId={'C123'} domain={'D123'}>
                <TestChild/>
            </AuthProvider>
        );

        const element = getByTestId('authlabel');
        expect(element).toHaveTextContent('NO');
    });

    it('should call lock login', () => {
        const loginMock = jest.fn();

        const TestChild = () => {
            const { lock, login } = useContext(AuthContext);
            lock.show = loginMock;
            return <button data-testid="authctrl" onClick={() => login()}/>
        }

        const { getByTestId } = render(
            <AuthProvider clientId={'C123'} domain={'D123'}>
                <TestChild/>
            </AuthProvider>
        );

        const element = getByTestId('authctrl');
        element.click();
        expect(loginMock).toHaveBeenCalled();
    })


    it('should call lock logout', () => {
        const loginMock = jest.fn();

        const TestChild = () => {
            const { lock, logout } = useContext(AuthContext);
            lock.logout = loginMock;
            return <button data-testid="authctrl" onClick={() => logout()}/>
        }

        const { getByTestId } = render(
            <AuthProvider clientId={'C123'} domain={'D123'}>
                <TestChild/>
            </AuthProvider>
        );

        const element = getByTestId('authctrl');
        element.click();
        expect(loginMock).toHaveBeenCalled();
    })
})
