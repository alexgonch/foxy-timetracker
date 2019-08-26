import React, { useEffect } from 'react';

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
        marginTop: theme.spacing(2)
    }
}));

// TODO: define Sunday/Monday start day in user settings
const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

function Calendar(props) {
    const { timeEntries, dateSelected, setDateSelected } = props;

    const tabIndex = moment(dateSelected).isoWeekday() - 1;

    // FIXME BUG: go to Aug 25, then back to Aug 26 -> height is not updated
    let swipeableActions;
    useEffect(() => {
        // HACK: this effect listens for browser resize events and updates swipeable height whenever one is issued
        function updateSwipeableHeight() {
            swipeableActions.updateHeight();
        }

        window.addEventListener('resize', updateSwipeableHeight);
        return () => window.removeEventListener('resize', updateSwipeableHeight);
    }, [swipeableActions]);
    useEffect(() => {
        // HACK: this effect listens for timeEntries changes and issues a delayed swipeable height update when a change occurs
        console.log('Second effect is running');
        const timeout = setTimeout(() => (swipeableActions ? swipeableActions.updateHeight() : undefined), 0);
        return () => clearTimeout(timeout);
    }, [swipeableActions, timeEntries]);

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
                    animateHeight
                    index={tabIndex}
                    action={actions => {
                        swipeableActions = actions;
                    }}
                    onChangeIndex={newIndex => handleTabChange(null, newIndex)}
                >
                    {weekdays.map((weekday, index) => {
                        const date = parseInt(
                            moment(dateSelected)
                                .add(index - tabIndex, 'days')
                                .format('YYYYMMDD')
                        );
                        return (
                            <TabPanel
                                key={weekday}
                                value={tabIndex}
                                index={index}
                                timeEntries={timeEntries.filter(t => t.date === date)}
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
