import React from 'react';

import Box from '@material-ui/core/Box';
import { useTheme } from '@material-ui/core/styles';

function LandingBackground(props) {
    const { style, ...rest } = props;
    
    const theme = useTheme();

    return (
        <Box
            display="flex"
            height="100%"
            style={{ background: theme.palette.background.default }}
            {...rest}
        >
            {props.children}
        </Box>
    );
}

export default LandingBackground;
