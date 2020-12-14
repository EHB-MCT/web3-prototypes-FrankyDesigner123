// define the action we want to handle
export const FETCH_HOUSES = 'FETCH_HOUSES';
export const CREATE_HOUSES = 'CREATE_HOUSES';

// fetch req action
export const fetchHouses = () => {
	// dispatch function to fetchHouses function
	return async (dispatch) => {
		// add logic to fetch houses from API
		const result = await fetch('http://192.168.1.63:3000/api/houses');
		const resultData = await result.json();
		// console.log(resultData);

		// action needs to return an object with type and payload
		dispatch({
			type: FETCH_HOUSES,
			payload: resultData,
		});
	};
};

// post req action
export const createHome = ({
	// data from Formik Form values that is an object
	title,
	image,
	homeType,
	price,
	yearBuilt,
	address,
	description,
}) => {
	// async function to dispatch action
	return async (dispatch) => {
		// add logic to post form to API
		const response = await fetch('http://192.168.1.63:3000/api/houses', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json', // we want to make req in json format
			},
			body: JSON.stringify({
				// takes object where we specify data we want to pass to request
				title,
				image,
				homeType,
				price,
				yearBuilt,
				address,
				description,
			}),
		});

		// convert data to json
		const responseData = await response.json();

		// dispatch the action (type + payload)
		dispatch({
			type: CREATE_HOUSES,
			payload: responseData,
		});
	};
};
