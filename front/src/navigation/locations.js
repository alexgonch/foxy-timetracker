import React from 'react';

import _ from 'lodash';
import moment from 'moment';

import WorkIcon from '@material-ui/icons/Work';
import TimerIcon from '@material-ui/icons/Timer';
import BarChartIcon from '@material-ui/icons/BarChart';
import PersonIcon from '@material-ui/icons/Person';

const locations = [
    {
        to: pathname => '/',
        isSelected: pathname => pathname === '/',
        title: 'Projects',
        icon: <WorkIcon />
    },
    {
        to: pathname => (pathname.startsWith('/time') ? pathname : `/time/${moment().format('YYYYMMDD')}`), // repeated clicks won't change URL
        isSelected: pathname => pathname.startsWith('/time'),
        title: 'Time',
        icon: <TimerIcon />
    },
    {
        to: pathname => '/reports',
        isSelected: pathname => pathname === '/reports',
        title: 'Reports',
        icon: <BarChartIcon />
    },
    {
        to: pathname => '/account',
        isSelected: pathname => pathname === '/account',
        title: 'Account',
        icon: <PersonIcon />
    }
];

function getLocationTitle(pathname) {
	const location = _.find(locations, l => l.isSelected(pathname));
	if (!_.isNil(location)) {
		return location.title;
	} else {
		return 'Not Found';
	}
}

export default locations;

export { getLocationTitle };