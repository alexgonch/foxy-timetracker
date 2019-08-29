import _ from 'lodash';

export function getInitialValues(project) {
    if (_.isNil(project)) {
        return {
            name: ''
        };
    } else {
        return {
            name: project.name
        };
    }
}

export function orderAndFilterAndPopulateProjects(projects, timeEntries, showArchived) {
    const filteredProjects = showArchived ? projects : _.filter(projects, p => !p.archived);
    const orderedProjects = _.orderBy(filteredProjects, p => p.created_at.toDate(), 'desc');
    orderedProjects.forEach(project => (project.total_time = 0));
    timeEntries.forEach(timeEntry => {
        const project = _.find(orderedProjects, p => p.id === timeEntry.project_uid.id);
        if (!_.isNil(project)) {
            project.total_time += timeEntry.time;
        }
    });

    return orderedProjects;
}
