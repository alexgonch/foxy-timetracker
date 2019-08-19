import React from 'react';
import { Route } from 'react-router-dom';

import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import { withTheme } from '@material-ui/core/styles';

import LandingBackground from 'components/Backgrounds/LandingBackground';
import LoginForm from 'components/Forms/LoginForm';
import SignupForm from 'components/Forms/SignupForm';

function LandingPage(props) {
    return (
        <LandingBackground justifyContent="center" minHeight={360}>
            <Box style={{ width: '100%', maxWidth: 540 }}>
                <Paper
                    square
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                        height: '100%'
                    }}
                >
                    <Route path="/login" component={LoginForm} />
                    <Route path="/signup" component={SignupForm} />
                </Paper>
            </Box>
        </LandingBackground>
    );
}

export default withTheme(LandingPage);
