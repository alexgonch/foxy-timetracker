import React from 'react';

import Box from '@material-ui/core/Box';

function LandingBackground(props) {
    const { style, ...rest } = props;

    return (
        <Box
            display="flex"
            height="100%"
            style={{ background: 'linear-gradient(0deg, rgba(69, 90, 100, 0.3), rgba(255, 87, 34, 0.2))', ...style }}
            {...rest}
        >
            {props.children}
        </Box>
    );
}

export default LandingBackground;
