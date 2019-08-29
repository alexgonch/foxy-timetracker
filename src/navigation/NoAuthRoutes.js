import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Login from 'containers/Login';
import Signup from 'containers/Signup';

function NoAuthRoutes(props) {
    return (
        <Switch>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Redirect to="/login" />
        </Switch>
    );
}

export default NoAuthRoutes;
