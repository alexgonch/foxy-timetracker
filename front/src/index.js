import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import Firebase, { FirebaseContext } from './firebase';

import * as serviceWorker from './serviceWorker';

import './index.css';

ReactDOM.render(
    <FirebaseContext.Provider value={new Firebase()}>
        <App />
    </FirebaseContext.Provider>,
    document.getElementById('root')
);

serviceWorker.unregister();
