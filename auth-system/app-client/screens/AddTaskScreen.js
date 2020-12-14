import React from 'react';
import {
	StyleSheet,
	View,
	Text,
	ScrollView,
	TextInput,
	Button,
	KeyboardAvoidingView,
	Alert,
} from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import * as taskAction from '../redux/actions/taskAction';

const taskValidationSchema = yup.object({
	title: yup.string().required().min(3).max(50),
	course: yup.string().required().min(3).max(50),
	description: yup.string().required().min(3).max(50),
});

const AddTaskScreen = () => {
	const dispatch = useDispatch();

	return (
		<KeyboardAvoidingView
			behavior="padding"
			keyboardVerticalOffset={100}
			style={{ flex: 1 }}
		>
			<ScrollView>
				<Formik
					initialValues={{
						title: '',
						course: '',
						desription: '',
					}}
					onSubmit={(values) => {
						console.log(values);
						dispatch(taskAction.createTask(values))
							.then(() => {
								Alert.alert('Task created succesfully.');
							})
							.catch(() => {
								Alert.alert('An error occurred. Try Again', [{ text: 'OK' }]);
							});
					}}
					validationSchema={taskValidationSchema}
				>
					{(props) => (
						<View style={styles.form}>
							<View style={styles.formGroup}>
								<Text style={styles.label}>Title:</Text>
								<TextInput
									style={styles.inputField}
									onChangeText={props.handleChange('title')}
									onBlur={props.handleBlur('title')}
									value={props.values.title}
								/>
								<Text style={styles.errorText}>
									{props.touched.title && props.errors.title}
								</Text>
							</View>

							<View style={styles.formGroup}>
								<Text style={styles.label}>Course:</Text>
								<TextInput
									style={styles.inputField}
									onChangeText={props.handleChange('course')}
									onBlur={props.handleBlur('course')}
									value={props.values.course}
								/>
								<Text style={styles.errorText}>
									{props.touched.course && props.errors.course}
								</Text>
							</View>

							<View style={styles.formGroup}>
								<Text style={styles.label}>Description:</Text>
								<TextInput
									style={styles.inputField}
									onChangeText={props.handleChange('description')}
									onBlur={props.handleBlur('description')}
									value={props.values.description}
								/>
								<Text style={styles.errorText}>
									{props.touched.desription && props.errors.description}
								</Text>
							</View>

							<View style={styles.buttonContainer}>
								<Button title="Add Task" onPress={props.handleSubmit} />
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
	inputField: {
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
});

export default AddTaskScreen;
