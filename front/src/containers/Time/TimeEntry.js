import React, { useState } from 'react';

import TimerIcon from '@material-ui/icons/Timer';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import { useTheme } from '@material-ui/core/styles';

import { getHoursFromSeconds, getMinutesFromSeconds } from 'utils/helpers/timeHelper';

// TODO: implement markdown support
function TimeEntryEmptyState(props) {
    const { id, projectName, description, time } = props;

    const [timerIsRunning, setTimerIsRunning] = useState(false);

    const theme = useTheme();

    const getEntryTime = () => {
        if (timerIsRunning) {
            return `${getHoursFromSeconds(time)}h ${getMinutesFromSeconds(time)}m 0s`; // TODO: implement real-time timer logic
        } else {
            return `${getHoursFromSeconds(time)}h ${getMinutesFromSeconds(time)}m`;
        }
    };

    // TODO: it should only be possible to active timer on one entry at a time
    const handleToggleTimer = () => {
        // TODO: implement db call with id
        setTimerIsRunning(!timerIsRunning);
    };

    return (
        <ListItem>
            <ListItemText
                primary={
                    <span>
                        {projectName} ·{' '}
                        <span style={{ color: timerIsRunning ? theme.palette.secondary.main : '' }}>
                            {getEntryTime()}
                        </span>
                    </span>
                }
                secondary={description}
                secondaryTypographyProps={{ style: { marginTop: theme.spacing(0.5) } }}
            />
            <ListItemSecondaryAction>
                <IconButton
                    color={timerIsRunning ? 'secondary' : 'default'}
                    edge="end"
                    aria-label="edit entry"
                    onClick={handleToggleTimer}
                >
                    <TimerIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
}

export default TimeEntryEmptyState;
