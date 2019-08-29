import { useState, useEffect } from 'react';

// import moment from 'moment';

import firebase, { db } from 'utils/firebase';

const useDbTimeEntries = () => {
    const [timeEntriesLoading, setTimeEntriesLoading] = useState(true);
    const [timeEntriesError, setTimeEntriesError] = useState(false);
    const [timeEntries, setTimeEntries] = useState(null);
    
    useEffect(() => {
        const currentUserRef = db.collection('users').doc(firebase.auth().currentUser.uid);
        // const date30DaysAgo = parseInt(moment().subtract(30, 'days').format('YYYYMMDD'));
		
        const unsubscribe = db
            .collection('time_entries')
            .where('owner_uid', '==', currentUserRef)
            // .where('date', '>=', date30DaysAgo)
            .onSnapshot(
                querySnapshot => {
                    let timeEntries = [];
                    querySnapshot.forEach(doc => {
						let timeEntry = doc.data();
						timeEntry.id = doc.id;
                        timeEntries.push(timeEntry);
                    });
                    setTimeEntries(timeEntries);
                    setTimeEntriesLoading(false);
					console.info(`%cuseDbTimeEntries: ${querySnapshot.docChanges().length} document(s) read`, 'color: blue');
                },
                err => {
                    setTimeEntriesError(err);
                    console.error(err);
                }
            );
        return () => {
            unsubscribe();
            console.info('%cuseDbTimeEntries: unsubscribed', 'color: blue');
        };
    }, []);

    return { timeEntriesLoading, timeEntriesError, timeEntries };
};

export default useDbTimeEntries;
