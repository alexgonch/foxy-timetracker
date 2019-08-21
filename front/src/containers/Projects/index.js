import React from 'react';

import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
// import { useTheme } from '@material-ui/core/styles';

import Project from './Project';

// TEMP
const projects = [
    {
        id: 0,
        createdAt: new Date('2019-08-17T04:28:20Z'),
        title: 'Foxy TimeTracker'
    },
    {
        id: 1,
        createdAt: new Date('2019-08-21T22:10:04Z'),
        title: 'Real-time Doggo Map'
    }
];

function Projects(props) {
    // const theme = useTheme();

    return (
        <Box p={2}>
            <Box maxWidth={540}>
                <List>
                    {projects.map(project => (
                        <ListItem key={project.id}>
                            <Project {...project} />
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Box>
    );
}

export default Projects;
