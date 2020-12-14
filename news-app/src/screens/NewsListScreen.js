import React, { useEffect } from 'react';
import { StyleSheet, FlatList, View, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import Card from '../Components/Card';
import * as newsAction from '../redux/actions/newsAction';

const NewsListScreen = (props) => {
	// console.log(props);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(newsAction.fetchArticles());
	}, [dispatch]);

	const { articles } = useSelector((state) => state.news.articles);
	console.log(articles);

	return (
		<FlatList
			data={articles}
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

export default NewsListScreen;
