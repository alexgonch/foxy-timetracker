import React, { useState, useContext } from 'react';

import { blueGrey, deepOrange } from '@material-ui/core/colors';

import NoSsr from '@material-ui/core/NoSsr';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';

import { FirebaseContext, useFirebaseAuthentication } from 'utils/firebase';
import { AuthUserContext } from 'utils/session';
import { CustomSnackbarProvider } from 'components/CustomSnackbar';

import Multiplexer from 'navigation/Multiplexer';

const lightTheme = createMuiTheme({
    palette: {
        type: 'light',
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

const darkTheme = createMuiTheme({
    palette: {
        type: 'dark',
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

// TODO: implement universal loader and connect to all Firebase actions
function App() {
    const firebase = useContext(FirebaseContext);
    const authUser = useFirebaseAuthentication(firebase);

    const [theme, setTheme] = useState(lightTheme);
    const handleToggleNightMode = () => {
        theme.palette.type === 'light' ? setTheme(darkTheme) : setTheme(lightTheme);
    };
    theme.onToggleNightMode = handleToggleNightMode; // REVIEW: figure out a better way to encapsulate night mode logic

    console.log('theme', theme); // DEBUG
    console.log('authUser', authUser); // DEBUG

    return (
        <NoSsr>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <AuthUserContext.Provider value={authUser}>
                    <CustomSnackbarProvider>
                        <Multiplexer />
                    </CustomSnackbarProvider>
                </AuthUserContext.Provider>
            </ThemeProvider>
        </NoSsr>
    );
}

export default App;
