import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import _ from 'lodash';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useTheme } from '@material-ui/core/styles';

import { Formik, Form } from 'formik';

import firebase, { db } from 'utils/firebase';
import { signUpSchema } from 'utils/validationSchemas';
import { CustomSnackbarContext } from 'components/extensions/CustomSnackbar';

// TODO: email link verification/sign-in https://firebase.google.com/docs/auth/web/email-link-auth
// TODO: ToS and Privacy
function SignupForm(props) {
    const theme = useTheme();

    const customSnackbar = useContext(CustomSnackbarContext);

    const handleSubmit = (values, { setSubmitting }) => {
        firebase
            .auth()
            .createUserWithEmailAndPassword(values.email, values.password)
            .then(authUser => {
                db.collection('users')
                    .doc(authUser.user.uid)
                    .set({
                        email: values.email,
                        name: values.name
                    })
                    .catch(error => {
                        customSnackbar.error('An error has happened. Please try again.');
                        console.error(error);
                    });
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
        <Formik
            initialValues={{ email: '', name: '', password: '' }}
            validationSchema={signUpSchema}
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
                        name="name"
                        label="Full name"
                        value={values.name}
                        error={!_.isEmpty(errors.name)}
                        helperText={errors.name}
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
    );
}

export default SignupForm;
