import React, { useContext } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { AuthUserContext } from 'utils/firebase';

import FullPageLoader from 'components/Loaders/FullPageLoader';
import LandingPage from 'containers/LandingPage';
import MainPage from 'containers/MainPage';

// Handles high-level routing based on authentication state
function Multiplexer(props) {
    const { authUserLoading, authUser } = useContext(AuthUserContext);

    if (authUserLoading) {
        return <FullPageLoader />;
    } else if (!authUser) {
        return (
            <Router>
                <LandingPage />
            </Router>
        );
    } else {
        return (
            <Router>
                <MainPage />
            </Router>
        );
    }
}

export default Multiplexer;
