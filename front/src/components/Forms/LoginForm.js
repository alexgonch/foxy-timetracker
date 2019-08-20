import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import _ from 'lodash';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withTheme } from '@material-ui/core/styles';

import { Formik, Form } from 'formik';

import { FirebaseContext } from 'utils/firebase';
import { CustomSnackbarContext } from 'components/CustomSnackbar';

import LandingFormFrame from './LandingFormFrame';
import ForgotPasswordDialog from 'components/Dialogs/ForgotPasswordDialog';

function LoginForm(props) {
    const { theme } = props;
    
    const [forgotPasswordDialogOpen, setForgotPasswordDialogOpen] = useState(false);

    const firebase = useContext(FirebaseContext);
    const customSnackbar = useContext(CustomSnackbarContext);

    const handleSubmit = (values, { setSubmitting }) => {
        firebase
            .doSignInWithEmailAndPassword(values.email.toLowerCase(), values.password)
            .then(authUser => {
                props.history.push('/');
            })
            .catch(error => {
                switch (error.code) {
                    case 'auth/invalid-email':
                        customSnackbar.error('Invalid email.');
                        break;
                    case 'auth/user-disabled':
                        customSnackbar.error('Your account has been disabled.');
                        break;
                    case 'auth/user-not-found':
                        customSnackbar.error('Account with given email was not found.');
                        break;
                    case 'auth/wrong-password':
                        customSnackbar.error('Invalid password.');
                        break;
                    default:
                        customSnackbar.error('An error has happened. Please try again.');
                }
            })
            .finally(() => {
                setSubmitting(false);
            });
    };
    
    const handleForgotPasswordDialog = state => () => {
        setForgotPasswordDialogOpen(state);
    };

    return (
        <LandingFormFrame>
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={undefined} // no need to validate sign-in form
                onSubmit={handleSubmit}
            >
                {({ values, errors, isSubmitting, handleChange, handleBlur }) => (
                    <Form>
                        <TextField
                            fullWidth
                            variant="outlined"
                            name="email"
                            label="Email"
                            value={values.email}
                            error={!_.isEmpty(errors.email)}
                            helperText={errors.email}
                            style={{ marginTop: theme.spacing(2) }}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <TextField
                            fullWidth
                            variant="outlined"
                            type="password"
                            name="password"
                            label="Password"
                            value={values.password}
                            error={!_.isEmpty(errors.password)}
                            helperText={errors.password}
                            style={{ marginTop: theme.spacing(2) }}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <Typography
                            variant="body1"
                            align="center"
                            style={{ marginTop: theme.spacing(2), cursor: 'pointer' }}
                            onClick={handleForgotPasswordDialog(true)}
                        >
                            Forgot password?
                        </Typography>
                        <Button
                            fullWidth
                            type="submit"
                            variant="contained"
                            size="large"
                            color="primary"
                            disabled={isSubmitting}
                            style={{ marginTop: theme.spacing(2) }}
                        >
                            Sign in
                        </Button>
                        <Link to="/signup" style={{ textDecoration: 'none' }}>
                            <Button
                                fullWidth
                                variant="outlined"
                                size="large"
                                color="primary"
                                disabled={isSubmitting}
                                style={{ marginTop: theme.spacing(2) }}
                            >
                                Sign up
                            </Button>
                        </Link>
                    </Form>
                )}
            </Formik>
            
            <ForgotPasswordDialog open={forgotPasswordDialogOpen} onClose={handleForgotPasswordDialog(false)} />
        </LandingFormFrame>
    );
}

export default withTheme(LoginForm);
