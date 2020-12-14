import { FETCH_ARTICLES, TOGGLE_FAVORITES } from '../actions/newsAction';

const initialState = {
	articles: [],
	favorites: [],
};
export default function (state = initialState, action) {
	switch (action.type) {
		case FETCH_ARTICLES:
			return {
				...state,
				articles: action.payload,
			};
		case TOGGLE_FAVORITES:
			// Add or remove item from favorite

			// if the url in the payload matches any of the url of the lsit of favorite, means that the item already exists and returns the index of item
			const index = state.favorites.findIndex(
				(article) => article.url === action.payload // this payload is the url of the item we want to add to favorite (from newsAction)
			);

			if (index >= 0) {
				// item exists in favorites
				// if the item already exists in favorite, we need to remove it

				//[...state.favorites]  create copy of the favorites we have in states
				const favorites = [...state.favorites]; // we want never want to directly modify the data we have in the state
				favorites.splice(index, 1); //splice remove item from the copy favorites array. We need to pass the index also the number of item

				return {
					...state,
					favorites: favorites,
				};
			} else {
				// item does not exists in favorites, we need to add it

				// we need to get the item we want to add to favorite
				const article = state.articles.articles.find(
					(article) => article.url === action.payload //find the article we want to add to favorites
				);

				//when we get the article we can add it to favorite
				//return object with copy of the state
				return {
					...state,
					favorites: state.favorites.concat(article), //overwrite the favorite
					//concat is used for adding the article to the array of favorite
				};
			}
	}
	return state;
}
