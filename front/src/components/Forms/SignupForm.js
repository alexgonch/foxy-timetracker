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

import LandingFormFrame from './LandingFormFrame';

function SignupForm(props) {
    const { theme } = props;

    const firebase = useContext(FirebaseContext);

    const handleSubmit = (values, { setSubmitting }) => {
		// TODO: rework with async/await syntax
        firebase
            .doCreateUserWithEmailAndPassword(values.email.toLowerCase(), values.password)
            .then(authUser => {
                props.history.push('/'); // TEMP
                // props.history.push('/success'); // TODO: display user-friendly success message and let them click "Sign in"
            })
            .catch(error => {
                console.error(error); // TODO: implement error Snackbar
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
