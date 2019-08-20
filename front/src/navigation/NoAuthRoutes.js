import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import LoginForm from 'components/Forms/LoginForm';
import SignupForm from 'components/Forms/SignupForm';

function NoAuthRoutes(props) {
    return (
        <Switch>
            <Route path="/login" component={LoginForm} />
            <Route path="/signup" component={SignupForm} />
            <Redirect to="/login" />
        </Switch>
    );
}

export default NoAuthRoutes;
