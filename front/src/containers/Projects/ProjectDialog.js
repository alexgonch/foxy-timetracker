import React, { useState, useContext } from 'react';

import _ from 'lodash';

import AddCircleIcon from '@material-ui/icons/AddCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogTitleWithMenu from 'components/extensions/DialogTitleWithMenu';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Chip from '@material-ui/core/Chip';
import ButtonWithProgress from 'components/extensions/ButtonWithProgress';
import { useTheme } from '@material-ui/core/styles';

import { Formik, Form } from 'formik';

import { projectSchema } from 'utils/validationSchemas';
import { getInitialValues } from './functions';
import { CustomSnackbarContext } from 'components/extensions/CustomSnackbar';
import { InProgressContext } from 'utils/contexts/InProgressContext';

import ConfirmationDialog from 'components/dialogs/ConfirmationDialog';

// TODO: extend db with common API calls
import firebase, { db } from 'utils/firebase';

// TODO: if we carry on with tags, we should implement an Autocomplete for tags input
function ProjectDialog(props) {
    const { open, project, onClose } = props;

    const updateMode = !_.isNil(project);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [deleteConfirmationDialogOpen, setDeleteConfirmationDialogOpen] = React.useState(false);
    const [tags, setTags] = useState(!_.isNil(project) ? project.tags : []); // TEMP: will be ignored for now
    const [, setInProgress] = useContext(InProgressContext);

    const theme = useTheme();
    const customSnackbar = useContext(CustomSnackbarContext);

    // TODO: we could make a Menu context to reuse across the entire app
    const handleMore = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMore = () => {
        setAnchorEl(null);
    };

    const handleArchive = () => {
        setInProgress(true);

        db.collection('projects')
            .doc(project.id)
            .update({
                archived: true
            })
            .then(() => {
                customSnackbar.success('Project archived.');
                setAnchorEl(null);
                onClose();
            })
            .catch(error => {
                customSnackbar.error('An error has happened. Please try again.');
            })
            .finally(() => setInProgress(false));
    };

    const handleReactivate = () => {
        setInProgress(true);

        db.collection('projects')
            .doc(project.id)
            .update({
                archived: false
            })
            .then(() => {
                customSnackbar.success('Project reactivated.');
                setAnchorEl(null);
                onClose();
            })
            .catch(error => {
                customSnackbar.error('An error has happened. Please try again.');
            })
            .finally(() => setInProgress(false));
    };

    const handleDelete = () => {
        setInProgress(true);

        db.collection('projects')
            .doc(project.id)
            .delete()
            .then(() => {
                customSnackbar.success('Project deleted.');
                setDeleteConfirmationDialogOpen(false);
                setAnchorEl(null);
                onClose();
            })
            .catch(error => {
                customSnackbar.error('An error has happened. Please try again.');
            })
            .finally(() => setInProgress(false));
    };

    const handleAddTag = tag => {
        if (!tag) return;

        setTags([...tags, ...tag.split(',').map(tag => tag.replace(/\s+/g, ' ').trim())]); // remove extra spaces
    };

    const handleRemoveTag = tag => {
        setTags(_.without(tags, tag));
    };

    const handleSubmit = (values, { setSubmitting }) => {
        setInProgress(true);

        if (updateMode) {
            db.collection('projects')
                .doc(project.id)
                .update({
                    name: values.name
                })
                .then(() => {
                    customSnackbar.success('Project updated.');
                    onClose();
                })
                .catch(error => {
                    customSnackbar.error('An error has happened. Please try again.');
                })
                .finally(() => setInProgress(false));
        } else {
            const currentUserRef = db.collection('users').doc(firebase.auth().currentUser.uid); // TODO: abstract it away along with db extensions

            db.collection('projects')
                .add({
                    archived: false,
                    created_at: new Date(), // REVIEW
                    name: values.name,
                    owner_uid: currentUserRef,
                    total_time: 0
                })
                .then(() => {
                    customSnackbar.success('Project created.');
                    onClose();
                })
                .catch(error => {
                    customSnackbar.error('An error has happened. Please try again.');
                })
                .finally(() => setInProgress(false));
        }
    };

    return (
        <>
            <Dialog
                fullWidth
                open={open && !deleteConfirmationDialogOpen}
                aria-labelledby="project-dialog"
                onClose={onClose}
            >
                <Formik
                    initialValues={getInitialValues(project)}
                    validationSchema={projectSchema}
                    onSubmit={handleSubmit}
                >
                    {({ values, errors, isSubmitting, handleChange, handleBlur, setFieldValue, submitForm }) => (
                        <>
                            {updateMode ? (
                                <DialogTitleWithMenu title="Update project" onMore={handleMore}>
                                    <Menu
                                        anchorEl={anchorEl}
                                        keepMounted
                                        open={Boolean(anchorEl)}
                                        onClose={handleCloseMore}
                                    >
                                        {project.archived ? (
                                            <MenuItem onClick={handleReactivate}>
                                                <Typography
                                                    variant="inherit"
                                                    style={{ paddingRight: theme.spacing(2) }}
                                                >
                                                    Reactivate
                                                </Typography>
                                            </MenuItem>
                                        ) : (
                                            <MenuItem onClick={handleArchive}>
                                                <Typography
                                                    variant="inherit"
                                                    style={{ paddingRight: theme.spacing(2) }}
                                                >
                                                    Archive
                                                </Typography>
                                            </MenuItem>
                                        )}

                                        <MenuItem
                                            onClick={() => {
                                                setAnchorEl(null);
                                                setDeleteConfirmationDialogOpen(true);
                                            }}
                                        >
                                            <Typography
                                                variant="inherit"
                                                color="error"
                                                style={{ paddingRight: theme.spacing(2) }}
                                            >
                                                Delete
                                            </Typography>
                                        </MenuItem>
                                    </Menu>
                                </DialogTitleWithMenu>
                            ) : (
                                <DialogTitle>New project</DialogTitle>
                            )}

                            <DialogContent>
                                <Form>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        name="name"
                                        label="Project name"
                                        value={values.name}
                                        error={!_.isEmpty(errors.name)}
                                        helperText={errors.name}
                                        style={{ marginTop: theme.spacing(1) }}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        name="tag"
                                        label="Add tags"
                                        value={values.tag}
                                        error={!_.isEmpty(errors.tag)}
                                        helperText={errors.tag}
                                        style={{ marginTop: theme.spacing(2) }}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <Divider orientation="vertical" style={{ height: 28, margin: 4 }} />
                                                    <IconButton
                                                        onClick={() => {
                                                            handleAddTag(values.tag, handleChange);
                                                            setFieldValue('tag', '');
                                                        }}
                                                    >
                                                        <AddCircleIcon />
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Form>
                                <Box marginTop={1}>
                                    {tags.map(tag => (
                                        <Chip
                                            key={tag}
                                            label={tag}
                                            style={{ margin: theme.spacing(0.5) }}
                                            onDelete={() => handleRemoveTag(tag)}
                                        />
                                    ))}
                                </Box>
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

            <ConfirmationDialog
                danger
                open={deleteConfirmationDialogOpen}
                dialogTitle="Delete project?"
                dialogContentText="You will lose all your logged time associated with this project."
                action="Delete"
                onClose={() => setDeleteConfirmationDialogOpen(false)}
                onSubmit={handleDelete}
            />
        </>
    );
}

export default ProjectDialog;
