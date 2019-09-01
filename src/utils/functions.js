import _ from 'lodash';

export function populateTimeEntries(timeEntries, projects) {
    if (_.isNil(timeEntries) || _.isNil(projects)) {
        return [];
    }

    const timeEntriesPopulated = timeEntries.map(timeEntry => ({
        ...timeEntry,
        project: _.find(projects, p => p.id === timeEntry.project_uid.id)
    }));

    timeEntriesPopulated.forEach(timeEntry => {
        if (!_.isNil(timeEntry.project)) {
            _.set(timeEntry, 'project.id', timeEntry.project_uid.id);
        }
    });

    return timeEntriesPopulated;
}
