import React, { useContext } from 'react';
import { withRouter, Link } from 'react-router-dom';

import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import WorkIcon from '@material-ui/icons/Work';
import AccessAlarmsIcon from '@material-ui/icons/AccessAlarms';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { useTheme, makeStyles } from '@material-ui/core/styles';

import { FirebaseContext } from 'utils/firebase';

const useStyles = makeStyles(theme => ({
    selected: {
        borderRight: `4px solid ${theme.palette.secondary.light}`
    }
}));

function DrawerContent(props) {
    const { location, drawerWidth, onDrawerToggle } = props;

    const theme = useTheme();
    const classes = useStyles();
    const firebase = useContext(FirebaseContext);

    return (
        <>
            <List style={{ width: drawerWidth }}>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar style={{ backgroundColor: theme.palette.secondary[500] }}>
                            <PermContactCalendarIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary="John Doe"
                        secondary="Freelancer"
                        primaryTypographyProps={{ noWrap: true, component: 'p' }}
                        secondaryTypographyProps={{ noWrap: true }}
                    />
                </ListItem>
            </List>
            <List style={{ width: drawerWidth }}>
                <ListItem
                    button
                    classes={{ selected: classes.selected }}
                    selected={location.pathname === '/'}
                    component={Link}
                    to={'/'}
                    onClick={onDrawerToggle}
                >
                    <ListItemIcon>
                        <WorkIcon />
                    </ListItemIcon>
                    <ListItemText primary="Projects" />
                </ListItem>
                <ListItem
                    button
                    classes={{ selected: classes.selected }}
                    selected={location.pathname === '/time'}
                    component={Link}
                    to={'/time'}
                    onClick={onDrawerToggle}
                >
                    <ListItemIcon>
                        <AccessAlarmsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Time" />
                </ListItem>
                <ListItem
                    button
                    classes={{ selected: classes.selected }}
                    selected={location.pathname === '/account'}
                    component={Link}
                    to={'/account'}
                    onClick={onDrawerToggle}
                >
                    <ListItemIcon>
                        <PersonIcon />
                    </ListItemIcon>
                    <ListItemText primary="Account" />
                </ListItem>
                <ListItem button style={{ marginTop: theme.spacing(2) }} onClick={firebase.doSignOut}>
                    <ListItemIcon>
                        <ExitToAppIcon />
                    </ListItemIcon>
                    <ListItemText primary="Sign out" />
                </ListItem>
            </List>
        </>
    );
}

export default withRouter(DrawerContent);
