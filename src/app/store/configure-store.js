import { createStore, compose, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { autoRehydrate } from 'redux-persist';

import rootReducer from '../reducers';
import rootEpic from '../epics';

const EpicMiddleware = createEpicMiddleware(rootEpic);
export default function configureStore(initialState) {
    let finalCreateStore = compose(
        applyMiddleware(EpicMiddleware),
        autoRehydrate(),
        global.devToolsExtension ?
            /* istanbul ignore next  */
            global.devToolsExtension() :
            f => f
    )(createStore);

    const store = finalCreateStore(rootReducer, initialState);

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
            store.replaceEpic(nextEpic);
        });
    }

    return store;
}
