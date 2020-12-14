import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import authReducer from './reducers/authReducer';
import taskReducer from './reducers/taskReducer';

const rootReducer = combineReducers({
	auth: authReducer,
	task: taskReducer,
});

const middleware = composeWithDevTools(applyMiddleware(thunk));

export default createStore(rootReducer, middleware);
