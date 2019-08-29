import React from 'react';

import _ from 'lodash';

import List from '@material-ui/core/List';

import TimeEntry from './TimeEntry';
import TimeEntryEmptyState from './TimeEntryEmptyState';

function TabPanel(props) {
    const { timeEntries, onActionClick } = props;
    
    if (_.isEmpty(timeEntries)) {
        return <TimeEntryEmptyState />;
    }

    return (
        <List disablePadding>
            {_.orderBy(timeEntries, t => t.created_at.toDate(), 'asc').map((timeEntry, index) => {
                return <TimeEntry key={timeEntry.id} divider={index < timeEntries.length - 1} {...timeEntry} onActionClick={onActionClick} />;
            })}
        </List>
    );
}

export default TabPanel;
