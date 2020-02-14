import React, { useContext, useEffect, useState, useRef } from 'react';
import { Switch } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';

import clientFactory from '../utils/clientFactory';

import Drivers from './Drivers';
import Profile from './Profile';
import PrivateRoute from './PrivateRoute';
import authContext from '../context/authContext';
import Vehicles from '../pages/Vehicles';

function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
}

const PostAuth = () => {
    // const { getIdTokenClaims, loading } = useAuth0();
    const { idToken, idTokenPayload } = useContext(authContext);

    const [ currentRole, setCurrentRole ] = useState(undefined);
    const previousRole = usePrevious(currentRole);
    const [client, setClient] = useState(undefined);
    
    // Store the token and create client if required.
    useEffect(() => {

        /**
         * Make a client if:
         *      A: No client exists.
         *      B: currentRole has changed.
         */        
        async function makeClient() {

            if (idToken) {
                if (!client) {
                        const hasuraClaims = idTokenPayload['https://hasura.io/jwt/claims']; 
                        const defaultRole = hasuraClaims ? hasuraClaims['x-hasura-default-role'] : undefined;
                        setCurrentRole(defaultRole);

                        // Create client with role, if role is undefined 
                        // the 'x-hasura-default-role' on JWT token will be used by request.
                        setClient(clientFactory(idToken, defaultRole));
                } else {
                    if (previousRole !== currentRole) {
                        /**
                         * IMPORTANT: Clean up, otherwise memory leak.
                         *  
                         * */
                        client.stop();

                        // Create client with role, if role is undefined 
                        // the 'x-hasura-default-role' on JWT token will be used by request.
                        setClient(clientFactory(idToken, currentRole));
                    }
                }
            }
        }

        makeClient();
    }, [ currentRole, client, idToken, idTokenPayload, previousRole ]);

    if (!client) {
        return <div>Loading...</div>;
    }

    return (
        <ApolloProvider client={client}>
            {/* <button onClick={() => setCurrentRole('user')}>As user</button>
            <button onClick={() => setCurrentRole('manager')}>As manager</button>
            <label>Current Role: {currentRole}</label> */}
            <Switch>
                <PrivateRoute path="/drivers" component={Drivers} />
                <PrivateRoute path="/vehicles" component={Vehicles} />
                <PrivateRoute path="/profile" component={Profile} />
            </Switch>
        </ApolloProvider>
    )
}

export default PostAuth;
