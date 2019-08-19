import React, { useContext } from 'react';

import _ from 'lodash';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withTheme } from '@material-ui/core/styles';

import { Formik, Form } from 'formik';

import { FirebaseContext } from 'utils/firebase';
import { forgotPasswordSchema } from 'utils/validationSchemas';

function ForgotPasswordDialog(props) {
    const { theme, open } = props;

    const firebase = useContext(FirebaseContext);

    const handleSubmit = (values, { setSubmitting }) => {
        console.log('values.email', values.email);
        firebase
            .doPasswordReset(values.email)
            .then(() => {
                console.log('success');
                // TODO: success
            })
            .catch(error => {
                console.error(error); // TODO: implement error Snackba
            })
            .finally(() => {
                setSubmitting(false);
            });
    };

    return (
        <Dialog open={open} onClose={props.onClose}>
            <Formik initialValues={{ email: '' }} validationSchema={forgotPasswordSchema} onSubmit={handleSubmit}>
                {({ values, errors, isSubmitting, handleChange, handleBlur, submitForm }) => (
                    <>
                        <DialogTitle>Reset password</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Enter the email address you used to register your account.
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
                            <Button onClick={props.onClose} color="primary">
                                Cancel
                            </Button>
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

export default withTheme(ForgotPasswordDialog);
