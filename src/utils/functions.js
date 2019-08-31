import _ from 'lodash';

export function populateTimeEntries(timeEntries, projects) {
    if (_.isNil(timeEntries) || _.isNil(projects)) {
        return [];
    }

    return timeEntries.map(timeEntry => ({
        ...timeEntry,
        project: _.find(projects, p => p.id === timeEntry.project_uid.id)
    }));
}
