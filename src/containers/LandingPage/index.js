import React from 'react';

import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';

import LandingBackground from 'components/backgrounds/LandingBackground';
import LandingFormFrame from 'components/decorations/LandingFormFrame';
import NoAuthRoutes from 'navigation/NoAuthRoutes';

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
                    <LandingFormFrame>
                        <NoAuthRoutes />
                    </LandingFormFrame>
                </Paper>
            </Box>
        </LandingBackground>
    );
}

export default LandingPage;
