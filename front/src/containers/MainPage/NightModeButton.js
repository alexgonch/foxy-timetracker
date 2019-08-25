import React from 'react';

import WbIncandescentIcon from '@material-ui/icons/WbIncandescent';
import IconButton from '@material-ui/core/IconButton';
import { useTheme } from '@material-ui/core/styles';

function NightModeButton(props) {
    const theme = useTheme();
    
    return (
        <IconButton color="inherit" onClick={() => theme.toggleNightMode()}>
            <WbIncandescentIcon />
        </IconButton>
    );
};

export default NightModeButton;
