import React, { useState, useContext } from 'react';

import _ from 'lodash';

import AddCircleIcon from '@material-ui/icons/AddCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogTitleWithMenu from 'components/Extensions/DialogTitleWithMenu';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import { useTheme } from '@material-ui/core/styles';

import { Formik, Form } from 'formik';

import { projectSchema } from 'utils/validationSchemas';
import { getInitialValues } from './functions';
import { CustomSnackbarContext } from 'components/CustomSnackbar';

import ConfirmationDialog from 'components/Dialogs/ConfirmationDialog';

// TODO: if we carry on with tags, we should implement an Autocomplete for tags input
function ProjectDialog(props) {
    const { open, project, onClose } = props;

    const updateMode = !_.isNil(project);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [deleteConfirmationDialogOpen, setDeleteConfirmationDialogOpen] = React.useState(false);
    const [tags, setTags] = useState(!_.isNil(project) ? project.tags : []); // TEMP: will be ignored for now

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
        // TODO
        customSnackbar.success('Project archived.');
        setAnchorEl(null);
        onClose();
    };

    const handleDelete = () => {
        // TODO
        customSnackbar.success('Project deleted.');
        setDeleteConfirmationDialogOpen(false);
        setAnchorEl(null);
        onClose();
    };

    const handleAddTag = tag => {
        setTags([...tags, ...tag.split(',').map(tag => tag.replace(/\s+/g, ' ').trim())]); // remove extra spaces
    };

    const handleRemoveTag = tag => {
        setTags(_.without(tags, tag));
    };

    const handleSubmit = (values, { setSubmitting }) => {
        // TODO: save to Firestore
        customSnackbar.success(`Project ${updateMode ? 'updated' : 'created'}.`);
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
                                        <MenuItem onClick={handleArchive}>
                                            <Typography variant="inherit" style={{ paddingRight: theme.spacing(2) }}>
                                                Archive
                                            </Typography>
                                        </MenuItem>
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
                dialogContentText="You will lose all your logged time associated with this project."
                action="Delete"
                onClose={() => setDeleteConfirmationDialogOpen(false)}
                onSubmit={handleDelete}
            />
        </>
    );
}

export default ProjectDialog;
