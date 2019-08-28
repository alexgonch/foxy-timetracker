import React from 'react';

import Typography from '@material-ui/core/Typography';
import { useTheme } from '@material-ui/core/styles';

import useTimer from 'utils/hooks/useTimer';

function Timer(props) {
    const theme = useTheme();

    const { timerValueFormatted, timerIsRunning } = useTimer();

    return (
        <Typography variant="body2" color="textSecondary">
            Timer:{' '}
            <span style={{ color: timerIsRunning ? theme.palette.secondary.main : null }}>{timerValueFormatted}</span>
        </Typography>
    );
}

export default Timer;
