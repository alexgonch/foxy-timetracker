import React from 'react';

import { useTheme } from '@material-ui/core/styles';

import { getPaddedHoursMinutesSeconds } from 'utils/helpers/timeHelper';

function TimeEntryTime(props) {
    const { timerIsRunning, timerValue, time } = props;

    const theme = useTheme();

    const spanStyle = {
        display: 'inline-block',
        color: timerIsRunning ? theme.palette.secondary.main : ''
    };

    if (timerIsRunning) {
        const { hours, minutes, seconds } = getPaddedHoursMinutesSeconds(time + timerValue);

        return (
            <span style={spanStyle}>
                {hours}h {minutes}m {seconds}s
            </span>
        );
    } else {
        const { hours, minutes } = getPaddedHoursMinutesSeconds(time);

        return (
            <span style={spanStyle}>
                {hours}h {minutes}m
            </span>
        );
    }
}

export default TimeEntryTime;
