import React, { useContext } from 'react';
import { withRouter, Link } from 'react-router-dom';

import FaceIcon from '@material-ui/icons/Face';
import HomeIcon from '@material-ui/icons/Home';
import ScheduleIcon from '@material-ui/icons/Schedule';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { useTheme } from '@material-ui/core/styles';

import { FirebaseContext } from 'utils/firebase';

function DrawerContent(props) {
    const { location, drawerWidth, onDrawerToggle } = props;
	
	const theme = useTheme();
	const firebase = useContext(FirebaseContext);

    return (
        <>
            <List style={{ width: drawerWidth }}>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar style={{ backgroundColor: theme.palette.secondary[500] }}>
                            <FaceIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="John Doe" secondary="Freelancer" />
                </ListItem>
            </List>
            <List style={{ width: drawerWidth }}>
                <ListItem button selected={location.pathname === '/'} component={Link} to={'/'} onClick={onDrawerToggle}>
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                </ListItem>
                <ListItem button selected={location.pathname === '/activities'} component={Link} to={'/activities'} onClick={onDrawerToggle}>
                    <ListItemIcon>
                        <ScheduleIcon />
                    </ListItemIcon>
                    <ListItemText primary="Activities" />
                </ListItem>
                <ListItem button selected={location.pathname === '/account'} component={Link} to={'/account'} onClick={onDrawerToggle}>
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
