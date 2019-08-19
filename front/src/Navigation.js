import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import { AuthUserContext } from 'utils/session';

import LandingPage from 'containers/LandingPage';
import HomePage from 'containers/HomePage';

function Navigation(props) {
    const authUser = useContext(AuthUserContext);

    if (authUser) {
        return (
            <Router>
                <>
                    <Route path="/" component={HomePage} />
                </>
            </Router>
        );
    } else {
        return (
            <Router>
                <>
                    <Route path="/login" component={LandingPage} />
                    <Route path="/signup" component={LandingPage} />
                    <Redirect to="/login" />
                </>
            </Router>
        );
    }
}

export default Navigation;
