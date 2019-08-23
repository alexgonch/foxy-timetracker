import { useState, useEffect } from 'react';

const useFirebaseAuthentication = firebase => {
    const [authUser, setAuthUser] = useState(undefined);

    useEffect(() => {
        const unlisten = firebase.auth.onAuthStateChanged(authUser => {
            authUser ? setAuthUser(authUser) : setAuthUser(null);
        });
        return () => {
            unlisten();
        };
    }, [firebase]);

    return authUser;
};

export default useFirebaseAuthentication;
