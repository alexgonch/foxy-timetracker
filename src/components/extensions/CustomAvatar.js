import React from 'react';

import Avatar from '@material-ui/core/Avatar';
import { useTheme } from '@material-ui/core/styles';

function CustomAvatar(props) {
    const { children } = props;

    const theme = useTheme();

    return (
        <Avatar
            style={{
                backgroundColor: theme.light() ? theme.palette.primary[500] : theme.palette.common.white,
                color: theme.light() ? theme.palette.common.white : theme.palette.background.paper
            }}
        >
            {children}
        </Avatar>
    );
}

export default CustomAvatar;
