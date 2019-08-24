import React, { useState } from 'react';

import { blueGrey, deepOrange } from '@material-ui/core/colors';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';

import { useFirebaseAuth, AuthUserContext } from 'utils/firebase';
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
    const { authUserLoading, authUser } = useFirebaseAuth();

    const [theme, setTheme] = useState(lightTheme);
    const handleToggleNightMode = () => {
        theme.palette.type === 'light' ? setTheme(darkTheme) : setTheme(lightTheme);
    };
    theme.onToggleNightMode = handleToggleNightMode; // REVIEW: figure out a better way to encapsulate night mode logic

    console.log('theme', theme); // DEBUG
    // console.log('authUserLoading', authUserLoading); // DEBUG
    console.log('authUser', authUser); // DEBUG

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AuthUserContext.Provider value={{ authUserLoading, authUser }}>
                <CustomSnackbarProvider>
                    <Multiplexer />
                </CustomSnackbarProvider>
            </AuthUserContext.Provider>
        </ThemeProvider>
    );
}

export default App;
