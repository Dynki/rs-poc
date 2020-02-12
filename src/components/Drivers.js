import React from 'react';

import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const GET_DRIVERS = gql`
    {
        drivers {
            id
            name
        }
    }
`;

const Drivers = () => {
    const { loading, error, data } = useQuery(GET_DRIVERS);

    console.log('Render drivers');

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
  
    console.log('Render drivers data', data);
    return (
        <div>
            {data.drivers.map(d => {
                return <div key={d.id}>{d.name}</div>
            })}
        </div>
    )
}

export default Drivers;