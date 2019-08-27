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

export function orderAndFilterProjects(projects, showArchived) {
    const filteredProjects = showArchived ? projects : _.filter(projects, p => !p.archived);
    return _.orderBy(filteredProjects, p => p.created_at.toDate(), 'desc');
}
