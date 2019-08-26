import { useState, useEffect } from 'react';

import firebase, { db } from 'utils/firebase';

const useDbUser = () => {
    const [userLoading, setUserLoading] = useState(true);
    const [userError, setUserError] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = db
            .collection('users')
            .doc(firebase.auth().currentUser.uid)
            .onSnapshot(
                documentSnapshot => {
                    setUser(documentSnapshot.data());
                    setUserLoading(false);
                    console.info('%cuseDbUser: 1 document read', 'color: blue');
                },
                err => {
                    setUserError(err);
                    console.error(err);
                }
            );
        return () => {
            unsubscribe();
            console.info('%cuseDbUser: unsubscribed', 'color: blue');
        };
    }, []);

    return { userLoading, userError, user };
};

export default useDbUser;
