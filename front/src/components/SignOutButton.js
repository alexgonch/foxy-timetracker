import React, { useContext } from 'react';

import Button from '@material-ui/core/Button';
import { withTheme } from '@material-ui/core/styles';

import { FirebaseContext } from 'utils/firebase';

const SignOutButton = props => {
    const firebase = useContext(FirebaseContext);

    return (
        <Button type="button" {...props} onClick={firebase.doSignOut}>
            Sign Out
        </Button>
    );
};

export default withTheme(SignOutButton);
