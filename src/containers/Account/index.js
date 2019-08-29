import React from 'react';

import LockIcon from '@material-ui/icons/Lock';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { useTheme } from '@material-ui/core/styles';

import PasswordChangeForm from './PasswordChangeForm';

// TODO: implement email change form
// TODO: implement global settings (first day of the week, language)
function Account(props) {
    const theme = useTheme();

    return (
        <Box p={2}>
            <Box maxWidth={360}>
                <Paper style={{ padding: theme.spacing(2) }}>
                    <Typography
                        variant="body1"
                        style={{
                            marginBottom: theme.spacing(2),
                            padding: theme.spacing(1),
                            borderRadius: theme.shape.borderRadius,
                            backgroundColor: theme.light() ? theme.palette.grey[300] : theme.palette.grey[700],
                            color: theme.light() ? theme.palette.grey[700] : theme.palette.grey[300]
                        }}
                    >
                        <LockIcon
                            style={{
                                verticalAlign: 'text-bottom',
                                color: theme.light() ? theme.palette.grey[700] : theme.palette.grey[300]
                            }}
                        />{' '}
                        Update password
                    </Typography>
                    <PasswordChangeForm />
                </Paper>
            </Box>
        </Box>
    );
}

export default Account;
