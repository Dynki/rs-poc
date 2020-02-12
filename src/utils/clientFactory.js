import ApolloClient from 'apollo-client';
// Setup the network "links"
import { WebSocketLink } from 'apollo-link-ws';
import { HttpLink } from 'apollo-link-http';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { GRAPHQL_URL, REALTIME_GRAPHQL_URL } from './constants';

const client = (token, role) => {

    const getHeaders = token => {
        const headers = {};
        if (token) {
            headers.Authorization = `Bearer ${token}`;

            /**
             * If you change the x-hasura-role header, in the client request, 
             * it will make the request with that role, overwriting whatever was 
             * set in the token (x-hasura-default-role), as long as the role
             * is in x-hasura-allowed-roles array
             */
            if (role) {
                headers['x-hasura-role'] = role;
            }
        }

        return headers;
    };

    const wsLink = token => {
        return new WebSocketLink({
            connectionParams: () => {
                return { headers: getHeaders(token) }
            },
            uri: REALTIME_GRAPHQL_URL,
            options: {
                reconnect: true
            }
        });
    }

    const httpLink = token => {
        return new HttpLink({
            uri: GRAPHQL_URL,
            headers: getHeaders(token)
        });
    }

    const link = split(
        // split based on operation type
        ({ query }) => {
            const { kind, operation } = getMainDefinition(query);
            return kind === 'OperationDefinition' && operation === 'subscription';
        },
        wsLink(token),
        httpLink(token),
    )

    let client = new ApolloClient({
        link,
        cache: new InMemoryCache()
    });

    return client;
}

export default client;
