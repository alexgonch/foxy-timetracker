import React, { useState } from 'react';

import moment from 'moment';

import SwipeableViews from 'react-swipeable-views';

import { DatePicker } from '@material-ui/pickers';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles } from '@material-ui/core/styles';

import TabLabel from './TabLabel';
import TabPanel from './TabPanel';

const useStyles = makeStyles(theme => ({
    muiTabsIndicator: props => ({
        backgroundColor: theme.light() ? theme.palette.primary.main : theme.palette.common.white,
        borderBottomLeftRadius: props.tabIndex === 0 ? theme.shape.borderRadius : 'initial',
        borderBottomRightRadius: props.tabIndex === 6 ? theme.shape.borderRadius : 'initial'
    }),
    muiTabRoot: {
        flexGrow: 1,
        minWidth: 'auto'
    },
    muiTabSelected: {
        color: theme.light() ? theme.palette.primary.main : theme.palette.common.white
    },
    paper: {
        marginTop: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            padding: theme.spacing(2)
        }
    }
}));

// TEMP
const timeEntries = [
    {
        id: 100,
        projectName: 'Foxy TimeTracker',
        time: 3600 * 1.5,
        description:
            'Here goes a fake description that everybody is so excited about. Cannot think of anything original. Lorem ipsum and whatever goes after. By the way, we need even more text here, so here it goes.'
    },
    {
        id: 200,
        projectName: 'Real-Time Doggity Map',
        time: 3600 * 2.75,
        description: 'Yet another fake text with not a lot of words in it.'
    }
];

function Time(props) {
    const [dateSelected, setDateSelected] = useState(new Date());
    const tabIndex = moment(dateSelected).isoWeekday() - 1;

    const classes = useStyles({ tabIndex });

    const handleTabChange = (event, newIndex) => {
        const newDateSelected = moment(dateSelected).add(newIndex - tabIndex, 'days');
        setDateSelected(newDateSelected);
    };

    // TODO: pull out Tabs into a custom Calendar component
    // TODO: make Tabs defined through a map of weekdays
    return (
        <Box p={2}>
            <Grid container justify="center">
                <Grid item xs={12} md={8} lg={6}>
                    <DatePicker
                        margin="normal"
                        label=""
                        format="dddd DD MMM"
                        value={dateSelected}
                        onChange={date => setDateSelected(date)}
                    />

                    <Paper>
                        <Tabs
                            classes={{ indicator: classes.muiTabsIndicator }}
                            // indicatorColor="primary"
                            // textColor="primary"
                            value={tabIndex}
                            onChange={handleTabChange}
                        >
                            <Tab
                                classes={{ root: classes.muiTabRoot, selected: classes.muiTabSelected }}
                                label={<TabLabel label="Monday" />}
                            />
                            <Tab
                                classes={{ root: classes.muiTabRoot, selected: classes.muiTabSelected }}
                                label={<TabLabel label="Tuesday" />}
                            />
                            <Tab
                                classes={{ root: classes.muiTabRoot, selected: classes.muiTabSelected }}
                                label={<TabLabel label="Wednesday" />}
                            />
                            <Tab
                                classes={{ root: classes.muiTabRoot, selected: classes.muiTabSelected }}
                                label={<TabLabel label="Thursday" />}
                            />
                            <Tab
                                classes={{ root: classes.muiTabRoot, selected: classes.muiTabSelected }}
                                label={<TabLabel label="Friday" />}
                            />
                            <Tab
                                classes={{ root: classes.muiTabRoot, selected: classes.muiTabSelected }}
                                label={<TabLabel label="Saturday" />}
                            />
                            <Tab
                                classes={{ root: classes.muiTabRoot, selected: classes.muiTabSelected }}
                                label={<TabLabel label="Sunday" />}
                            />
                        </Tabs>
                    </Paper>
                    <Paper className={classes.paper}>
                        <SwipeableViews index={tabIndex} onChangeIndex={newIndex => handleTabChange(null, newIndex)}>
                            <TabPanel value={tabIndex} index={0} timeEntries={[]} />
                            <TabPanel value={tabIndex} index={1} timeEntries={[]} />
                            <TabPanel value={tabIndex} index={2} timeEntries={[]} />
                            <TabPanel value={tabIndex} index={3} timeEntries={[]} />
                            <TabPanel value={tabIndex} index={4} timeEntries={[]} />
                            <TabPanel value={tabIndex} index={5} timeEntries={timeEntries} />
                            <TabPanel value={tabIndex} index={6} timeEntries={[]} />
                        </SwipeableViews>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Time;
