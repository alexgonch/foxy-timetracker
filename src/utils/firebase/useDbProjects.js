import { useState, useEffect } from 'react';

import firebase, { db } from 'utils/firebase';

const useDbProjects = () => {
    const [projectsLoading, setProjectsLoading] = useState(true);
    const [projectsError, setProjectsError] = useState(false);
    const [projects, setProjects] = useState(null);

    useEffect(() => {
        const currentUserRef = db.collection('users').doc(firebase.auth().currentUser.uid);
		
        const unsubscribe = db
            .collection('projects')
            .where('owner_uid', '==', currentUserRef)
            .onSnapshot(
                querySnapshot => {
                    let projects = [];
                    querySnapshot.forEach(doc => {
						let project = doc.data();
						project.id = doc.id;
                        projects.push(project);
                    });
                    setProjects(projects);
                    setProjectsLoading(false);
					console.info(`%cuseDbProjects: ${querySnapshot.docChanges().length} document(s) read`, 'color: blue');
                },
                err => {
                    setProjectsError(err);
                    console.error(err);
                }
            );
        return () => {
            unsubscribe();
            console.info('%cuseDbProjects: unsubscribed', 'color: blue');
        };
    }, []);

    return { projectsLoading, projectsError, projects };
};

export default useDbProjects;
