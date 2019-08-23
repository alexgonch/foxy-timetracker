import React, { useState, useContext } from 'react';

import { blueGrey, deepOrange } from '@material-ui/core/colors';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';

import { FirebaseContext, useFirebaseAuthentication, useUser } from 'utils/firebase';
import { AuthUserContext, UserContext } from 'utils/session'; // TODO: need better naming for this directory
import { CustomSnackbarProvider } from 'components/CustomSnackbar';

import Multiplexer from 'navigation/Multiplexer';

const lightTheme = createMuiTheme({
    palette: {
        type: 'light',
        primary: {
            ...blueGrey,
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
            ...blueGrey,
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

// IDEA: global search bar

// TODO: implement universal loader and connect to all Firebase actions
// TODO: implement Auth-agnostic routes under navigation (ToS, Privacy, etc)
function App() {
    const firebase = useContext(FirebaseContext);
    const authUser = useFirebaseAuthentication(firebase);
    const { loading, error, user } = useUser(firebase); // TODO: what can we do with this error?

    const [theme, setTheme] = useState(lightTheme);
    const handleToggleNightMode = () => {
        theme.palette.type === 'light' ? setTheme(darkTheme) : setTheme(lightTheme);
    };
    theme.onToggleNightMode = handleToggleNightMode; // REVIEW: figure out a better way to encapsulate night mode logic

    console.log('theme', theme); // DEBUG
    console.log('authUser', authUser); // DEBUG
    console.log('user', user); // DEBUG

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AuthUserContext.Provider value={authUser}>
                <UserContext.Provider value={user}>
                    <CustomSnackbarProvider>
                        <Multiplexer authUser={authUser} loading={loading} user={user} />
                    </CustomSnackbarProvider>
                </UserContext.Provider>
            </AuthUserContext.Provider>
        </ThemeProvider>
    );
}

export default App;
