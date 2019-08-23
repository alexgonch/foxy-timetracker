import React, { useContext } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { AuthUserContext, UserContext } from 'utils/session';

import FullPageLoader from 'components/Loaders/FullPageLoader';
import LandingPage from 'containers/LandingPage';
import MainPage from 'containers/MainPage';

// TODO: implement an initialisation property instead of checking for undefined
// Handles high-level routing based on authentication state
function Multiplexer(props) {
    const authUser = useContext(AuthUserContext);
    const user = useContext(UserContext);

    if (authUser === undefined || !user) {
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
