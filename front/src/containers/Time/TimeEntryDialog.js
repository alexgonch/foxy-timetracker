import React, { useContext, useMemo } from 'react';

import _ from 'lodash';
import moment from 'moment';

import Box from '@material-ui/core/Box';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogTitleWithMenu from 'components/extensions/DialogTitleWithMenu';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import ButtonWithProgress from 'components/extensions/ButtonWithProgress';
import { useTheme, makeStyles } from '@material-ui/core/styles';

import { Formik, Form } from 'formik';

import { timeEntrySchema } from 'utils/validationSchemas';
import { getInitialValues, getSelectableProjects } from './functions';
import { CustomSnackbarContext } from 'components/extensions/CustomSnackbar';
import { InProgressContext } from 'utils/contexts/InProgressContext';

// TODO: extend db with common API calls
import firebase, { db, DbUserContext, DbProjectsContext } from 'utils/firebase';

const useStyles = makeStyles(theme => ({
    selectIcon: {
        right: 6
    }
}));

function TimeEntryDialog(props) {
    const { open, timeEntry, dateSelected, onClose } = props;

    const updateMode = !_.isNil(timeEntry);

    const theme = useTheme();
    const classes = useStyles();

    const customSnackbar = useContext(CustomSnackbarContext);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [deleteConfirmationDialogOpen, setDeleteConfirmationDialogOpen] = React.useState(false);

    const [, setInProgress] = useContext(InProgressContext);
    const { user } = useContext(DbUserContext);
    const { projects } = useContext(DbProjectsContext);
    const projectsSelectable = useMemo(() => getSelectableProjects(timeEntry, projects), [timeEntry, projects]);

    const thisTimerIsRunning = !_.isNil(user.timer_date) && user.timer_ref.id === _.get(timeEntry, 'id', null);

    // TODO: we could make a Menu context to reuse across the entire app
    const handleMore = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMore = () => {
        setAnchorEl(null);
    };

    const handleDelete = () => {
        setInProgress(true);

        db.collection('time_entries')
            .doc(timeEntry.id)
            .delete()
            .then(() => {
                customSnackbar.success('Time entry deleted.');
                setDeleteConfirmationDialogOpen(false);
                setAnchorEl(null);
                onClose();
            })
            .catch(error => {
                customSnackbar.error('An error has happened. Please try again.');
                console.error(error);
            })
            .finally(() => setInProgress(false));
    };

    const handleSubmit = (values, { setSubmitting }) => {
        setInProgress(true);

        if (updateMode) {
            const projectRef = db.collection('projects').doc(values.project_uid);

            db.collection('time_entries')
                .doc(timeEntry.id)
                .update({
                    description: values.description,
                    time: values.hours * 3600 + values.minutes * 60,
                    project_uid: projectRef
                })
                .then(() => {
                    onClose();
                })
                .catch(error => {
                    customSnackbar.error('An error has happened. Please try again.');
                    console.error(error);
                })
                .finally(() => setInProgress(false));
        } else {
            const currentUserRef = db.collection('users').doc(firebase.auth().currentUser.uid);
            const projectRef = db.collection('projects').doc(values.project_uid);

            db.collection('time_entries')
                .add({
                    created_at: new Date(), // used for sorting
                    date: parseInt(moment(dateSelected).format('YYYYMMDD')),
                    description: values.description,
                    time: values.hours * 3600 + values.minutes * 60,
                    project_uid: projectRef,
                    owner_uid: currentUserRef
                })
                .then(() => {
                    onClose();
                })
                .catch(error => {
                    customSnackbar.error('An error has happened. Please try again.');
                    console.error(error);
                })
                .finally(() => setInProgress(false));
        }
    };

    return (
        <>
            <Dialog
                fullWidth
                open={open && !deleteConfirmationDialogOpen}
                aria-labelledby="time-entry-dialog"
                onClose={onClose}
            >
                <Formik
                    initialValues={getInitialValues(timeEntry)}
                    validationSchema={timeEntrySchema}
                    onSubmit={handleSubmit}
                >
                    {({ values, errors, isSubmitting, handleChange, handleBlur, setFieldValue, submitForm }) => (
                        <>
                            {updateMode ? (
                                <DialogTitleWithMenu title="Update time entry" onMore={handleMore}>
                                    <Menu
                                        anchorEl={anchorEl}
                                        keepMounted
                                        open={Boolean(anchorEl)}
                                        onClose={handleCloseMore}
                                    >
                                        <MenuItem button={!thisTimerIsRunning} onClick={thisTimerIsRunning ? () => undefined : handleDelete}>
                                            <Typography
                                                variant="inherit"
                                                style={{
                                                    paddingRight: theme.spacing(2),
                                                    color: thisTimerIsRunning
                                                        ? theme.palette.text.disabled
                                                        : theme.palette.error.main
                                                }}
                                            >
                                                Delete
                                            </Typography>
                                        </MenuItem>
                                    </Menu>
                                </DialogTitleWithMenu>
                            ) : (
                                <DialogTitle>New time entry</DialogTitle>
                            )}

                            <DialogContent>
                                <Form>
                                    <TextField
                                        select
                                        fullWidth
                                        variant="outlined"
                                        name="project_uid"
                                        label="Project"
                                        value={values.project_uid}
                                        style={{ marginTop: theme.spacing(1) }}
                                        onChange={handleChange}
                                        SelectProps={{
                                            classes: {
                                                icon: classes.selectIcon
                                            }
                                        }}
                                    >
                                        {projectsSelectable.map(project => (
                                            <MenuItem key={project.id} value={project.id}>
                                                {project.name}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                    <TextField
                                        multiline
                                        fullWidth
                                        variant="outlined"
                                        name="description"
                                        label="Description"
                                        value={values.description}
                                        error={!_.isEmpty(errors.description)}
                                        helperText={errors.description}
                                        style={{ marginTop: theme.spacing(2) }}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    <Box display="flex">
                                        <TextField
                                            disabled={thisTimerIsRunning}
                                            type="number"
                                            variant="outlined"
                                            name="hours"
                                            label="Hours"
                                            value={parseInt(values.hours || 0).toString()}
                                            error={!_.isEmpty(errors.hours)}
                                            helperText={errors.hours}
                                            style={{
                                                width: '50%',
                                                marginRight: theme.spacing(1),
                                                marginTop: theme.spacing(2)
                                            }}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        <TextField
                                            disabled={thisTimerIsRunning}
                                            type="number"
                                            variant="outlined"
                                            name="minutes"
                                            label="Minutes"
                                            value={parseInt(values.minutes || 0).toString()}
                                            error={!_.isEmpty(errors.minutes)}
                                            helperText={errors.minutes}
                                            style={{
                                                width: '50%',
                                                marginLeft: theme.spacing(1),
                                                marginTop: theme.spacing(2)
                                            }}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                    </Box>
                                    {thisTimerIsRunning && (
                                        <Typography
                                            variant="body2"
                                            color="error"
                                            style={{ marginTop: theme.spacing(1) }}
                                        >
                                            Editing is limited while timer is running.
                                        </Typography>
                                    )}
                                </Form>
                            </DialogContent>
                            <DialogActions>
                                <ButtonWithProgress color="secondary" onClick={submitForm}>
                                    {updateMode ? 'Update' : 'Create'}
                                </ButtonWithProgress>
                            </DialogActions>
                        </>
                    )}
                </Formik>
            </Dialog>
        </>
    );
}

export default TimeEntryDialog;
