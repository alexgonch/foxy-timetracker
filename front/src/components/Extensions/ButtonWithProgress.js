import React, { useContext } from 'react';

import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import { InProgressContext } from 'utils/contexts/InProgressContext';

function ButtonWithProgress(props) {
    const { children, ...rest } = props;

    const [inProgress] = useContext(InProgressContext);
    
    if (inProgress) {
        return (
            <Button disabled {...rest}>
                <CircularProgress color="secondary" size={24} />
            </Button>
        );
    } else {
        return (
            <Button {...rest}>
                {children}
            </Button>
        );
    }
}

export default ButtonWithProgress;
