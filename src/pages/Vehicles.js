import React from 'react';
import { Typography } from '@material-ui/core';

import ListVehicles from '../components/vehicles/ListVehicles';
import { GET_VEHICLES } from '../utils/queries/vehicles';
import { useQuery } from '@apollo/react-hooks';

const Vehicles = () => {

    const { loading, error, data } = useQuery(GET_VEHICLES);

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    return (
        <React.Fragment>
            <Typography variant="overline">management</Typography>
            <Typography variant="h5">Vehicles</Typography>
            <ListVehicles 
                data={data.drivers} 
            />
        </React.Fragment>
    )
}

export default Vehicles
