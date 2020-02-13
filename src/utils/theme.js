import React from 'react';
import { MuiThemeProvider, createMuiTheme, CssBaseline } from '@material-ui/core'
import { blue } from '@material-ui/core/colors';

export default (props) => {

    const theme = createMuiTheme({
        direction: 'ltr',
        palette: {
            primary: blue,
            secondary: {
                main: '#96F321',
            },
            type: 'light',
            header: {
                main: "#e8e8e8",
                secondary: "#f3f3f3"
            }
        },
        overrides: {
            MuiSnackbarContent: {
                root: {
                    color: "#fff"
                }
            }
        }
    });

    return <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {props.children}
    </MuiThemeProvider>
}