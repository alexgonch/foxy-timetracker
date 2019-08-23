import React from 'react';

import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import { useTheme } from '@material-ui/core/styles';

function FullPageLoader(props) {
    const theme = useTheme();

    // REVIEW: spice it up a little? We could display some brief info about the app here.
    return (
        <Box display="flex" height="100%" flexDirection="column" justifyContent="center" alignItems="center">
            <CircularProgress size={96} color="primary" />
            <Typography variant="body1" style={{ marginTop: theme.spacing(4) }}>
                Signing you in...
            </Typography>
        </Box>
    );
}

export default FullPageLoader;
