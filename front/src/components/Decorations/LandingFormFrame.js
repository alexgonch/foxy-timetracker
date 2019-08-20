import React from 'react';

import { blueGrey, deepOrange } from '@material-ui/core/colors';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { useTheme } from '@material-ui/core/styles';

import { ReactComponent as FoxLogo } from 'resources/images/fox.svg';

// Surrounds child form with Foxy branding
function LandingFormFrame(props) {
	const theme = useTheme();
	
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

            <Box marginTop={2}>{props.children}</Box>
        </Box>
    );
}

export default LandingFormFrame;
