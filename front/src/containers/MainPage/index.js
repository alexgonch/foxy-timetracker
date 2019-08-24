import React, { useState } from 'react';

import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

import FullPageLoader from 'components/Loaders/FullPageLoader';
import NavBar from './NavBar';
import LeftDrawer from './LeftDrawer';
import AuthRoutes from 'navigation/AuthRoutes';

import { useDbUser, DbUserContext, useDbProjects, DbProjectsContext } from 'utils/firebase';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    routerBox: {
        [theme.breakpoints.up('md')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth
        }
    }
}));

function MainPage(props) {
    const classes = useStyles();

    const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
    const { userLoading, userError, user } = useDbUser();
    const { projectsLoading, projectsError, projects } = useDbProjects();

    function handleDrawerToggle() {
        setMobileDrawerOpen(!mobileDrawerOpen);
    }

    console.log('user', user); // DEBUG
    console.log('projects', projects); // DEBUG

    if (userLoading || projectsLoading) {
        return <FullPageLoader />;
    }

    return (
        <DbUserContext.Provider value={{ userLoading, userError, user }}>
            <DbProjectsContext.Provider value={{ projectsLoading, projectsError, projects }}>
                <Box height="100%">
                    <LeftDrawer
                        mobileOpen={mobileDrawerOpen}
                        drawerWidth={drawerWidth}
                        onDrawerToggle={handleDrawerToggle}
                    />
                    <NavBar drawerWidth={drawerWidth} onDrawerToggle={handleDrawerToggle} />
                    <Box className={classes.routerBox}>
                        <AuthRoutes />
                    </Box>
                </Box>
            </DbProjectsContext.Provider>
        </DbUserContext.Provider>
    );
}

export default MainPage;
