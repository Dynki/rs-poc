import React, { useReducer } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import history from './utils/history';
import Landing from './pages/Landing';

import NavBar from './components/NavBar';
import PrivateRoute from './components/PrivateRoute';
import PostAuth from './components/PostAuth';
import drawerReducer from './utils/reducers/AppReducer';
import AppContext from './context/appContext';
import PersistentDrawerLeft from './components/layout/PersistentDrawerLeft';

const useStyles = makeStyles(theme => ({
    content: {
        marginTop: '90px',
        marginLeft: '100px' 
    }
}));

const App = () => {
    const classes = useStyles();
    const [appState, dispatch] = useReducer(drawerReducer, { opened: false });

    return (
        <Router history={history}>
            <AppContext.Provider value={{ appState, dispatch }}>
                <header>
                    <NavBar />
                    <PersistentDrawerLeft/>
                </header>
                <main className={classes.content}>
                    <Switch>
                        <Route path="/" exact component={Landing} />
                        <PrivateRoute path="/" component={PostAuth} />
                    </Switch>
                </main>
            </AppContext.Provider>
        </Router>
    )
}

export default App;
