import React, { useContext } from 'react';

import _ from 'lodash';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useTheme } from '@material-ui/core/styles';

import { Formik, Form } from 'formik';

import firebase, { generateCredential } from 'utils/firebase';
import { passwordChangeSchema } from 'utils/validationSchemas';
import { CustomSnackbarContext } from 'components/extensions/CustomSnackbar';

function PasswordChangeForm(props) {
    const theme = useTheme();

    const customSnackbar = useContext(CustomSnackbarContext);

    const handleSubmit = (values, { setSubmitting, resetForm }) => {
        firebase
            .auth()
            .currentUser.reauthenticateWithCredential(generateCredential(values.passwordCurrent))
            .then(() => {
                firebase
                    .auth()
                    .currentUser.updatePassword(values.password)
                    .then(() => {
                        resetForm();
                        customSnackbar.success('Password updated.');
                    })
                    .catch(error => {
                        switch (error.code) {
                            case 'auth/weak-password':
                                // Firebase will reject passwords shorter than 6 characters (should be prevented by yup schema too)
                                customSnackbar.error('Please choose a stronger password.');
                                break;
                            case 'auth/requires-recent-login':
                                customSnackbar.error('Please sign out and sign in again before proceeding.');
                                break;
                            default:
                                customSnackbar.error('An error has happened. Please try again.');
                        }
                    })
                    .finally(() => {
                        setSubmitting(false);
                    });
            })
            .catch(error => {
                switch (error.code) {
                    case 'auth/wrong-password':
                        customSnackbar.error('Wrong current password.');
                        break;
                    default:
                        // NOTE: all other possible errors should just generate a generic error message
                        customSnackbar.error('An error has happened. Please try again.');
                }
                setSubmitting(false);
            });
    };

    return (
        <>
            <Formik
                initialValues={{ passwordCurrent: '', password: '', passwordConfirmation: '' }}
                validationSchema={passwordChangeSchema}
                onSubmit={handleSubmit}
            >
                {({ values, errors, isSubmitting, handleChange, handleBlur }) => (
                    <Form>
                        <TextField
                            fullWidth
                            variant="outlined"
                            type="password"
                            name="passwordCurrent"
                            label="Current password"
                            value={values.passwordCurrent}
                            error={!_.isEmpty(errors.passwordCurrent)}
                            helperText={errors.passwordCurrent}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <TextField
                            fullWidth
                            variant="outlined"
                            type="password"
                            name="password"
                            label="New password"
                            value={values.password}
                            error={!_.isEmpty(errors.password)}
                            helperText={errors.password}
                            style={{ marginTop: theme.spacing(1) }}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <TextField
                            fullWidth
                            variant="outlined"
                            type="password"
                            name="passwordConfirmation"
                            label="Confirm new password"
                            value={values.passwordConfirmation}
                            error={!_.isEmpty(errors.passwordConfirmation)}
                            helperText={errors.passwordConfirmation}
                            style={{ marginTop: theme.spacing(1) }}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <Button
                            fullWidth
                            type="submit"
                            variant="contained"
                            size="large"
                            color="primary"
                            disabled={isSubmitting}
                            style={{ marginTop: theme.spacing(2) }}
                        >
                            Update
                        </Button>
                    </Form>
                )}
            </Formik>
        </>
    );
}

export default PasswordChangeForm;
