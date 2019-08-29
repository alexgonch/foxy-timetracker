import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Projects from 'containers/Projects';
import Time from 'containers/Time';
import Reports from 'containers/Reports';
import Account from 'containers/Account';
import NotFound from 'components/NotFound';

function AuthRoutes(props) {
    return (
        <Switch>
            <Route exact path="/" component={Projects} />
            <Route path="/time/:date" component={Time} />
            <Route exact path="/reports" component={Reports} />
            <Route exact path="/account" component={Account} />
            <Redirect from="/login" to="/" />
            <Redirect from="/signup" to="/" />
            <Route component={NotFound} />
        </Switch>
    );
}

export default AuthRoutes;
