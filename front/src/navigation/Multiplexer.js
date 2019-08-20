import React, { useContext } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { AuthUserContext } from 'utils/session';

import FullPageLoader from 'components/Loaders/FullPageLoader';
import LandingPage from 'containers/LandingPage';
import MainPage from 'containers/MainPage';

// Handles high-level routing based on authentication state
function Multiplexer(props) {
    const authUser = useContext(AuthUserContext);

    if (authUser === undefined) {
        return <FullPageLoader />;
    } else if (authUser === null) {
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
