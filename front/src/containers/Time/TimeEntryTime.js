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

	if (timerIsRunning) {
		return (
			<span style={spanStyle}>
				{getHoursFromSeconds(time)}h {getMinutesFromSeconds(time)}m 0s
			</span>
		);
	} else {
		return (
			<span style={spanStyle}>
				{getHoursFromSeconds(time)}h {getMinutesFromSeconds(time)}m
			</span>
		);
	}
}

export default TimeEntryTime;