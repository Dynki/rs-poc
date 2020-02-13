import clientFactory from '../clientFactory';

import { getMainDefinition } from 'apollo-utilities';
import { gql } from 'apollo-boost';
// import ApolloClient from 'apollo-client';

// jest.mock('apollo-client');
jest.mock('apollo-utilities');

describe('ClientFactory', () => {
    it('should create new instance of Apollo client', () => {
        const token = '1234567890987654321';

        process.env.REACT_APP_REALTIME_GRAPHQL_URL = 'ws://testurl';
        const client = clientFactory(token);
        expect(client).toBeDefined();
    });

    it('should create new instance of Apollo client with role', () => {
        const token = '1234567890987654321';

        process.env.REACT_APP_REALTIME_GRAPHQL_URL = 'ws://testurl';
        const client = clientFactory(token, 'user');
        expect(client).toBeDefined();
    });


    it('should create new instance of Apollo links', () => {
        const token = '1234567890987654321';

        getMainDefinition.mockReturnValue({
            kind: 'OperationDefinition',
            operation: 'subscription'
        })

        const query = gql`
            {
                drivers {
                    id
                    name
                }
            }
        `;


        process.env.REACT_APP_REALTIME_GRAPHQL_URL = 'ws://testurl';
        const client = clientFactory(token);
        client.link.request(query);
        expect(client).toBeDefined();
    });
})
