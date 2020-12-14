import React, { useState } from 'react';
import {
	StyleSheet,
	View,
	Text,
	KeyboardAvoidingView,
	Image,
	TextInput,
	TouchableOpacity,
	Platform,
	Alert,
	ActivityIndicator,
} from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import * as authAction from '../redux/actions/authAction';
import AsyncStorage from '@react-native-async-storage/async-storage';

const formSchema = yup.object({
	email: yup.string().email().required(),
	password: yup.string().required().min(6),
});

const LoginScreen = (navData) => {
	const [isLoading, setIsLoading] = useState(false);
	if (isLoading) {
		return (
			<View style={styles.centered}>
				<ActivityIndicator size="large" />
			</View>
		);
	}

	const dispatch = useDispatch();
	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			style={{ flex: 1 }}
		>
			<Formik
				initialValues={{
					email: '',
					password: '',
				}}
				onSubmit={(values) => {
					// load spinner
					setIsLoading(true);
					dispatch(authAction.loginUser(values))
						.then(async (result) => {
							setIsLoading(false);
							console.log(result);
							if (result.success) {
								// store a value
								try {
									await AsyncStorage.setItem('token', result.token);
									navData.navigation.navigate('Application');
								} catch (err) {
									console.log(err);
								}
							} else {
								setIsLoading(false);
								Alert.alert(result.message);
							}
						})
						.catch((err) => console.log(err));
				}}
				validationSchema={formSchema}
			>
				{(props) => (
					<View style={styles.container}>
						<View style={styles.logo}>
							<Image
								style={styles.image}
								source={require('../assets/images/ninja_v2.png')}
							/>
						</View>

						<View>
							<TextInput
								style={styles.input}
								placeholder="Email"
								placeholderTextColor="#fff"
								keyboardType="email-address"
								onChangeText={props.handleChange('email')}
								value={props.values.email}
								onBlur={props.handleBlur('email')}
							/>
							<Text style={styles.errorText}>
								{props.touched.email && props.errors.email}
							</Text>
							<TextInput
								style={styles.input}
								placeholder="Password"
								placeholderTextColor="#fff"
								secureTextEntry={true}
								onChangeText={props.handleChange('password')}
								value={props.values.password}
								onBlur={props.handleBlur('password')}
							/>
							<Text style={styles.errorText}>
								{props.touched.password && props.errors.password}
							</Text>

							<TouchableOpacity
								style={styles.button}
								onPress={props.handleSubmit}
							>
								<Text style={styles.buttonText}>Login</Text>
							</TouchableOpacity>

							<View style={styles.registerContainer}>
								<Text style={styles.registerText}>Don't have account?</Text>
								<TouchableOpacity
									onPress={() => navData.navigation.navigate('Register')}
								>
									<Text style={styles.registerButton}>Register</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				)}
			</Formik>
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#fff',
	},
	logo: {
		alignItems: 'center',
		marginBottom: 40,
	},
	image: {
		width: 100,
		height: 100,
	},
	input: {
		width: 300,
		backgroundColor: '#B6BFC4',
		borderRadius: 25,
		padding: 16,
		fontSize: 16,
		marginVertical: 10,
	},
	button: {
		width: 300,
		backgroundColor: '#738289',
		borderRadius: 25,
		marginVertical: 10,
		paddingVertical: 13,
	},
	buttonText: {
		fontSize: 16,
		fontWeight: '500',
		color: '#fff',
		textAlign: 'center',
	},
	registerContainer: {
		alignItems: 'flex-end',
		justifyContent: 'center',
		paddingVertical: 16,
		flexDirection: 'row',
	},
	registerText: {
		color: '#738289',
		fontSize: 16,
	},
	registerButton: {
		color: '#738289',
		fontSize: 16,
		fontWeight: 'bold',
	},
	errorText: {
		color: 'red',
	},
	centered: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default LoginScreen;
