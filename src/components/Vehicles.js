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

const Vehicles = () => {
    const { loading, error, data } = useQuery(GET_DRIVERS);

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
  
    return (
        <div>
            {data.drivers.map(d => {
                return <div key={d.id}>{d.name}</div>
            })}
        </div>
    )
}

export default Vehicles;