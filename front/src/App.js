import React from 'react';

import blueGrey from '@material-ui/core/colors/blueGrey';
import deepOrange from '@material-ui/core/colors/deepOrange';

import NoSsr from '@material-ui/core/NoSsr';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider  } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';

import LandingPage from 'containers/LandingPage/LandingPage';

const theme = createMuiTheme({
    palette: {
        primary: {
            light: blueGrey[500],
            main: blueGrey[700],
            dark: blueGrey[900],
            contrastText: '#fff'
        },
        secondary: deepOrange
    }
});

function App() {
    console.log('theme', theme);
    
    return (
        <NoSsr>
            <CssBaseline />
            <ThemeProvider theme={theme}>
                <LandingPage />
            </ThemeProvider>
        </NoSsr>
    );
}

export default App;
