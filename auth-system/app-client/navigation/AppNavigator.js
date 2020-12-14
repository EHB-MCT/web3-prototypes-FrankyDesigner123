import React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import TaskDetailsScreen from '../screens/TaskDetailsScreen';
import AddTaskScreen from '../screens/AddTaskScreen';

import { MaterialIcons } from '@expo/vector-icons';

// init createStackNavigator
const Stack = createStackNavigator();
// init bottomTabNavigator
const Tab = createBottomTabNavigator();

function AuthNavigator() {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="Login"
				component={LoginScreen}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="Register"
				component={RegisterScreen}
				options={{ headerShown: false }}
			/>
		</Stack.Navigator>
	);
}

function ProfileNavigator() {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="Profile"
				component={ProfileScreen}
				options={{ title: 'Profile', headerLeft: null }}
			/>
		</Stack.Navigator>
	);
}

function HomeNavigator() {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="Home"
				component={HomeScreen}
				options={{ title: 'Task List', headerLeft: null }}
			/>
			<Stack.Screen
				name="TaskDetails"
				component={TaskDetailsScreen}
				options={{ title: 'Task Details' }}
			/>
			<Stack.Screen
				name="AddTask"
				component={AddTaskScreen}
				options={{ title: 'Add Task' }}
			/>
		</Stack.Navigator>
	);
}

function TabsNavigator() {
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				tabBarIcon: () => {
					let iconName;
					if (route.name == 'Home') {
						iconName = 'home';
					} else if (route.name == 'Profile') {
						iconName = 'account-circle';
					}

					return <MaterialIcons name={iconName} size={22} />;
				},
			})}
		>
			<Tab.Screen
				name="Home"
				component={HomeNavigator}
				options={{ title: 'Task List' }}
			/>
			<Tab.Screen name="Profile" component={ProfileNavigator} />
		</Tab.Navigator>
	);
}

// Root Navigator
function AppNavigator() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen
					name="Authentication"
					component={AuthNavigator}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="Application"
					component={TabsNavigator}
					options={{ headerShown: false }}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default AppNavigator;
