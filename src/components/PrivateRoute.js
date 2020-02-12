import React, { useContext } from "react";
import { withRouter } from 'react-router-dom';
import { Route } from "react-router-dom";
import authContext from '../context/authContext';

const PrivateRoute = ({ component: Component, history, path, ...rest }) => {
    const { isAuthenticated } = useContext(authContext);

    // useEffect(() => {
    //     if (loading || isAuthenticated) {
    //         return;
    //     }
    // }, [loading, isAuthenticated]);

    const render = props =>
        isAuthenticated === true ? <Component {...props} /> : history.push('/');

    return <Route path={path} render={render} {...rest} />;
};

export default withRouter(PrivateRoute);