import React from 'react';

import WbIncandescentIcon from '@material-ui/icons/WbIncandescent';
import WbIncandescentOutlinedIcon from '@material-ui/icons/WbIncandescentOutlined';
import IconButton from '@material-ui/core/IconButton';
import { useTheme } from '@material-ui/core/styles';

function NightModeButton(props) {
    const theme = useTheme();

    return (
        <IconButton color="inherit" onClick={() => theme.toggleNightMode()}>
            {theme.light() ? <WbIncandescentIcon /> : <WbIncandescentOutlinedIcon />}
        </IconButton>
    );
}

export default NightModeButton;
