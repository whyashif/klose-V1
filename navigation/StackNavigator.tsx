import React from 'react';
import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Login} from '../screens/Login/Login';
import Password from '../screens/Password/Password';
import {Contact} from '../screens/ContactListing/Contact';
import {ContactDetails} from '../screens/ContactDetails/ContactDetails';
import {AddContact} from '../screens/AddContact/AddContact';
import {TabNavigation} from './TabNavigator';
const Stack = createNativeStackNavigator();
const authenticated = false;
const StackNavigator = () => {
  // const {authenticated} = useAuth();
  // console.log(authenticated);
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {/* <Stack.Screen name="Login" component={Login} /> */}
        {/* <Stack.Screen name="Password" component={Password} /> */}
        <Stack.Screen name="Contacts" component={TabNavigation} />
        <Stack.Screen name="ContactDetails" component={ContactDetails} />
        <Stack.Screen name="Add Contact" component={AddContact} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
