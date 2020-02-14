import React, { useContext } from "react";
import authContext from '../context/authContext';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { actions } from '../utils/reducers/AppReducer';
import appContext from '../context/appContext';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
    },
}));

const NavBar = () => {
    const { isAuthenticated, login, logout } = useContext(authContext);
    const classes = useStyles();

    const { appState, dispatch } = useContext(appContext);

    const openMenu = () => {
        dispatch({ type: actions.OPEN_DRAWER });
    }

    return (
        <div className={classes.root}>
            <AppBar 
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: appState.drawerOpen,
                })}
            >
                <Toolbar>
                    {isAuthenticated && !appState.drawerOpen && (
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={() => openMenu()}>
                            <MenuIcon />
                        </IconButton>
                    )}
                    <Typography variant="h6" className={classes.title}>
                        RS Connect
                    </Typography>
                    {!isAuthenticated && <Button onClick={() => login({})} color="inherit">Log In</Button>}
                    {isAuthenticated && <Button onClick={() => logout({})} color="inherit">Log Out</Button>}
                </Toolbar>
            </AppBar>
        </div>

        // <div>
        //     {!isAuthenticated && (
        //         <button onClick={() => login({})}>Log in</button>
        //     )}

        //     {isAuthenticated && <button onClick={() => logout()}>Log out</button>}

        //     {isAuthenticated && (
        //         <span>
        //             <Link to="/">Home</Link>&nbsp;
        //             <Link to="/profile">Profile</Link>&nbsp;
        //             <Link to="/drivers">Drivers</Link>
        //         </span>
        //     )}
        // </div>
    );
};

export default NavBar;
