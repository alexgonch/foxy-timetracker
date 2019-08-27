import React from 'react';

import AddIcon from '@material-ui/icons/Add';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import { useTheme } from '@material-ui/core/styles';

function NewTimeEntry(props) {
    const { onActionClick } = props;
    
    const theme = useTheme();

    return (
        <Card
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                marginTop: theme.spacing(2)
            }}
        >
            <CardActionArea style={{ height: '100%' }} onClick={() => onActionClick()}>
                <Box textAlign="center" p={2}>
                    <AddIcon color="secondary" style={{ fontSize: 36 }} />
                    <Typography variant="subtitle2" color="secondary">
                        New time entry
                    </Typography>
                </Box>
            </CardActionArea>
        </Card>
    );
}

export default NewTimeEntry;
