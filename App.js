import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import Login from './app/screens/Login.jsx'; // replace with the actual path to your Login component
import AdminPage from './app/screens/AdminPage.jsx'; // replace with the actual path to your AdminPage component
import UserPage from './app/screens/UserPage.jsx'; // replace with the actual path to your UserPage component 
import HomePage from './app/screens/HomePage.jsx'; // replace with the actual path to your HomePage component
import Leaderboard from './app/screens/Leaderboard.jsx';
import Settings from './app/screens/Settings.jsx';
import SignUp from './app/screens/SignUp.jsx';
import Schedule from './app/screens/Schedule.jsx';
import { useFonts } from "expo-font";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const [fontsLoaded, error] = useFonts({
  "Poppins-SemiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
  "Inter-Bold": require("./assets/fonts/Inter-Bold.ttf"),
});

if (!fontsLoaded && !error) {
  return null;
}

function BottomTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="HomePage" component={HomePage} options={{headerShown: false}} />
      <Tab.Screen name="Leaderboard" component={Leaderboard} options={{headerShown: false}} />
      <Tab.Screen name="Settings" component={Settings} options={{headerShown: false}} />

    </Tab.Navigator>
  );

}

/*function UserStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="User" component={UserPage} />
    </Stack.Navigator>
  );
}*/

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
        <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }}/>
        <Stack.Screen name="App" component={BottomTabNavigator} options={{ headerShown: false }}/>
        <Stack.Screen name="Schedule" component={Schedule} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});