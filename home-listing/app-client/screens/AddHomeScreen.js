import React, { useState } from 'react';
import {
	StyleSheet,
	View,
	Text,
	ScrollView,
	TextInput,
	Button,
	KeyboardAvoidingView,
	Alert,
	ActivityIndicator,
} from 'react-native';

// import Formik
import { Formik } from 'formik';

// import yup
import * as yup from 'yup';

// import useDispatch
import { useDispatch } from 'react-redux';

// import all actions from houseAction
import * as houseAction from '../redux/actions/houseAction';

// Validation Schema for form
const formSchema = yup.object({
	title: yup.string().required().min(3).max(50),
	price: yup.number().required(),
	yearBuilt: yup.number().required(),
	image: yup.string().required(),
	address: yup.string().required().min(10).max(50),
	description: yup.string().required().min(10),
	homeType: yup.string().required(),
});

const AddHomeScreen = () => {
	// create loading spinner state
	const [isLoading, setIsLoading] = useState(false);

	// logic when to show spinner
	if (isLoading) {
		return (
			<View style={styles.centered}>
				<ActivityIndicator size="large" />
			</View>
		);
	}

	// init useDispatch, we can now dispatch action when Formik button is clicked
	const dispatch = useDispatch();

	return (
		<KeyboardAvoidingView
			behavior="padding"
			keyboardVerticalOffset={100}
			style={{ flex: 1 }}
		>
			<ScrollView>
				{/* formik form */}
				<Formik
					// these are mandotary props this values corresponds with the datainpit from the form
					initialValues={{
						title: '',
						image: '',
						homeType: '',
						price: '',
						yearBuilt: '',
						address: '',
						description: '',
					}}
					//
					onSubmit={(values) => {
						// when req is made loadin is true
						setIsLoading(true);
						dispatch(houseAction.createHome(values))
							.then(() => {
								// react-native alert component
								setIsLoading(false);
								Alert.alert('Created succesfully.');
							})
							.catch(() => {
								setIsLoading(false);
								Alert.alert('An error occurred. Try Again.', [{ text: 'OK' }]);
							});
					}}
					validationSchema={formSchema} // pass the validation schema we created
				>
					{(props) => (
						<View style={styles.form}>
							<View style={styles.formGroup}>
								<Text style={styles.label}>Title:</Text>
								<TextInput
									style={styles.input}
									// handle the values change of the textInput (this is a prop from Formik)
									onChangeText={props.handleChange('title')}
									value={props.values.title}
									// onBlur .handleBlur when you click and leave the field it will show error
									onBlur={props.handleBlur('title')}
								/>
								{/* error text */}
								<Text style={styles.errorText}>
									{/* props.touched show error when user clicks on input */}
									{props.touched.title && props.errors.title}
								</Text>
							</View>

							<View style={styles.formGroup}>
								<Text style={styles.label}>Image URL:</Text>
								<TextInput
									style={styles.input}
									onChangeText={props.handleChange('image')}
									value={props.values.image}
									onBlur={props.handleBlur('image')}
								/>
								<Text style={styles.errorText}>
									{props.touched.image && props.errors.image}
								</Text>
							</View>

							<View style={styles.formGroup}>
								<Text style={styles.label}>HomeType:</Text>
								<TextInput
									style={styles.input}
									onChangeText={props.handleChange('homeType')}
									value={props.values.homeType}
									onBlur={props.handleBlur('homeType')}
								/>
								<Text style={styles.errorText}>
									{props.touched.homeType && props.errors.homeType}
								</Text>
							</View>

							<View style={styles.formGroup}>
								<Text style={styles.label}>Price:</Text>
								<TextInput
									style={styles.input}
									keyboardType="numeric"
									onChangeText={props.handleChange('price')}
									value={props.values.price}
									onBlur={props.handleBlur('price')}
								/>
								<Text style={styles.errorText}>
									{props.touched.price && props.errors.price}
								</Text>
							</View>

							<View style={styles.formGroup}>
								<Text style={styles.label}>Year Built:</Text>
								<TextInput
									multiline
									style={styles.input}
									keyboardType="numeric"
									onChangeText={props.handleChange('yearBuilt')}
									value={props.values.yearBuilt}
									onBlur={props.handleBlur('yearBuilt')}
								/>
								<Text style={styles.errorText}>
									{props.touched.yearBuilt && props.errors.yearBuilt}
								</Text>
							</View>

							<View style={styles.formGroup}>
								<Text style={styles.label}>Address:</Text>
								<TextInput
									style={styles.input}
									onChangeText={props.handleChange('address')}
									value={props.values.address}
									onBlur={props.handleBlur('address')}
								/>
								<Text style={styles.errorText}>
									{props.touched.address && props.errors.address}
								</Text>
							</View>

							<View style={styles.formGroup}>
								<Text style={styles.label}>Description</Text>
								<TextInput
									multiline
									style={styles.input}
									onChangeText={props.handleChange('description')}
									value={props.values.description}
									onBlur={props.handleBlur('description')}
								/>
								<Text style={styles.errorText}>
									{props.touched.description && props.errors.description}
								</Text>
							</View>

							<View>
								<Button
									title="Add Home"
									onPress={props.handleSubmit} // submit the form .handleSubmit is a prop from Formik
									style={styles.buttonContainer}
								/>
							</View>
						</View>
					)}
				</Formik>
			</ScrollView>
		</KeyboardAvoidingView>
	);
};
const styles = StyleSheet.create({
	form: {
		margin: 20,
		backgroundColor: '#fff',
		padding: 20,
		borderRadius: 10,
	},
	formGroup: {
		width: '100%',
	},
	label: {
		marginVertical: 10,
	},
	input: {
		paddingHorizontal: 2,
		paddingVertical: 8,
		borderBottomColor: '#ccc',
		borderBottomWidth: 1,
	},
	buttonContainer: {
		marginTop: 20,
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

export default AddHomeScreen;
