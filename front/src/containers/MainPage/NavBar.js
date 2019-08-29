import React from 'react';
import { withRouter } from 'react-router-dom';

import { deepOrange } from '@material-ui/core/colors';
import MenuIcon from '@material-ui/icons/Menu';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { useTheme, makeStyles } from '@material-ui/core/styles';

import NightModeButton from './NightModeButton';

import { getLocationTitle } from 'navigation/locations';

const useStyles = makeStyles(theme => ({
    appBar: props => ({
        [theme.breakpoints.up('md')]: {
            width: `calc(100% - ${props.drawerWidth}px)`,
            marginLeft: props.drawerWidth
        }
    })
}));

function NavBar(props) {
    const { location, onDrawerToggle } = props;

    const theme = useTheme();
    const classes = useStyles(props);

    return (
        <AppBar id="appBar" position="static" className={classes.appBar}>
            <Toolbar style={{ backgroundColor: theme.palette.primary.dark }}>
                <Hidden mdUp>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        style={{ marginRight: theme.spacing(2) }}
                        onClick={onDrawerToggle}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        {getLocationTitle(location.pathname)}
                    </Typography>
                </Hidden>
                <Hidden smDown>
                    <Typography variant="h4" style={{ flexGrow: 1, fontSize: '1.5rem' }}>
                        <span style={{ color: deepOrange[500], fontWeight: 300 }}>Foxy</span> Time
                        <span style={{ color: deepOrange[500], fontWeight: 300 }}>Tracker</span>
                    </Typography>
                </Hidden>
                <NightModeButton />
            </Toolbar>
        </AppBar>
    );
}

export default withRouter(NavBar);
