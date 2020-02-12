import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useAuth0 } from "./react-auth0-spa";

import history from './utils/history';
import Landing from './pages/Landing';

import NavBar from './components/NavBar';
import PrivateRoute from './components/PrivateRoute';
import PostAuth from './components/PostAuth';

const App = () => {
    const { loading } = useAuth0();

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Router history={history}>
            <header>
                <NavBar />
            </header>
            <Switch>
                <Route path="/" exact component={Landing} />
                <PrivateRoute path="/" component={PostAuth} />
            </Switch>
        </Router>
    )
}

export default App;