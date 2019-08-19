import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import _ from 'lodash';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withTheme } from '@material-ui/core/styles';

import { Formik, Form } from 'formik';

import { FirebaseContext } from 'utils/firebase';

import LandingFormFrame from './LandingFormFrame';

function LoginForm(props) {
    const { theme } = props;

    const firebase = useContext(FirebaseContext);

    const handleSubmit = (values, { setSubmitting }) => {
        // TODO: rework with async/await syntax
        firebase
            .doSignInWithEmailAndPassword(values.email.toLowerCase(), values.password)
            .then(authUser => {
                props.history.push('/');
            })
            .catch(error => {
                console.error(error); // TODO: implement error Snackbar
            })
            .finally(() => {
                setSubmitting(false);
            });
    };
    
    // TODO: forgot password

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
                            type="email"
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
        </LandingFormFrame>
    );
}

export default withTheme(LoginForm);
