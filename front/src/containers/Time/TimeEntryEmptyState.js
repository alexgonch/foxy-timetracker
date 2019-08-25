import React from 'react';

import TimerIcon from '@material-ui/icons/Timer';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

// TODO: implement "new time entry" button
function TimeEntryEmptyState(props) {
    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100%">
            <Box textAlign="center">
                <TimerIcon />
                <Typography variant="body2">No time logged.</Typography>
            </Box>
        </Box>
    );
}

export default TimeEntryEmptyState;
