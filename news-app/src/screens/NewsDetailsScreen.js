import React from 'react';
import { StyleSheet, View, Text, ImageBackground } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';

import * as newsAction from '../redux/actions/newsAction';

const NewsDetailsScreen = (props) => {
	//init dispatch
	const dispatch = useDispatch();

	// get params from articleUrl, we can get the data that is passed as param to this component
	// the data we want to get is articleUrl
	const { articleUrl } = props.route.params;

	//fetch article from the state, import useSelector from React-redux
	const article = useSelector((state) =>
		// if article matches the unique id article
		state.news.articles.articles.find((article) => article.url === articleUrl)
	);

	const isFav = useSelector(
		(state) =>
			state.news.favorites.some((article) => article.url === article.url) //this gives us array of items that exist in favorites
		// .some(boolean) (article)=> article.url ===props.url
		// some returns true or false depending if the item exists in favorites
	);

	return (
		<View style={styles.container}>
			<View style={styles.heading}>
				<Text style={styles.title}>{article.title}</Text>
			</View>

			<View>
				<ImageBackground
					style={styles.image}
					source={{ uri: article.urlToImage }}
				>
					<View style={styles.titleContainer}>
						<Text style={styles.author}>{article.author}</Text>
						<MaterialIcons
							name={isFav ? 'favorite' : 'favorite-border'}
							color="#72bcd4"
							size={24}
							// we need to pass a function that triggers when the icon is pressed
							onPress={() => {
								//in the body we want to dispatch the action -> need to important {useDispatch} from react-redux
								//also need to import the action we need to trigger from newsAction

								//when the icon is pressed we want to dispatch our action, we make use of dispatch and pass the newsAction
								dispatch(newsAction.toggleFavorites(article.url)); //toggleFavorite takes a url
							}}
						/>
					</View>
				</ImageBackground>
			</View>

			<View style={styles.description}>
				<Text style={styles.descriptionText}>{article.description}</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginVertical: 20,
	},
	heading: {
		marginHorizontal: 20,
		marginBottom: 10,
	},
	title: {
		fontFamily: 'Roboto-Bold',
		fontSize: 24,
	},
	image: {
		width: '100%',
		height: 200,
		justifyContent: 'flex-end',
	},
	titleContainer: {
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		paddingHorizontal: 10,
		paddingVertical: 5,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	author: {
		fontFamily: 'Roboto-Regular',
		fontSize: 20,
		color: 'white',
	},
	description: {
		margin: 10,
	},
	descriptionText: {
		fontSize: 20,
		fontFamily: 'Roboto-Regular',
	},
});

export default NewsDetailsScreen;
