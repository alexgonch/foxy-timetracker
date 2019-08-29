import React, { useContext } from 'react';

import _ from 'lodash';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { Formik, Form } from 'formik';

import firebase from 'utils/firebase';
import { forgotPasswordSchema } from 'utils/validationSchemas';
import { CustomSnackbarContext } from 'components/extensions/CustomSnackbar';

function ForgotPasswordDialog(props) {
    const { open, onClose } = props;

    const customSnackbar = useContext(CustomSnackbarContext);

    const handleSubmit = (values, { setSubmitting }) => {
        firebase
            .auth()
            .sendPasswordResetEmail(values.email)
            .then(() => {
                // REVIEW: we might want a more user-friendly way to indicate success (in future)
                customSnackbar.success('Check your email for a password reset link.');
                onClose();
            })
            .catch(error => {
                switch (error.code) {
                    case 'auth/invalid-email':
                        customSnackbar.error('Invalid email.');
                        break;
                    case 'auth/user-not-found':
                        customSnackbar.error('Account with given email was not found.');
                        break;
                    default:
                        customSnackbar.error('An error has happened. Please try again.');
                }
            })
            .finally(() => {
                setSubmitting(false);
            });
    };

    return (
        <Dialog fullWidth open={open} aria-labelledby="forgot-password-dialog" onClose={onClose}>
            <Formik initialValues={{ email: '' }} validationSchema={forgotPasswordSchema} onSubmit={handleSubmit}>
                {({ values, errors, isSubmitting, handleChange, handleBlur, submitForm }) => (
                    <>
                        <DialogTitle>Reset password</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Enter the email address you've used to register your account.
                            </DialogContentText>
                            <Form>
                                <TextField
                                    fullWidth
                                    type="email"
                                    name="email"
                                    label="Email"
                                    value={values.email}
                                    error={!_.isEmpty(errors.email)}
                                    helperText={errors.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </Form>
                        </DialogContent>
                        <DialogActions>
                            <Button color="secondary" disabled={isSubmitting} onClick={submitForm}>
                                Reset
                            </Button>
                        </DialogActions>
                    </>
                )}
            </Formik>
        </Dialog>
    );
}

export default ForgotPasswordDialog;
