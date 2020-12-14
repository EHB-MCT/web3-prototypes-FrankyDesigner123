// import createStore, ApplyMiddleware and combineReducers comopnent from the redux package
import { createStore, applyMiddleware, combineReducers } from 'redux';
// import thunk from react-redux for async operations
import thunk from 'redux-thunk';
// for debugging
import { composeWithDevTools } from 'redux-devtools-extension';

// setup store, it require the reducer
import HouseReducer from './reducers/HouseReducer';

// here we make a rootReducer with a combine of different reducers
const rootReducer = combineReducers({
	house: HouseReducer,
});

// create middleware for handling async operations
// thunk is the middleware we want to use
const middleware = composeWithDevTools(applyMiddleware(thunk));

// now we can create the store
// 1st param: rootReducer, 2nd param: middleware
// export the store so we can use it in app.js
export default createStore(rootReducer, middleware);
