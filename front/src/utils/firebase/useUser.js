import { useState, useEffect } from 'react';

const useUser = (firebase) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = firebase.db
            .collection('users')
            .doc(firebase.auth.currentUser ? firebase.auth.currentUser.uid : 'FIXME') // FIXME
            .onSnapshot(
                doc => {
                    setLoading(false);
                    setUser(doc.data());
                },
                err => {
                    setError(err);
                }
            );
        return () => unsubscribe();
    }, [firebase.db, firebase.auth.currentUser]);

    return { loading, error, user };
};

export default useUser;
