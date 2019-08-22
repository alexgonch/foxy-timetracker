import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Projects from 'containers/Projects';
import Time from 'containers/Time';
import Account from 'containers/Account';
import NotFound from 'components/NotFound';

function AuthRoutes(props) {
    return (
        <Switch>
            <Route exact path="/" component={Projects} />
            <Route path="/time" component={Time} />
            <Route exact path="/account" component={Account} />
            <Redirect from="/login" to="/" />
            <Route component={NotFound} />
        </Switch>
    );
}

export default AuthRoutes;
