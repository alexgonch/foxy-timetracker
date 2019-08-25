import React, { useContext } from 'react';
import { withRouter, Link } from 'react-router-dom';

import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import WorkIcon from '@material-ui/icons/Work';
import TimerIcon from '@material-ui/icons/Timer';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import CustomAvatar from 'components/extensions/CustomAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { useTheme } from '@material-ui/core/styles';

import firebase, { DbUserContext } from 'utils/firebase';

function DrawerContent(props) {
    const { location, drawerWidth, onDrawerToggle } = props;

    const theme = useTheme();

    const { user } = useContext(DbUserContext);

    return (
        <>
            <List style={{ width: drawerWidth }}>
                <ListItem>
                    <ListItemAvatar>
                        <CustomAvatar>
                            <PermContactCalendarIcon />
                        </CustomAvatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={user.name}
                        secondary="Freelancer"
                        primaryTypographyProps={{ noWrap: true, component: 'p' }}
                        secondaryTypographyProps={{ noWrap: true }}
                    />
                </ListItem>
            </List>
            <List style={{ width: drawerWidth }}>
                <ListItem
                    button
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
                    selected={location.pathname.startsWith('/time')}
                    component={Link}
                    to={'/time'}
                    onClick={onDrawerToggle}
                >
                    <ListItemIcon>
                        <TimerIcon />
                    </ListItemIcon>
                    <ListItemText primary="Time" />
                </ListItem>
                <ListItem
                    button
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
                <ListItem button style={{ marginTop: theme.spacing(2) }} onClick={() => firebase.auth().signOut()}>
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
