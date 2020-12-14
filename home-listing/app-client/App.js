import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// to provide the store to the entire app we need Provider
import { Provider } from 'react-redux';

// import AppNavigator
import AppNavigator from './navigation/AppNavigator';

// import the store from redux
import store from './redux/store';

export default function App() {
	return (
		// Wrap the whole app with provider component
		// here we can set the store property to the store we created
		// now the store is available for the entire app
		<Provider store={store}>
			<AppNavigator />
		</Provider>
	);
}

const styles = StyleSheet.create({});
