import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from 'containers/Home';
import Activities from 'containers/Activities';
import Account from 'containers/Account';
import NotFound from 'components/NotFound';

function AuthRoutes(props) {
    return (
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/activities" component={Activities} />
            <Route exact path="/account" component={Account} />
            <Route component={NotFound} />
        </Switch>
    );
}

export default AuthRoutes;
