import React, { useEffect, useState } from 'react';
import {
	StyleSheet,
	View,
	Text,
	FlatList,
	ActivityIndicator,
} from 'react-native';

// import the FloatingAction component from the package
import { FloatingAction } from 'react-native-floating-action';

// useDispatch to use the dispatch from action
import { useDispatch, useSelector } from 'react-redux';

// import card component
import Card from '../components/Card';

// import all actions from houseAction
import * as houseACtion from '../redux/actions/houseAction';

const HomeListScreen = (props) => {
	// init useDispatch
	const dispatch = useDispatch();

	const [isLoading, setIsLoading] = useState(false);

	// this contains the array of data
	const { houses } = useSelector((state) => state.house);

	// dispatch action when components renders so we need useEffect
	useEffect(() => {
		setIsLoading(true);
		dispatch(houseACtion.fetchHouses())
			.then(() => setIsLoading(false))
			.catch(() => setIsLoading(false));
	}, [dispatch]);

	if (isLoading) {
		return (
			<View style={styles.centered}>
				<ActivityIndicator size="large" />
			</View>
		);
	}

	// if there are no data in the list then show text
	if (houses.length === 0 && !isLoading) {
		return (
			<View style={styles.centered}>
				<Text>No home found. You could add one!</Text>
				<FloatingAction
					position="right"
					animated={false}
					showBackground={false}
					onPressMain={() => props.navigation.navigate('AddHome')}
				/>
			</View>
		);
	}
	return (
		<View style={styles.container}>
			{/* render card with data in FlatList */}
			<FlatList
				data={houses}
				keyExtractor={(item) => item._id}
				renderItem={({ item }) => (
					<Card
						navigation={props.navigation}
						title={item.title}
						address={item.address}
						homeType={item.homeType}
						description={item.description}
						price={item.price}
						image={item.image}
						yearBuilt={item.yearBuilt}
						id={item._id} //to get access to the props._id
					/>
				)}
			/>

			<FloatingAction
				position="right"
				animated={false}
				showBackground={false}
				onPressMain={() => props.navigation.navigate('AddHome')}
			/>
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	centered: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default HomeListScreen;
