import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const Card = (props) => {
	return (
		<TouchableOpacity
			onPress={() =>
				props.navigation.navigate('TaskDetails', { taskId: props.id })
			}
		>
			<View style={styles.card}>
				<View style={styles.titleContainer}>
					<Text style={styles.title}>
						{props.title.length > 40
							? props.title.slice(0, 40) + ' ...'
							: props.title}
					</Text>
					<View style={styles.course}>
						<Text style={styles.courseText}>{props.course}</Text>
					</View>
				</View>

				<View style={styles.description}>
					<Text style={styles.descriptionText}>{props.description}</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	card: {
		shadowColor: 'black',
		shadowOpacity: 0.25,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 8,
		borderRadius: 10,
		backgroundColor: '#fff',
		elevation: 5,
		height: 200,
		margin: 10,
	},
	titleContainer: {
		height: '35%',
		padding: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: '#ecf0f1',
	},
	title: {
		fontSize: 18,
		fontWeight: 'bold',
		color: 'gray',
	},
	course: {
		margin: 10,
		backgroundColor: '#2652b0',
		height: 35,
		width: 100,
		borderRadius: 5,
	},
	courseText: {
		fontSize: 12,
		color: '#fff',
		textAlign: 'center',
		marginTop: 8,
	},
	description: {
		height: '65%',
		padding: 10,
		marginTop: 15,
	},
	descriptionText: {
		fontSize: 16,
		color: 'gray',
	},
});

export default Card;
