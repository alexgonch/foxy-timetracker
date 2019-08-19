import React, { useState, useReducer, useContext } from 'react';

import { blueGrey, deepOrange } from '@material-ui/core/colors';

import NoSsr from '@material-ui/core/NoSsr';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';

import { FirebaseContext, useFirebaseAuthentication } from 'utils/firebase';
import { AuthUserContext } from 'utils/session';
import CustomSnackbar, { CustomSnackbarContext } from 'components/CustomSnackbar';

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

    // TODO: rework customSnackbar to use reducer hook and encapsulate logic under components/CustomSnackbar
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [variant, setVariant] = useState('success');

    const handleClose = () => {
        setOpen(false);
    };

    const customSnackbar = {
        success: message => {
            setOpen(true);
            setMessage(message);
            setVariant('success');
        },
        error: message => {
            setOpen(true);
            setMessage(message);
            setVariant('error');
        }
    };

    return (
        <NoSsr>
            <CssBaseline />
            <ThemeProvider theme={theme}>
                <AuthUserContext.Provider value={authUser}>
                    <CustomSnackbarContext.Provider value={customSnackbar}>
                        <Navigation />
                        <CustomSnackbar open={open} message={message} variant={variant} onClose={handleClose} />
                    </CustomSnackbarContext.Provider>
                </AuthUserContext.Provider>
            </ThemeProvider>
        </NoSsr>
    );
}

export default App;
