import React, { useState, useContext, useMemo } from 'react';

import _ from 'lodash';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import NewProject from './NewProject';
import Project from './Project';
import ProjectDialog from './ProjectDialog';

import { DbProjectsContext, DbTimeEntriesContext } from 'utils/firebase';
import { orderAndFilterAndPopulateProjects } from './functions';

// TODO: in future, archived projects should go into a separate List and have an un-archive option as action
function Projects(props) {
    const [projectDialogOpen, setProjectDialogOpen] = useState(false);
    const [projectSelectedId, setProjectSelectedId] = useState(null);
    const [showArchivedProjects, setShowArchivedProjects] = useState(false);

    const { projects } = useContext(DbProjectsContext);
    const { timeEntries } = useContext(DbTimeEntriesContext);

    const handleCreateProject = () => {
        setProjectDialogOpen(true);
        setProjectSelectedId(null);
    };

    const handleEditProject = id => {
        setProjectDialogOpen(true);
        setProjectSelectedId(id);
    };

    const projectSelected = _.find(projects, p => p.id === projectSelectedId);
    const orderedAndFilteredProjects = useMemo(
        () => orderAndFilterAndPopulateProjects(projects, timeEntries, showArchivedProjects),
        [projects, timeEntries, showArchivedProjects]
    );

    return (
        <Box p={2}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={showArchivedProjects}
                                onChange={() => setShowArchivedProjects(!showArchivedProjects)}
                                color="primary"
                            />
                        }
                        label="Show archived projects"
                    />
                </Grid>
                <Grid item xs={12} sm={6} lg={4} xl={3} zeroMinWidth>
                    <NewProject onActionClick={handleCreateProject} />
                </Grid>
                {orderedAndFilteredProjects.map(project => (
                    <Grid key={project.id} item xs={12} sm={6} lg={4} xl={3} zeroMinWidth>
                        <Project {...project} onActionClick={() => handleEditProject(project.id)} />
                    </Grid>
                ))}
            </Grid>

            <ProjectDialog
                open={projectDialogOpen}
                project={projectSelected}
                onClose={() => setProjectDialogOpen(false)}
            />
        </Box>
    );
}

export default Projects;
