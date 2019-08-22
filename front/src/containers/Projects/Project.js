import React from 'react';

import moment from 'moment';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';

function Project(props) {
    const { title, createdAt, creator, onActionClick } = props;

    return (
        <Card style={{ height: '100%' }}>
            <CardActionArea style={{ height: '100%' }} onClick={onActionClick}>
                <CardContent>
                    <Typography variant="h6" noWrap>
                        {title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        Created on {moment(createdAt).format('MMM Do, YYYY')}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        {creator}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default Project;
