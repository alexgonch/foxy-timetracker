import React from 'react';

import moment from 'moment';
import { getHoursFromSeconds, getMinutesFromSeconds } from 'utils/helpers/timeHelper';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import { useTheme } from '@material-ui/core/styles';

function Project(props) {
    const { name, createdAt, totalTime, onActionClick } = props;
    
    const theme = useTheme();

    return (
        <Card style={{ height: '100%' }}>
            <CardActionArea style={{ height: '100%' }} onClick={onActionClick}>
                <CardContent>
                    <Typography variant="h6" noWrap>
                        {name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        Created on {moment(createdAt).format('MMM Do, YYYY')}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" style={{ marginTop: theme.spacing(2) }}>
                        {getHoursFromSeconds(totalTime)}h {getMinutesFromSeconds(totalTime)}m
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default Project;
