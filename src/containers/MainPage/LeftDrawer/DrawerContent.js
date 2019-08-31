import React, { useContext } from 'react';
import { withRouter, Link } from 'react-router-dom';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import CustomAvatar from 'components/extensions/CustomAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { useTheme } from '@material-ui/core/styles';

import Timer from './Timer';

import locations from 'navigation/locations';
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
                            {user.name[0].toUpperCase()}
                        </CustomAvatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={user.name}
                        secondary={<Timer />}
                        primaryTypographyProps={{ component: 'div', noWrap: true }}
                        secondaryTypographyProps={{ component: 'div' }}
                    />
                </ListItem>
            </List>
            <List style={{ width: drawerWidth }}>
                {locations.map(page => (
                    <ListItem
                        key={page.title}
                        button
                        selected={page.isSelected(location.pathname)}
                        component={Link}
                        to={page.to(location)}
                        onClick={onDrawerToggle}
                    >
                        <ListItemIcon>{page.icon}</ListItemIcon>
                        <ListItemText primary={page.title} />
                    </ListItem>
                ))}
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
