export const FETCH_ARTICLES = 'FETCH_ARTICLES';
export const TOGGLE_FAVORITES = 'TOGGLE_FAVORITES';

export const fetchArticles = () => {
	return async (dispatch) => {
		// add logic to fetch data
		const result = await fetch(
			'http://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=40dd709612784220b441caa95e930651'
		);

		const resultData = await result.json();

		dispatch({
			type: FETCH_ARTICLES,
			payload: resultData,
		});
	};
};

// we need to pass the ID of the news we want to add to favorites to this function
// thats how we can see the item we want to add to favorite
// in the data of article we don't have id, but the unique prop is url so we use url to identify the news we want to add to favorite
export const toggleFavorites = (url) => {
	//actions needs to return a js object with type and payload
	return {
		type: TOGGLE_FAVORITES,
		payload: url,
	};
};
