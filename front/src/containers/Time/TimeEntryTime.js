import React from 'react';

import { useTheme } from '@material-ui/core/styles';

import { getHoursFromSeconds, getMinutesFromSeconds } from 'utils/helpers/timeHelper';

function TimeEntryTime(props) {
    const { timerIsRunning, time } = props;

    const theme = useTheme();

    const spanStyle = {
        display: 'inline-block',
        color: timerIsRunning ? theme.palette.secondary.main : ''
    };

    const hours = getHoursFromSeconds(time);
    const minutes = getMinutesFromSeconds(time)
        .toString()
        .padStart(2, 0);
    const seconds = (0).toString().padStart(2, 0);

    if (timerIsRunning) {
        return (
            <span style={spanStyle}>
                {hours}h {minutes}m {seconds}s
            </span>
        );
    } else {
        return (
            <span style={spanStyle}>
                {hours}h {minutes}m
            </span>
        );
    }
}

export default TimeEntryTime;
