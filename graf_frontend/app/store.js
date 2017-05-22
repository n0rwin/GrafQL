import reducers from 'reducers';
import { compose, createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { persistState } from 'redux-devtools';
import DevToolComponent from 'testifyHelpers/DevToolComponent';

const reducer = combineReducers(reducers);

const createStoreWithMiddleware = compose(
    applyMiddleware(
        thunkMiddleware
    ),
    DevToolComponent.instrument(),
    persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
    )(createStore);

const store = createStoreWithMiddleware(reducer);

export default store;