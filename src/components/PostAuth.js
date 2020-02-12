import React, { useEffect, useState } from 'react';
import { Switch } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { useAuth0 } from "../react-auth0-spa";

import clientFactory from '../utils/clientFactory';

import Drivers from './Drivers';
import Profile from './Profile';
import PrivateRoute from './PrivateRoute';

const PostAuth = () => {
    const { getIdTokenClaims, loading } = useAuth0();
    const [client, setClient] = useState(undefined);
    const [token, setToken] = useState(null);
    
    useEffect(() => {
        async function getToken() {
            const token =  await getIdTokenClaims();
            setToken(token);
            if (!client) {
                if (token) {
                    console.log('call client gen', token.__raw)
                    setClient(clientFactory(token.__raw));
                }
            }
        }
        
        if (!loading) {
            getToken();
        }
    
    }, [client, loading, token, getIdTokenClaims]);

    if (loading || !client) {
        return <div>Loading...</div>;
    }

    return (
        <ApolloProvider client={client}>
            <Switch>
                <PrivateRoute path="/drivers" component={Drivers} />
                <PrivateRoute path="/profile" component={Profile} />
            </Switch>
        </ApolloProvider>
    )
}

export default PostAuth;