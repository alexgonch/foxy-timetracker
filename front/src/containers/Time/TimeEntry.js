import React, { useState } from 'react';

import LinesEllipsis from 'react-lines-ellipsis';
import responsiveHOC from 'react-lines-ellipsis/lib/responsiveHOC';

import TimerIcon from '@material-ui/icons/Timer';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import { useTheme, makeStyles } from '@material-ui/core/styles';

import TimeEntryTime from './TimeEntryTime';

const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis);

const useStyles = makeStyles(theme => ({
    divider: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2)
    },
    secondaryAction: {
        paddingRight: 60
    }
}));

// TODO: implement markdown support
function TimeEntry(props) {
    const { divider, /*id,*/ projectName, description, time } = props;

    const [timerIsRunning, setTimerIsRunning] = useState(false);

    const theme = useTheme();
    const classes = useStyles();

    // TODO: it should only be possible to active timer on one entry at a time
    const handleToggleTimer = () => {
        // TODO: implement db call with id
        setTimerIsRunning(!timerIsRunning);
    };

    return (
        <ListItem classes={{ divider: classes.divider, secondaryAction: classes.secondaryAction }} divider={divider}>
            <ListItemText
                primary={
                    <span>
                        {projectName} · <TimeEntryTime timerIsRunning={timerIsRunning} time={time} />
                    </span>
                }
                secondary={
                    <ResponsiveEllipsis text={description} maxLine={3} ellipsis="..." trimRight basedOn="letters" />
                }
                secondaryTypographyProps={{ component: 'div', style: { marginTop: theme.spacing(0.5) } }}
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

export default TimeEntry;
