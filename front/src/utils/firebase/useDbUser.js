import { useState, useEffect } from 'react';

import firebase from 'utils/firebase';

const useDbUser = () => {
    const [userLoading, setUserLoading] = useState(true);
    const [userError, setUserError] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = firebase
            .firestore()
            .collection('users')
            .doc(firebase.auth().currentUser.uid)
            .onSnapshot(
                doc => {
                    setUser(doc.data());
                    setUserLoading(false);
                },
                err => {
                    setUserError(err);
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
