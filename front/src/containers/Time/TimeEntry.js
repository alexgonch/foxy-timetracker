import React, { useState } from 'react';

import TimerIcon from '@material-ui/icons/Timer';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import { useTheme, makeStyles } from '@material-ui/core/styles';

import TimeEntryTime from './TimeEntryTime';
import ResponsiveDescription from './ResponsiveDescription';

const useStyles = makeStyles(theme => ({
    button: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            paddingLeft: theme.spacing(4),
            paddingRight: theme.spacing(4)
        }
    },
    secondaryAction: {
        paddingRight: 48 + 4 * 2,
        [theme.breakpoints.up('sm')]: {
            paddingRight: 48 + 4 * 2 + theme.spacing(2) + 12
        }
    },
    edgeEnd: {
        [theme.breakpoints.up('sm')]: {
            marginRight: 12
        }
    }
}));

function TimeEntry(props) {
    const { divider, id, project, description, time, onActionClick } = props;

    const [timerIsRunning, setTimerIsRunning] = useState(false);

    const theme = useTheme();
    const classes = useStyles();

    // TODO: it should only be possible to active timer on one entry at a time
    const handleToggleTimer = () => {
        // TODO: implement db call with id -> store in user
        // TODO: update swipeable height
        setTimerIsRunning(!timerIsRunning);
    };

    return (
        <ListItem
            classes={{ button: classes.button, secondaryAction: classes.secondaryAction }}
            divider={divider}
            button
            onClick={() => onActionClick(id)}
        >
            <ListItemText
                primary={
                    <span>
                        {project.name} · <TimeEntryTime timerIsRunning={timerIsRunning} time={time} />
                    </span>
                }
                secondary={<ResponsiveDescription text={description} />}
                secondaryTypographyProps={{ style: { marginTop: theme.spacing(0.5) } }}
            />
            <ListItemSecondaryAction>
                <IconButton
                    classes={{ edgeEnd: classes.edgeEnd }}
                    color={timerIsRunning ? 'secondary' : 'default'}
                    edge="end"
                    aria-label="start timer on entry"
                    onClick={handleToggleTimer}
                >
                    <TimerIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
}

export default TimeEntry;
