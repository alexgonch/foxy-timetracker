import React, { useState } from 'react';

import moment from 'moment';

import SwipeableViews from 'react-swipeable-views';

import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles } from '@material-ui/core/styles';

import TabLabel from './TabLabel';
import TabPanel from './TabPanel';
import NewTimeEntry from './NewTimeEntry';

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

// TODO: define Sunday/Monday start day in user settings
const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

function Calendar(props) {
    const { timeEntries, dateSelected, setDateSelected } = props;

    const tabIndex = moment(dateSelected).isoWeekday() - 1;

    // let swipeableActions;
    // useEffect(() => {
    //     function updateSwipeableHeight() {
    //         swipeableActions.updateHeight();
    //         console.log('*** RESIZED ***');
    //     }
    //
    //     window.addEventListener('resize', updateSwipeableHeight);
    //     return () => window.removeEventListener('resize', updateSwipeableHeight);
    // }, [swipeableActions]);

    const classes = useStyles({ tabIndex });

    const handleTabChange = (event, newIndex) => {
        const newDateSelected = moment(dateSelected).add(newIndex - tabIndex, 'days');
        setDateSelected(newDateSelected);
    };

    return (
        <>
            <Paper>
                <Tabs classes={{ indicator: classes.muiTabsIndicator }} value={tabIndex} onChange={handleTabChange}>
                    {weekdays.map(weekday => (
                        <Tab
							key={weekday}
                            classes={{ root: classes.muiTabRoot, selected: classes.muiTabSelected }}
                            label={<TabLabel label={weekday} />}
                        />
                    ))}
                </Tabs>
            </Paper>
            <Paper className={classes.paper}>
                <SwipeableViews
                    // animateHeight
                    index={tabIndex}
                    // action={actions => {
                    //     swipeableActions = actions;
                    // }}
                    onChangeIndex={newIndex => handleTabChange(null, newIndex)}
                >
                    {weekdays.map((weekday, index) => {
                        const dateString = moment(dateSelected)
                            .add(index - tabIndex, 'days')
                            .format('YYYYMMDD');
                        return (
                            <TabPanel
								key={weekday}
                                value={tabIndex}
                                index={index}
                                timeEntries={timeEntries.filter(t => t.date === dateString)}
                            />
                        );
                    })}
                </SwipeableViews>
            </Paper>

            <NewTimeEntry />
        </>
    );
}

export default Calendar;
