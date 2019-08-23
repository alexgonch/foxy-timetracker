import React, { useState } from 'react';

import _ from 'lodash';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import NewProject from './NewProject';
import Project from './Project';
import ProjectDialog from './ProjectDialog';

// TEMP faking Firestore data
const projects = [
    {
        id: 100,
        createdAt: new Date('2019-08-17T04:28:20Z'),
        name: 'Foxy TimeTracker',
        tags: ['Customer Support', 'Software Development', 'Administration'],
        totalTime: 3600 * 3 + 60 * 24 + 1 * 30 // 3 hr 24 min 30 sec
    },
    {
        id: 200,
        createdAt: new Date('2019-08-21T22:10:04Z'),
        name: 'Real-time Doggo Map',
        tags: [],
        totalTime: 0
    }
];

function Projects(props) {
    const [projectDialogOpen, setProjectDialogOpen] = useState(false);
    const [projectSelectedId, setProjectSelectedId] = useState(null);
    
    const handleCreateProject = () => {
        setProjectDialogOpen(true);
        setProjectSelectedId(null);
    };
    
    const handleEditProject = id => {
        setProjectDialogOpen(true);
        setProjectSelectedId(id);
    };
    
    const projectSelected = _.find(projects, project => project.id === projectSelectedId); // REVIEW: verify how this works with real-time updates in Firestore

    return (
        <Box p={2}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} lg={4} xl={3} zeroMinWidth>
                    <NewProject onActionClick={handleCreateProject} />
                </Grid>
                {projects.slice().reverse().map(project => (
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
