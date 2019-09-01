import { useMemo } from 'react';

import _ from 'lodash';

import { processTimeEntries, addColorsToProjects } from '../functions';

function useProcessedData(lightThemeEnabled, timeEntries, projects, projectIdsUnchecked) {
    const timeEntriesProcessed = useMemo(() => processTimeEntries(timeEntries), [timeEntries]); // floors seconds in time

    const { timeEntriesPopulated, projectsFromTimeEntriesProcessed } = useMemo(
        () => getPreFilteredData(timeEntriesProcessed, projects),
        [projects, timeEntriesProcessed]
    );
    const projectsWithColors = addColorsToProjects(lightThemeEnabled, projectsFromTimeEntriesProcessed);
    // Pre-filtered data ends here (will be used in Stats)

    const { timeEntriesFiltered, projectsFiltered } = useMemo(
        () => getPostFilteredData(timeEntriesPopulated, projectsWithColors, projectIdsUnchecked),
        [projectsWithColors, timeEntriesPopulated, projectIdsUnchecked]
    );
	// Post-filtered data ends here (will be used in TimeChart)

    return {
        timeEntriesInChart: timeEntriesFiltered,
        projectsInChart: projectsFiltered,
        projectsInStats: projectsWithColors
    };
}

export default useProcessedData;

function getPreFilteredData(timeEntries, projects) {
    const timeEntriesPopulated = [];
    const projectsFromTimeEntriesProcessed = [];

    for (let timeEntry of timeEntries) {
        const correspondingProject = _.find(projects, p => p.id === timeEntry.project_uid.id);
        if (_.isNil(correspondingProject)) {
            continue;
        }

        timeEntry.project = correspondingProject;
        if (!projectsFromTimeEntriesProcessed.map(p => p.id).includes(correspondingProject.id)) {
			correspondingProject.totalTime = timeEntry.time;
            projectsFromTimeEntriesProcessed.push(correspondingProject);
        } else {
			correspondingProject.totalTime += timeEntry.time;
		}

        timeEntriesPopulated.push(timeEntry);
    }

    return { timeEntriesPopulated, projectsFromTimeEntriesProcessed };
}

function getPostFilteredData(timeEntries, projects, projectIdsUnchecked) {
    const timeEntriesFiltered = [];
	timeEntries.forEach(timeEntry => {
		if (!projectIdsUnchecked.includes(timeEntry.project.id)) {
			timeEntriesFiltered.push(timeEntry);
		}
	});
	
	const projectsFiltered = _.filter(projects, p => !projectIdsUnchecked.includes(p.id));
	
	return { timeEntriesFiltered, projectsFiltered };
}
