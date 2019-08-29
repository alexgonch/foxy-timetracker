import React, { useState } from 'react';

import moment from 'moment';
import _ from 'lodash';

import SwipeableViews from 'resources/temp_packages/SwipeableViews';

import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles } from '@material-ui/core/styles';

import TabLabel from './TabLabel';
import TabPanel from './TabPanel';
import NewTimeEntry from './NewTimeEntry';
import TimeEntryDialog from './TimeEntryDialog';

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
    
    const [timeEntryDialogOpen, setTimeEntryDialogOpen] = useState(false);
    const [timeEntrySelectedId, setTimeEntrySelectedId] = useState(null);

    const tabIndex = moment(dateSelected).isoWeekday() - 1;

    const classes = useStyles({ tabIndex });
    
    const handleTabChange = (event, newIndex) => {
        const newDateSelected = moment(dateSelected).add(newIndex - tabIndex, 'days');
        setDateSelected(newDateSelected);
    };
    
    const handleCreateTimeEntry = () => {
        setTimeEntryDialogOpen(true);
        setTimeEntrySelectedId(null);
    };

    const handleEditTimeEntry = id => {
        setTimeEntryDialogOpen(true);
        setTimeEntrySelectedId(id);
    };
    
    const timeEntrySelected = _.find(timeEntries, t => t.id === timeEntrySelectedId);
    
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
                                onActionClick={handleEditTimeEntry}
                            />
                        );
                    })}
                </SwipeableViews>
            </Paper>

            <NewTimeEntry onActionClick={handleCreateTimeEntry} />
            
            <TimeEntryDialog
                open={timeEntryDialogOpen}
                timeEntry={timeEntrySelected}
                dateSelected={dateSelected}
                onClose={() => setTimeEntryDialogOpen(false)}
            />
        </>
    );
}

export default Calendar;
