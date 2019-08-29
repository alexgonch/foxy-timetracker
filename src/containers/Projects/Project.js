import React from 'react';

import moment from 'moment';
import { getPaddedHoursMinutesSeconds } from 'utils/helpers/timeHelper';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import { useTheme } from '@material-ui/core/styles';

function Project(props) {
    const { name, archived, created_at, total_time, onActionClick } = props;

    const theme = useTheme();

    const { hours, minutes } = getPaddedHoursMinutesSeconds(total_time);

    return (
        <Card style={{ height: '100%', opacity: archived ? 0.33 : 1 }}>
            <CardActionArea style={{ height: '100%' }} onClick={onActionClick}>
                <CardContent>
                    <Typography variant="h6" noWrap>
                        {name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        Created on {moment(created_at.toDate()).format('MMM Do, YYYY')}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" style={{ marginTop: theme.spacing(2) }}>
                        {hours}h {minutes}m
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default Project;
