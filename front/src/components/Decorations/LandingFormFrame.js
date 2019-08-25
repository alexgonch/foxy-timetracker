import React from 'react';

import { blueGrey, deepOrange } from '@material-ui/core/colors';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { useTheme } from '@material-ui/core/styles';

// import { ReactComponent as FoxLogo } from 'resources/images/foxy-timetracker-logo-optimized.svg';
import FoxyTimeTrackerLogo from 'resources/images/foxy-timetracker-logo-512.png';

// TODO: generate a second image for night mode usage (replace blueGrey with white)
// Surrounds child form with Foxy branding
function LandingFormFrame(props) {
    const theme = useTheme();

    const colors =
        theme.palette.type === 'light'
            ? {
                  text: deepOrange[700],
                  accent: blueGrey[600]
              }
            : {
                  text: deepOrange[500],
                  accent: theme.palette.grey[50]
              };

    return (
        <Box maxWidth={360} p={2}>
            <Box display="flex" alignItems="center" flexDirection="column">
                {/* <FoxLogo width={64} /> */}
                <img src={FoxyTimeTrackerLogo} alt="Foxy TimeTracker logo" style={{ width: 64 }} />
                <Typography
                    variant="h4"
                    style={{
                        marginTop: theme.spacing(2),
                        color: colors.text,
                        fontWeight: 300,
                        fontSize: '1.75rem'
                    }}
                >
                    Foxy <span style={{ color: colors.accent, fontWeight: 400 }}>Time</span>Tracker
                </Typography>
            </Box>

            <Box marginTop={2}>{props.children}</Box>
        </Box>
    );
}

export default LandingFormFrame;
