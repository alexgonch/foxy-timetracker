import React from 'react';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import NewProject from './NewProject';
import Project from './Project';

// TEMP
const projects = [
    {
        id: 100,
        createdAt: new Date('2019-08-17T04:28:20Z'),
        title: 'Foxy TimeTracker',
        creator: 'John Doe',
        tags: ['Customer Support', 'Software Development', 'Administration']
    },
    {
        id: 200,
        createdAt: new Date('2019-08-21T22:10:04Z'),
        title: 'Real-time Doggo Map',
        creator: 'Kevin McDoggo',
        tags: []
    }
];

function Projects(props) {
    const handleCreateProject = () => {
        // stub
    };
    
    const handleEditProject = id => {
        // stub
    };

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
        </Box>
    );
}

export default Projects;
