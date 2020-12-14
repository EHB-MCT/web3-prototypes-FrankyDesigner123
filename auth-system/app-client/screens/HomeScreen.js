import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { FloatingAction } from 'react-native-floating-action';
import { useDispatch, useSelector } from 'react-redux';

import Card from './components/card';
import * as taskAction from '../redux/actions/taskAction';

const HomeScreen = (props) => {
	const dispatch = useDispatch();

	const { tasks } = useSelector((state) => state.task);

	useEffect(() => {
		dispatch(taskAction.fetchTasks());
	}, [dispatch]);

	return (
		<View style={styles.container}>
			<FlatList
				data={tasks}
				keyExtractor={(item) => item._id}
				renderItem={({ item }) => (
					<Card
						navigation={props.navigation}
						title={item.title}
						course={item.course}
						description={item.description}
						id={item._id}
					/>
				)}
			/>

			<FloatingAction
				animated={false}
				showBackground={false}
				position="right"
				onPressMain={() => props.navigation.navigate('AddTask')}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

export default HomeScreen;
