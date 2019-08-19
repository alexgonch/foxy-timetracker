import React from 'react';

import Box from '@material-ui/core/Box';
import { withTheme } from '@material-ui/core/styles';

function LandingBackground(props) {
    const { style, ...rest } = props;

    return (
        <Box
            display="flex"
            height="100%"
            style={{ background: 'linear-gradient(45deg, rgba(69, 90, 100, 0.25), rgba(255, 87, 34, 0.25))', ...style }}
            {...rest}
        >
            {props.children}
        </Box>
    );
}

export default withTheme(LandingBackground);
