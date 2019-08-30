import React, { useState } from 'react';

import moment from 'moment';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

import { blueGrey, deepOrange } from '@material-ui/core/colors';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';

import { useFirebaseAuth, AuthUserContext } from 'utils/firebase';
import { CustomSnackbarProvider } from 'components/extensions/CustomSnackbar';

import Multiplexer from 'navigation/Multiplexer';

moment.updateLocale('en', {
    week: {
        dow: 1 // first day of the week is Monday
    }
});

const lightTheme = createMuiTheme({
    palette: {
        type: 'light',
        primary: blueGrey,
        secondary: {
            ...deepOrange,
            light: deepOrange[300],
            main: deepOrange[500],
            dark: deepOrange[700]
        }
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
        primary: blueGrey,
        secondary: {
            ...deepOrange,
            light: deepOrange[300],
            main: deepOrange[500],
            dark: deepOrange[700]
        }
    },
    typography: {
        h6: {
            fontWeight: 400
        }
    }
});

// IDEA: global search bar
// IDEA: multi-lang support

// TODO: implement Timer Context
// TODO: implement Auth-agnostic routes under navigation (ToS, Privacy, etc)
function App() {
    const { authUserLoading, authUser } = useFirebaseAuth();

    const [theme, setTheme] = useState(getInitialTheme(lightTheme, darkTheme)); // TODO: encapsulate outside of App.js

    theme.toggleNightMode = () => {
        if (theme.light()) {
            setTheme(darkTheme);
            localStorage['theme'] = 'dark';
        } else {
            setTheme(lightTheme);
            localStorage['theme'] = 'light';
        }
    };

    theme.light = () => {
        return theme.palette.type === 'light';
    };

    console.log('theme', theme); // DEBUG
    // console.log('authUserLoading', authUserLoading); // DEBUG
    // console.log('authUser', authUser); // DEBUG

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <MuiPickersUtilsProvider utils={MomentUtils}>
                <AuthUserContext.Provider value={{ authUserLoading, authUser }}>
                    <CustomSnackbarProvider>
                        <Multiplexer />
                    </CustomSnackbarProvider>
                </AuthUserContext.Provider>
            </MuiPickersUtilsProvider>
        </ThemeProvider>
    );
}

export default App;

function getInitialTheme(lightTheme, darkTheme) {
    const localTheme = localStorage['theme'];
    if (localTheme) {
        if (localTheme === 'light') {
            return lightTheme;
        } else {
            return darkTheme;
        }
    } else {
        // Default
        return lightTheme;
    }
}
