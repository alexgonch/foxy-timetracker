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

export function getSelectableProjects(timeEntry, projects) {
    const filteredProjects = _.filter(projects, p => !p.archived || p.id === _.get(timeEntry, 'project_uid.id', null));
    return _.orderBy(filteredProjects, p => p.created_at.toDate(), 'desc');
}

export function filterTimeEntries(timeEntries, weekSelected, weekFormat) {
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
