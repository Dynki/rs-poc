import React, { useEffect, useState, useRef } from 'react';
import { Switch } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { useAuth0 } from "../react-auth0-spa";

import clientFactory from '../utils/clientFactory';

import Drivers from './Drivers';
import Profile from './Profile';
import PrivateRoute from './PrivateRoute';

function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
}

const PostAuth = () => {
    const { getIdTokenClaims, loading } = useAuth0();
    const [ currentRole, setCurrentRole ] = useState(undefined);
    const previousRole = usePrevious(currentRole);
    const [client, setClient] = useState(undefined);
    const [token, setToken] = useState(null);
    
    // Store the token and create client if required.
    useEffect(() => {
        async function getToken() {
            const token =  await getIdTokenClaims();
            setToken(token);
            return token;
        }

        /**
         * Make a client if:
         *      A: No client exists.
         *      B: currentRole has changed.
         */        
        async function makeClient() {
            const token =  await getToken();

            if (token) {
                if (!client) {
                        const hasuraClaims = token['https://hasura.io/jwt/claims']; 
                        const defaultRole = hasuraClaims ? hasuraClaims['x-hasura-default-role'] : undefined;
                        setCurrentRole(defaultRole);

                        // Create client with role, if role is undefined 
                        // the 'x-hasura-default-role' on JWT token will be used by request.
                        setClient(clientFactory(token.__raw, defaultRole));
                } else {
                    if (previousRole !== currentRole) {
                        /**
                         * IMPORTANT: Clean up, otherwise memory leak.
                         *  
                         * */
                        client.stop();

                        // Create client with role, if role is undefined 
                        // the 'x-hasura-default-role' on JWT token will be used by request.
                        setClient(clientFactory(token.__raw, currentRole));
                    }
                }
            }
        }

        if (!loading) {
            makeClient();
        }
    }, [ currentRole, client, loading, token, getIdTokenClaims, previousRole ]);

    if (loading || !client) {
        return <div>Loading...</div>;
    }

    return (
        <ApolloProvider client={client}>
            <button onClick={() => setCurrentRole('user')}>As user</button>
            <button onClick={() => setCurrentRole('manager')}>As manager</button>
            <label>Current Role: {currentRole}</label>
            <Switch>
                <PrivateRoute path="/drivers" component={Drivers} />
                <PrivateRoute path="/profile" component={Profile} />
            </Switch>
        </ApolloProvider>
    )
}

export default PostAuth;
