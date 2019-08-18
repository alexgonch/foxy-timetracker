import React from 'react';

import _ from 'lodash';

import blueGrey from '@material-ui/core/colors/blueGrey';
import deepOrange from '@material-ui/core/colors/deepOrange';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withTheme } from '@material-ui/core/styles';

import { Formik, Form } from 'formik';

import { ReactComponent as FoxLogo } from 'resources/images/fox.svg';

function LoginForm(props) {
    const { theme } = props;

    const handleSubmit = (values, { setSubmitting }) => {
        setTimeout(() => {
            alert(JSON.stringify(values, null, 2)); // TODO: lowercase email
            setSubmitting(false);
        }, 800);
    };

    return (
        <Box maxWidth={360} p={2}>
            <Box display="flex" alignItems="center" flexDirection="column">
                <FoxLogo width={64} />
                <Typography
                    variant="h4"
                    style={{
                        marginTop: theme.spacing(2),
                        color: deepOrange[700],
                        fontWeight: 300,
                        fontSize: '1.75rem'
                    }}
                >
                    Foxy <span style={{ color: blueGrey[600], fontWeight: 400 }}>Time</span>Tracker
                </Typography>
            </Box>

            <Box marginTop={4}>
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
                                style={{ marginTop: theme.spacing(1) }}
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
                                Sign in
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Box>
    );
}

export default withTheme(LoginForm);
