import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withTheme } from '@material-ui/core/styles';

import SignOutButton from 'components/SignOutButton';
import { ReactComponent as FoxLogo } from 'resources/images/fox.svg';

function NavBar(props) {
    const { theme } = props;

    return (
        <AppBar position="static">
            <Toolbar>
                <FoxLogo width={32} />
                <Typography variant="h6" style={{ flexGrow: 1, marginLeft: theme.spacing(2) }}>
                    Foxy TimeTracker
                </Typography>
                <SignOutButton color="inherit" />
            </Toolbar>
        </AppBar>
    );
}

export default withTheme(NavBar);
