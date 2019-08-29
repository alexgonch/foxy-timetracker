import React from 'react';

import _ from 'lodash';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

function ResponsiveDescription(props) {
    const { text } = props;

    const theme = useTheme();

    const smUp = useMediaQuery(theme.breakpoints.up('sm'));
    const mdUp = useMediaQuery(theme.breakpoints.up('md'));
    const lgUp = useMediaQuery(theme.breakpoints.up('lg'));
    const xlUp = useMediaQuery(theme.breakpoints.up('xl'));
    
    if (_.isEmpty(text)) {
        return <span style={{ color: theme.palette.text.disabled }}>No description.</span>;
    }
    
    if (xlUp) {
        return <span>{getTruncatedText(text, 280)}</span>;
    } else if (lgUp) {
        return <span>{getTruncatedText(text, 220)}</span>;
    } else if (mdUp) {
        return <span>{getTruncatedText(text, 160)}</span>;
    } else if (smUp) {
        return <span>{getTruncatedText(text, 160)}</span>;
    } else {
        return <span>{getTruncatedText(text, 90)}</span>;
    }
}

export default ResponsiveDescription;

function getTruncatedText(text, length) {
    return _.truncate(text, { length, separator: /,? +/ });
}
