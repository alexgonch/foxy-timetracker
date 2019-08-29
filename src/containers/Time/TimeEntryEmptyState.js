import React from 'react';

import TimerOffIcon from '@material-ui/icons/TimerOff';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { useTheme } from '@material-ui/core/styles';

function TimeEntryEmptyState(props) {
    const theme = useTheme();

    return (
        <Box display="flex" justifyContent="center" alignItems="center" p={4} color={theme.palette.text.secondary}>
            <Box textAlign="center">
                <TimerOffIcon />
                <Typography variant="body2">No time logged.</Typography>
            </Box>
        </Box>
    );
}

export default TimeEntryEmptyState;
