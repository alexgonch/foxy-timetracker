import React, { useState, useContext } from 'react';

import _ from 'lodash';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import NewProject from './NewProject';
import Project from './Project';
import ProjectDialog from './ProjectDialog';

import { DbProjectsContext } from 'utils/firebase';

// TODO: in future, archived projects should go into a separate List and have an un-archive option as action
function Projects(props) {
    const [projectDialogOpen, setProjectDialogOpen] = useState(false);
    const [projectSelectedId, setProjectSelectedId] = useState(null);
    
    const { projects } = useContext(DbProjectsContext);
    
    const handleCreateProject = () => {
        setProjectDialogOpen(true);
        setProjectSelectedId(null);
    };
    
    const handleEditProject = id => {
        setProjectDialogOpen(true);
        setProjectSelectedId(id);
    };
    
    const projectSelected = _.find(projects, project => project.id === projectSelectedId);

    return (
        <Box p={2}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} lg={4} xl={3} zeroMinWidth>
                    <NewProject onActionClick={handleCreateProject} />
                </Grid>
                {_.orderBy(projects, project => project.created_at.toDate(), 'desc').map(project => (
                    <Grid key={project.id} item xs={12} sm={6} lg={4} xl={3} zeroMinWidth>
                        <Project {...project} onActionClick={() => handleEditProject(project.id)} />
                    </Grid>
                ))}
            </Grid>
            
            <ProjectDialog open={projectDialogOpen} project={projectSelected} onClose={() => setProjectDialogOpen(false)} />
        </Box>
    );
}

export default Projects;
