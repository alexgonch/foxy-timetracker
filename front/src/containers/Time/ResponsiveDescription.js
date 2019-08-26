import React from 'react';

import _ from 'lodash';

import Hidden from '@material-ui/core/Hidden';

function ResponsiveDescription(props) {
    const { text } = props;

    return (
        <>
            <Hidden only={['sm', 'md', 'lg', 'xl']}>
                <span>{_.truncate(text, { length: 80, separator: /,? +/ })}</span>
            </Hidden>
            <Hidden only={['xs', 'md', 'lg', 'xl']}>
                <span>{_.truncate(text, { length: 120, separator: /,? +/ })}</span>
            </Hidden>
            <Hidden only={['xs', 'sm', 'lg', 'xl']}>
                <span>{_.truncate(text, { length: 160, separator: /,? +/ })}</span>
            </Hidden>
            <Hidden only={['xs', 'sm', 'md', 'xl']}>
                <span>{_.truncate(text, { length: 160, separator: /,? +/ })}</span>
            </Hidden>
            <Hidden only={['xs', 'sm', 'md', 'lg']}>
                <span>{_.truncate(text, { length: 200, separator: /,? +/ })}</span>
            </Hidden>
        </>
    );
}

export default ResponsiveDescription;
