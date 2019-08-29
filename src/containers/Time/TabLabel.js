import React from 'react';

import Hidden from '@material-ui/core/Hidden';

function TabLabel(props) {
    const { label } = props;

    return (
        <>
            <Hidden smUp>{label.substring(0, 1)}</Hidden>
            <Hidden xsDown>{label.substring(0, 3)}</Hidden>
        </>
    );
}

export default TabLabel;
