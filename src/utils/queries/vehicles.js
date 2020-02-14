import gql from 'graphql-tag';

export const GET_VEHICLES = gql`
    {
        drivers {
            id
            name
        }
    }
`;
