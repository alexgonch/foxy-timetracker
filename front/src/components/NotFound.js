import React from 'react';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { useTheme } from '@material-ui/core/styles';

function NotFound(props) {
    const theme = useTheme();

    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100%" p={4}>
            <Box>
                <Typography variant="h5" align="center" color="secondary">
                    Not Found
                </Typography>
                <Typography
                    variant="body1"
                    align="center"
                    color="textSecondary"
                    style={{ marginTop: theme.spacing(1) }}
                >
                    The page you requested does not exist.
                </Typography>
            </Box>
        </Box>
    );
}

export default NotFound;
