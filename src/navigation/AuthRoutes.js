import React from 'react';
import { withRouter, Switch, Route, Redirect } from 'react-router-dom';

import Projects from 'containers/Projects';
import Time from 'containers/Time';
import Reports from 'containers/Reports';
import Account from 'containers/Account';
import NotFound from 'components/NotFound';

import { generateToTime } from './locations';

function AuthRoutes(props) {
    const { activeProjectsExist, location } = props;

    return (
        <Switch>
            <Route exact path="/" component={Projects} />
            <Route exact path="/time" component={Time} />
            <Route exact path="/reports" component={Reports} />
            <Route exact path="/account" component={Account} />
            <Redirect from="/login" to={activeProjectsExist ? generateToTime(location) : '/'} />
            <Redirect from="/signup" to={activeProjectsExist ? generateToTime(location) : '/'} />
            <Route component={NotFound} />
        </Switch>
    );
}

export default withRouter(AuthRoutes);
