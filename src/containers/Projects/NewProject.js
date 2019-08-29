import React from 'react';

import AddIcon from '@material-ui/icons/Add';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';

function NewProject(props) {
	const { onActionClick } = props;
	
    return (
        <Card style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <CardActionArea style={{ height: '100%' }} onClick={() => onActionClick()}>
                <Box textAlign="center" p={2}>
                    <AddIcon color="secondary" style={{ fontSize: 36 }} />
					<Typography variant="subtitle2" color="secondary">
						New project
					</Typography>
                </Box>
            </CardActionArea>
        </Card>
    );
}

export default NewProject;
