import React, { useState, useMemo } from 'react';

import _ from 'lodash';

import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

import FullPageLoader from 'components/loaders/FullPageLoader';
import NavBar from './NavBar';
import LeftDrawer from './LeftDrawer';
import AuthRoutes from 'navigation/AuthRoutes';

import {
    useDbUser,
    DbUserContext,
    useDbProjects,
    DbProjectsContext,
    useDbTimeEntries,
    DbTimeEntriesContext
} from 'utils/firebase';

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
    const { timeEntriesLoading, timeEntriesError, timeEntries } = useDbTimeEntries();

    const handleDrawerToggle = () => {
        setMobileDrawerOpen(!mobileDrawerOpen);
    };

    console.log('user', user); // DEBUG
    console.log('projects', projects); // DEBUG
    console.log('timeEntries', timeEntries); // DEBUG

    const activeProjects = useMemo(() => _.filter(projects, p => !p.archived), [projects]);
    const activeProjectsExist = !_.isEmpty(activeProjects);

    if (userLoading || projectsLoading || timeEntriesLoading) {
        return <FullPageLoader />;
    }

    return (
        <DbUserContext.Provider value={{ userLoading, userError, user }}>
            <DbProjectsContext.Provider value={{ projectsLoading, projectsError, projects }}>
                <DbTimeEntriesContext.Provider value={{ timeEntriesLoading, timeEntriesError, timeEntries }}>
                    <Box height="100%">
                        <LeftDrawer
                            mobileOpen={mobileDrawerOpen}
                            drawerWidth={drawerWidth}
                            onDrawerToggle={handleDrawerToggle}
                        />
                        <NavBar drawerWidth={drawerWidth} onDrawerToggle={handleDrawerToggle} />
                        <Box className={classes.routerBox}>
                            <AuthRoutes activeProjectsExist={activeProjectsExist} />
                        </Box>
                    </Box>
                </DbTimeEntriesContext.Provider>
            </DbProjectsContext.Provider>
        </DbUserContext.Provider>
    );
}

export default MainPage;
