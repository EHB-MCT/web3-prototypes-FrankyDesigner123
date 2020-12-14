import React, { useState } from 'react';
import {
	StyleSheet,
	Text,
	TextInput,
	View,
	Button,
	ScrollView,
} from 'react-native';

import Header from './src/components/Header';

export default function App() {
	const [todoItem, setTodoItem] = useState('');
	const [todoList, setTodoList] = useState([]);

	const addTodoList = () => {
		setTodoList([...todoList, todoItem]);
		console.log(todoList);
	};
	return (
		<View>
			<Header title="Todo List" />
			<View style={styles.container}>
				<View>
					<TextInput
						style={styles.textInput}
						placeholder="Enter To do Item"
						onChangeText={(text) => setTodoItem(text)}
						value={todoItem}
					/>
				</View>
				<Button title="Create Todo" onPress={addTodoList} />

				<ScrollView>
					{todoList.map((todo) => (
						<View key={todo} style={styles.todoItem}>
							<Text>{todo}</Text>
						</View>
					))}
				</ScrollView>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingTop: 50,
		padding: 40,
	},
	textInput: {
		padding: 10,
		borderColor: 'black',
		marginBottom: 10,
		borderWidth: 1,
	},
	todoItem: {
		marginTop: 10,
		padding: 20,
		backgroundColor: '#f2f2f2',
		borderRadius: 10,
		borderWidth: 1,
		borderColor: 'gray',
	},
});
