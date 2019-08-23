import React from 'react';

import Box from '@material-ui/core/Box';

import PasswordChangeForm from './PasswordChangeForm';

// TODO: implement email change form
function Account(props) {
    return (
        <Box p={2}>
            <Box maxWidth={360}>
                <PasswordChangeForm />
            </Box>
        </Box>
    );
}

export default Account;
