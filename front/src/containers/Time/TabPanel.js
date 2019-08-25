import React from 'react';

import _ from 'lodash';

import List from '@material-ui/core/List';

import TimeEntry from './TimeEntry';
import TimeEntryEmptyState from './TimeEntryEmptyState';

function TabPanel(props) {
    const { timeEntries } = props;

    if (_.isEmpty(timeEntries)) {
        return <TimeEntryEmptyState />;
    }

    return (
        <List>
            {timeEntries.map(timeEntry => {
                return <TimeEntry key={timeEntry.id} {...timeEntry} />;
            })}
        </List>
    );
}

export default TabPanel;
