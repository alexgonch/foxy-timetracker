import _ from 'lodash';

export function getInitialValues(project) {
    if (_.isNil(project)) {
        return {
            name: '',
            tag: ''
        };
    } else {
        return {
            name: project.name,
            tag: ''
        };
    }
}
