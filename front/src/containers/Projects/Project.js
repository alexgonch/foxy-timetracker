import React from 'react';

import moment from 'moment';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { useTheme } from '@material-ui/core/styles';

function Project(props) {
    const { title, createdAt } = props;

    const theme = useTheme();

    return (
        <Paper style={{ width: '100%', padding: theme.spacing(2) }}>
            <Typography variant="h6">{title}</Typography>
            <Typography variant="body2" color="textSecondary">Created on {moment(createdAt).format('MMM Do, YYYY')}</Typography>
        </Paper>
    );
}

export default Project;
