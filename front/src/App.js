import React, { useContext } from 'react';

import blueGrey from '@material-ui/core/colors/blueGrey';
import deepOrange from '@material-ui/core/colors/deepOrange';

import NoSsr from '@material-ui/core/NoSsr';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';

import { FirebaseContext, useFirebaseAuthentication } from 'utils/firebase';
import { AuthUserContext } from 'utils/session';

import Navigation from './Navigation';

const theme = createMuiTheme({
    palette: {
        primary: {
            light: blueGrey[500],
            main: blueGrey[700],
            dark: blueGrey[900],
            contrastText: '#fff'
        },
        secondary: deepOrange
    },
    typography: {
        h6: {
            fontWeight: 400
        }
    }
});

function App() {
    const firebase = useContext(FirebaseContext);
    const authUser = useFirebaseAuthentication(firebase);
    
    console.log('theme', theme); // DEBUG
    console.log('authUser', authUser); // DEBUG

    return (
        <NoSsr>
            <CssBaseline />
            <ThemeProvider theme={theme}>
                <AuthUserContext.Provider value={authUser}>
                    <Navigation />
                </AuthUserContext.Provider>
            </ThemeProvider>
        </NoSsr>
    );
}

export default App;
