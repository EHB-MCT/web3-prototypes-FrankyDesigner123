import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';

import * as newsAction from '../redux/actions/newsAction';

const Card = (props) => {
	// console.log(props);

	// init useDispatch
	const dispatch = useDispatch();
	const isFav = useSelector(
		(state) => state.news.favorites.some((article) => article.url === props.url) //this gives us array of items that exist in favorites
		// .some(boolean) (article)=> article.url ===props.url
		// some returns true or false depending if the item exists in favorites
	);

	return (
		<TouchableOpacity
			onPress={() => {
				// param 1 = screenName, param 2 = object
				// setup route name of the screen we want to navigate
				// with this approach we can setup the params
				props.navigation.navigate('NewsDetails', {
					//we pass a unique item and we fetch the item from the state
					articleUrl: props.url,
				});
			}}
		>
			<View style={styles.card}>
				<View style={styles.imageWrapper}>
					<Image
						source={{
							uri: props.image
								? props.image
								: 'https://image.freepik.com/free-vector/glitch-error-404-page_23-2148105404.jpg',
						}}
						style={styles.image}
					/>
				</View>

				<View style={styles.titleWrapper}>
					<Text style={styles.title}>
						{props.title && props.title.length > 25
							? props.title.slice(0, 25) + ' ...'
							: props.title}
					</Text>
					<MaterialIcons
						name={isFav ? 'favorite' : 'favorite-border'}
						color="#72bcd4"
						size={24}
						// we need to pass a function that triggers when the icon is pressed
						onPress={() => {
							//in the body we want to dispatch the action -> need to important {useDispatch} from react-redux
							//also need to import the action we need to trigger from newsAction

							//when the icon is pressed we want to dispatch our action, we make use of dispatch and pass the newsAction
							dispatch(newsAction.toggleFavorites(props.url)); //toggleFavorite takes a url
						}}
					/>
				</View>

				<View style={styles.descriptionWrapper}>
					<Text style={styles.description}>
						{props.description && props.description.length > 130
							? props.description.slice(0, 130) + ' ...'
							: props.description}
					</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	card: {
		backgroundColor: '#fff',
		height: 300,
		margin: 20,
		borderRadius: 10,
		shadowColor: '#000',
		shadowOpacity: 0.25,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 8,
		elevation: 5,
	},
	imageWrapper: {
		width: '100%',
		height: '60%',
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		overflow: 'hidden',
	},
	image: {
		width: '100%',
		height: '100%',
	},
	titleWrapper: {
		height: '10%',
		paddingHorizontal: 15,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginTop: 10,
	},
	title: {
		fontFamily: 'Roboto-Bold',
		fontSize: 20,
	},
	descriptionWrapper: {
		paddingHorizontal: 15,
	},
	description: {
		fontFamily: 'Roboto-Light',
		fontSize: 15,
		marginTop: 10,
	},
});
export default Card;
