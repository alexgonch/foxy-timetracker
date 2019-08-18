import React from 'react';

import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import { withTheme } from '@material-ui/core/styles';

import LoginForm from 'components/LoginForm/LoginForm';

function LandingPage(props) {
    const { theme } = props;

    return (
        <>
            <Box
                display="flex"
                justifyContent="center"
                height="100%"
                minHeight={360}
                style={{ background: 'linear-gradient(45deg, rgba(69, 90, 100, 0.25), rgba(255, 87, 34, 0.25))' }}
            >
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
                        <LoginForm />
                    </Paper>
                </Box>
            </Box>
        </>
    );
}

export default withTheme(LandingPage);
