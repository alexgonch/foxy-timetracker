import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import _ from 'lodash';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withTheme } from '@material-ui/core/styles';

import { Formik, Form } from 'formik';

import { signUpSchema } from 'utils/validationSchemas';
import { FirebaseContext } from 'utils/firebase';
import { CustomSnackbarContext } from 'components/CustomSnackbar';

import LandingFormFrame from './LandingFormFrame';

function SignupForm(props) {
    const { theme } = props;

    const firebase = useContext(FirebaseContext);
    const customSnackbar = useContext(CustomSnackbarContext);

    const handleSubmit = (values, { setSubmitting }) => {
        firebase
            .doCreateUserWithEmailAndPassword(values.email, values.password)
            .then(authUser => {
                props.history.push('/'); // TEMP
                // props.history.push('/success'); // TODO: display user-friendly success message and let them click "Sign in"
            })
            .catch(error => {
                switch (error.code) {
                    case 'auth/email-already-in-use':
                        customSnackbar.error('Account with given email already exists.');
                        break;
                    case 'auth/invalid-email':
                        customSnackbar.error('Invalid email.');
                        break;
                    case 'auth/weak-password':
                        // Firebase will reject passwords shorter than 6 characters (should be prevented by yup schema too)
                        customSnackbar.error('Please choose a stronger password.');
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
        <LandingFormFrame>
            <Formik initialValues={{ email: '', password: '' }} validationSchema={signUpSchema} onSubmit={handleSubmit}>
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
                        <Button
                            fullWidth
                            type="submit"
                            variant="contained"
                            size="large"
                            color="primary"
                            disabled={isSubmitting}
                            style={{ marginTop: theme.spacing(2) + 20 }} // 20px offsets the form to keep Sign In/Sign Up buttons fixed
                        >
                            Sign up
                        </Button>
                        <Link to="/login" style={{ textDecoration: 'none' }}>
                            <Typography
                                variant="body1"
                                color="primary"
                                align="center"
                                disabled={isSubmitting}
                                style={{ marginTop: theme.spacing(2) }}
                            >
                                Back to sign in
                            </Typography>
                        </Link>
                    </Form>
                )}
            </Formik>
        </LandingFormFrame>
    );
}

export default withTheme(SignupForm);
