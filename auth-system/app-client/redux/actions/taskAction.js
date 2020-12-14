export const FETCH_TASKS = 'FETCH_TASKS';
export const CREATE_TASKS = 'CREATE_TASKS';

export const fetchTasks = () => {
	return async (dispatch) => {
		// add logic to fetch tasks from API
		const result = await fetch('http://192.168.1.63:3000/api/tasks/');
		// convert result to json
		const resultData = await result.json();

		dispatch({
			type: FETCH_TASKS,
			payload: resultData,
		});
	};
};

export const createTask = ({ title, course, description }) => {
	return async (dispatch) => {
		const response = await fetch('http://192.168.1.63:3000/api/tasks/todo', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				title,
				course,
				description,
			}),
		});

		const responseData = await response.json();

		dispatch({
			type: CREATE_TASKS,
			payload: responseData,
		});
	};
};
