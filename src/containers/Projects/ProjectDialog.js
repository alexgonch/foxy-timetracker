import React, { useContext } from 'react';

import _ from 'lodash';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogTitleWithMenu from 'components/extensions/DialogTitleWithMenu';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useTheme } from '@material-ui/core/styles';

import { Formik, Form } from 'formik';

import { projectSchema } from 'utils/validationSchemas';
import { getInitialValues } from './functions';
import { CustomSnackbarContext } from 'components/extensions/CustomSnackbar';

import ConfirmationDialog from 'components/dialogs/ConfirmationDialog';

// REVIEW: extend db with common API calls
import firebase, { db } from 'utils/firebase';

function ProjectDialog(props) {
    const { open, project, onClose } = props;

    const updateMode = !_.isNil(project);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [deleteConfirmationDialogOpen, setDeleteConfirmationDialogOpen] = React.useState(false);

    const theme = useTheme();
    const customSnackbar = useContext(CustomSnackbarContext);

    // REVIEW: we could make a Menu context to reuse across the entire app
    const handleMore = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMore = () => {
        setAnchorEl(null);
    };

    const handleArchive = () => {
        db.collection('projects')
            .doc(project.id)
            .update({
                archived: true
            })
            .catch(error => {
                customSnackbar.error('An error has happened. Please try again.');
                console.error(error);
            });

        customSnackbar.success('Project archived.');
        setAnchorEl(null);
        onClose();
    };

    const handleReactivate = () => {
        db.collection('projects')
            .doc(project.id)
            .update({
                archived: false
            })
            .catch(error => {
                customSnackbar.error('An error has happened. Please try again.');
                console.error(error);
            });

        customSnackbar.success('Project reactivated.');
        setAnchorEl(null);
        onClose();
    };

    const handleDelete = () => {
        db.collection('projects')
            .doc(project.id)
            .delete()
            .catch(error => {
                customSnackbar.error('An error has happened. Please try again.');
                console.error(error);
            });

        customSnackbar.success('Project deleted.');
        setDeleteConfirmationDialogOpen(false);
        setAnchorEl(null);
        onClose();
    };

    const handleSubmit = (values, { resetForm }) => {
        if (updateMode) {
            db.collection('projects')
                .doc(project.id)
                .update({
                    name: values.name
                })
                .catch(error => {
                    customSnackbar.error('An error has happened. Please try again.');
                    console.error(error);
                });
        } else {
            const currentUserRef = db.collection('users').doc(firebase.auth().currentUser.uid);

            db.collection('projects')
                .add({
                    created_at: new Date(),
                    archived: false,
                    name: values.name,
                    total_time: 0,
                    owner_uid: currentUserRef
                })
                .catch(error => {
                    customSnackbar.error('An error has happened. Please try again.');
                    console.error(error);
                });

            customSnackbar.success('Project created.');
        }

        resetForm();
        onClose();
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
                                        label="Name"
                                        value={values.name}
                                        error={!_.isEmpty(errors.name)}
                                        helperText={errors.name}
                                        style={{ marginTop: theme.spacing(1) }}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Form>
                            </DialogContent>
                            <DialogActions>
                                <Button color="secondary" onClick={submitForm}>
                                    {updateMode ? 'Update' : 'Create'}
                                </Button>
                            </DialogActions>
                        </>
                    )}
                </Formik>
            </Dialog>

            <ConfirmationDialog
                danger
                open={deleteConfirmationDialogOpen}
                dialogTitle="Delete project?"
                dialogContentText="Time entries you logged for this project will not be deleted."
                action="Delete"
                onClose={() => setDeleteConfirmationDialogOpen(false)}
                onSubmit={handleDelete}
            />
        </>
    );
}

export default ProjectDialog;
