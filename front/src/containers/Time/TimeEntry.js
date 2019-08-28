import React, { useContext } from 'react';

import TimerIcon from '@material-ui/icons/Timer';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import { useTheme, makeStyles } from '@material-ui/core/styles';

import TimeEntryTime from './TimeEntryTime';
import ResponsiveDescription from './ResponsiveDescription';

// TODO: extend db with common API calls
import firebase, { db } from 'utils/firebase';
import { CustomSnackbarContext } from 'components/extensions/CustomSnackbar';

import useTimer from 'utils/hooks/useTimer';

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

    const theme = useTheme();
    const classes = useStyles();

    const customSnackbar = useContext(CustomSnackbarContext);

    const { timerIsRunning, timerRef, timerValue } = useTimer();

    const handleToggleTimer = () => {
        if (timerIsRunning) {
            db.collection('users')
                .doc(firebase.auth().currentUser.uid)
                .update({
                    timer_date: null,
                    timer_ref: null
                })
                .catch(error => {
                    customSnackbar.error('An error has happened. Please try again.');
                    console.error(error);
                });

            db.collection('time_entries')
                .doc(id)
                .update({
                    time: time + timerValue
                })
                .catch(error => {
                    customSnackbar.error('An error has happened. Please try again.');
                    console.error(error);
                });

            if (timerRef.id !== id) {
                const timeEntryRef = db.collection('time_entries').doc(id);

                db.collection('users')
                    .doc(firebase.auth().currentUser.uid)
                    .update({
                        timer_date: new Date(),
                        timer_ref: timeEntryRef
                    })
                    .catch(error => {
                        customSnackbar.error('An error has happened. Please try again.');
                        console.error(error);
                    });
            }
        } else {
            const timeEntryRef = db.collection('time_entries').doc(id);

            db.collection('users')
                .doc(firebase.auth().currentUser.uid)
                .update({
                    timer_date: new Date(),
                    timer_ref: timeEntryRef
                })
                .catch(error => {
                    customSnackbar.error('An error has happened. Please try again.');
                    console.error(error);
                });
        }
    };

    const thisTimerIsRunning = timerIsRunning && timerRef.id === id;

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
                        {project.name} ·{' '}
                        <TimeEntryTime timerIsRunning={thisTimerIsRunning} timerValue={timerValue} time={time} />
                    </span>
                }
                secondary={<ResponsiveDescription text={description} />}
                secondaryTypographyProps={{ style: { marginTop: theme.spacing(0.5) } }}
            />
            <ListItemSecondaryAction>
                <IconButton
                    classes={{ edgeEnd: classes.edgeEnd }}
                    color={thisTimerIsRunning ? 'secondary' : 'default'}
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
