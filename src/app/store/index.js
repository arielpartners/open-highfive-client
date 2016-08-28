import {createStore, applyMiddleware, compose} from 'redux';
import {createEpicMiddleware} from 'redux-observable';
import {browserHistory} from 'react-router';
import {routerMiddleware} from 'react-router-redux';
import {autoRehydrate} from 'redux-persist';

import rootReducer from '../reducers';
import rootEpic from '../epics';

const epicMiddleware = createEpicMiddleware(rootEpic);

export default function configureStore() {
    const store = createStore(
        rootReducer,
        compose(
            autoRehydrate(),
            applyMiddleware(
                epicMiddleware,
                routerMiddleware(browserHistory)
            ),
            window.devToolsExtension ? window.devToolsExtension() : f => f
        )
    );

    /* istanbul ignore next */
    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            const nextReducer = require('../reducers').default;
            store.replaceReducer(nextReducer);
        });
        // Enable Webpack hot module replacement for epics
        module.hot.accept('../epics', () => {
            const nextEpic = require('../epics').default;
            epicMiddleware.replaceEpic(nextEpic);
        });
    }

    return store;
}
