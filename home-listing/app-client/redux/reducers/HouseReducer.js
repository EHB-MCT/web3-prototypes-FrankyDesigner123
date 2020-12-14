// import action
import { CREATE_HOUSES, FETCH_HOUSES } from '../actions/houseAction';

// define the slices of states we use in app (houses)
const initialState = {
	houses: [],
};

// reducers are pure javascript functions with 2 params (current state and action)
export default function (state = initialState, action) {
	// we need to handle action.type when its triggered
	switch (action.type) {
		case FETCH_HOUSES:
			return {
				...state,
				houses: action.payload, // we pass the data from payload to houses-state
			};
		case CREATE_HOUSES:
			// console.log(action.payload.data);
			return {
				...state,
				// add data to the houses array
				houses: state.houses.concat(action.payload.data), // we make use of .concat() to add data that is passed form action.payload to houses array
			};
	}
	//current state
	return state;
}
