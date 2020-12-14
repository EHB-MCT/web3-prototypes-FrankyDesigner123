import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { useSelector } from 'react-redux'; // we can fetch data from the state

import Card from '../Components/Card';

const FavoritesScreen = (props) => {
	//this will return the items that has been added to the favorite state
	const favorites = useSelector((state) => state.news.favorites);

	// display list of Favorite using FLatList
	return (
		<FlatList
			data={favorites} //data we want to pass to FlatList is favorites
			keyExtractor={(item) => item.url}
			renderItem={({ item }) => (
				<Card
					navigation={props.navigation}
					title={item.title}
					image={item.urlToImage}
					description={item.description}
					url={item.url} //unique prop from article, id does not exist
				/>
			)}
		/>
	);
};

const styles = StyleSheet.create({});

export default FavoritesScreen;
