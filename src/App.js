import React, { useReducer } from 'react';
import clsx from 'clsx';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import history from './utils/history';
import Landing from './pages/Landing';
import { withAuth } from './components/auth/withAuth';

import NavBar from './components/NavBar';
import PrivateRoute from './components/PrivateRoute';
import PostAuth from './components/PostAuth';
import drawerReducer from './utils/reducers/AppReducer';
import AppContext from './context/appContext';
import PersistentDrawerLeft from './components/layout/PersistentDrawerLeft';

const useStyles = makeStyles(theme => ({
    content: {
        marginTop: '80px',
        marginLeft: '90px',
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        width: `calc(100% - 120px)`,
    },
    contentShift: {
        marginLeft: '270px',
        width: `calc(100% - 299px)`,
    },
    unauthenticatedShift: {
        marginLeft: '20px',
    }
}));

const App = ({ auth }) => {
    const classes = useStyles();
    const [appState, dispatch] = useReducer(drawerReducer, { opened: false });

    return (
        <Router history={history}>
            <AppContext.Provider value={{ appState, dispatch }}>
                <header>
                    <NavBar />
                    {auth.isAuthenticated && <PersistentDrawerLeft/>}
                </header>
                <main className={clsx(classes.content, {
                    [classes.contentShift]: appState.drawerOpen,
                    [classes.unauthenticatedShift]: !auth.isAuthenticated, 
                })}>
                    <Switch>
                        <Route path="/" exact component={Landing} />
                        <PrivateRoute path="/" component={PostAuth} />
                    </Switch>
                </main>
            </AppContext.Provider>
        </Router>
    )
}

export default withAuth(App);
