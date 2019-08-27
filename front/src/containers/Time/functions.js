import _ from 'lodash';
import moment from 'moment';

import { getHoursFromSeconds, getMinutesFromSeconds } from 'utils/helpers/timeHelper';

export function getInitialValues(timeEntry) {
    if (_.isNil(timeEntry)) {
        return {
            project_uid: '',
            description: '',
            hours: 0,
            minutes: 0
        };
    } else {
        return {
            project_uid: timeEntry.project_uid.id,
            description: timeEntry.description,
            hours: getHoursFromSeconds(timeEntry.time),
            minutes: getMinutesFromSeconds(timeEntry.time)
        };
    }
}

export function getSelectableProjects(projects) {
    return _.filter(projects, p => !p.archived);
}

export function filterTimeEntries(timeEntries, weekSelected, weekFormat) {
    console.info(`%cfilterTimeEntries: running`, 'color: green');
    if (_.isNil(timeEntries)) {
        return [];
    }

    const dateSelected = moment(weekSelected, weekFormat)
        .startOf('isoWeek')
        .toDate();
    const previousWeekStartDate = parseInt(
        moment(dateSelected)
            .startOf('isoWeek')
            .subtract(7, 'days')
            .format('YYYYMMDD')
    );
    const nextWeekEndDate = parseInt(
        moment(dateSelected)
            .endOf('isoWeek')
            .add(7, 'days')
            .format('YYYYMMDD')
    );

    return _.filter(timeEntries, t => t.date >= previousWeekStartDate && t.date <= nextWeekEndDate);
}

export function populateTimeEntries(timeEntries, projects) {
    console.info(`%cpopulateTimeEntries: running`, 'color: green');
    if (_.isNil(timeEntries) || _.isNil(projects)) {
        return [];
    }

    return timeEntries.map(timeEntry => ({
        ...timeEntry,
        project: _.find(projects, p => p.id === timeEntry.project_uid.id)
    }));
}