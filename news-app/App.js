import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { Provider } from 'react-redux';
import AppNavigator from './src/navigation/AppNavigator';
import store from './src/redux/store';

const loadFonts = () => {
	return Font.loadAsync({
		'Roboto-Light': require('./assets/fonts/Roboto-Light.ttf'),
		'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
	});
};

export default function App() {
	const [fontLoaded, setFontLoaded] = useState(false);

	if (!fontLoaded) {
		return (
			<AppLoading startAsync={loadFonts} onFinish={() => setFontLoaded(true)} />
		);
	}
	return (
		<Provider store={store}>
			<AppNavigator />
		</Provider>
	);
}

const styles = StyleSheet.create({});
