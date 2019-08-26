import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import moment from 'moment';

import Projects from 'containers/Projects';
import Time from 'containers/Time';
import Account from 'containers/Account';
import NotFound from 'components/NotFound';

function AuthRoutes(props) {
    return (
        <Switch>
            <Route exact path="/" component={Projects} />
            <Route path="/time/:date" component={Time} />
            <Route exact path="/account" component={Account} />
            <Redirect from="/login" to="/" />
            <Redirect from="/time" to={`/time/${moment().format('YYYYMMDD')}`} />
            <Route component={NotFound} />
        </Switch>
    );
}

export default AuthRoutes;
