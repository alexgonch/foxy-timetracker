import React, { useState, useEffect } from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import { useTheme } from '@material-ui/core/styles';

import LandingBackground from 'components/Backgrounds/LandingBackground';

function FullPageLoader(props) {
    const theme = useTheme();

    // NOTE: we don't display the loader unless it takes unusually long time to authenticate (flashing loader would get annoying for users with fast Internet connection)
    const [enableRender, setEnableRender] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => setEnableRender(true), 500);
        return () => clearTimeout(timeout);
    }, []);

    if (enableRender) {
        // REVIEW: spice it up a little? We could display some brief info about the app here.
        return (
            <LandingBackground flexDirection="column" justifyContent="center" alignItems="center">
                <CircularProgress size={96} color="primary" />
                <Typography variant="body1" style={{ marginTop: theme.spacing(4) }}>
                    Signing you in...
                </Typography>
            </LandingBackground>
        );
    } else {
        return null;
    }
}

export default FullPageLoader;
