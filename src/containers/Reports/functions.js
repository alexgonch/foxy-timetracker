import _ from 'lodash';
import moment from 'moment';

import * as colors from '@material-ui/core/colors';

import { COLORS } from './constants';

export function processTimeEntries(timeEntries) {
    // Remove seconds and time entries with less than a minute of tracked time
    const timeEntriesWithoutSeconds = timeEntries.map(timeEntry => ({
        ...timeEntry,
        time: timeEntry.time - (timeEntry.time % 60)
    }));

    return _.filter(timeEntriesWithoutSeconds, t => t.time > 0);
}

export function addColorsToProjects(lightThemeEnabled, projects) {
    const projectsWithColors = _.cloneDeep(projects);

    projectsWithColors.forEach((project, index) => {
        const colorIndex = lightThemeEnabled ? 500 : 'A200';
        const colorName = COLORS[index % COLORS.length]; // will start looping colors eventually

        project.color = colors[colorName][colorIndex];
    });

    return projectsWithColors;
}

export function filterTimeEntriesByDates(timeEntries, startDate, endDate) {
    return _.filter(
        timeEntries,
        t =>
            moment(t.date, 'YYYYMMDD').isSameOrAfter(startDate, 'day') &&
            moment(t.date, 'YYYYMMDD').isSameOrBefore(endDate, 'day')
    );
}

export function convertTimeEntriesToChartData(timeEntries, startDate, endDate) {
    const data = [];

    let currentDate = moment(startDate);
    while (currentDate.isSameOrBefore(endDate, 'day')) {
        data.push({ _date: currentDate.toISOString() });
        const allTimeEntriesOnDate = _.filter(
            timeEntries,
            t => moment(t.date, 'YYYYMMDD').isSame(currentDate, 'day') && !_.isNil(t.project)
        );
        allTimeEntriesOnDate.forEach(timeEntry => {
            const previousTimeStored = _.get(_.last(data), timeEntry.project.name, 0);
            _.set(_.last(data), timeEntry.project.name, previousTimeStored + timeEntry.time);
        });

        currentDate.add(1, 'days');
    }

    return { data };
}
