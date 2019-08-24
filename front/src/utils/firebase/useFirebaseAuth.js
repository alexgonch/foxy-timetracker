import { useState, useEffect } from 'react';

import firebase from 'utils/firebase';

const useFirebaseAuth = () => {
    const [authUserLoading, setAuthUserLoading] = useState(true);
    const [authUser, setAuthUser] = useState(null);

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged(authUser => {
            setAuthUserLoading(false);
            authUser ? setAuthUser(authUser) : setAuthUser(null);
        });
        return () => unsubscribe();
    }, []);

    return { authUser, authUserLoading };
};

export default useFirebaseAuth;
