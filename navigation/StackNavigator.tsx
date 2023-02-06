import React from 'react';
import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Login} from '../screens/Login/Login';
import {PasswordScreen} from '../screens/Password/Password';
import {Contact} from '../screens/ContactListing/Contact';
import {ContactDetails} from '../screens/ContactDetails/ContactDetails';
import {AddContact} from '../screens/AddContact/AddContact';
import {TabNavigation} from './TabNavigator';
import {useAuth} from '../Context/AuthContext';
import {ForgetPassword} from '../screens/ForgetPassword/ForgetPassword';
import {Name} from '../screens/CreateCard/Name';
import {Work} from '../screens/CreateCard/Work';
import {ImageUpload} from '../screens/CreateCard/Image';
import {UserCardView} from '../screens/UserCardView/UserCardView';
import {PublicPrivate} from '../screens/CreateCard/PublicPrivate';
import {Url} from '../screens/CreateCard/Url';
const Stack = createNativeStackNavigator();
const authenticated = false;
const StackNavigator = () => {
  const {authenticated} = useAuth();

  // console.log(authenticated);

  return (
    <NavigationContainer>
      {authenticated ? (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="HomeScreen" component={TabNavigation} />
          <Stack.Screen name="ContactDetails" component={ContactDetails} />
          <Stack.Screen name="Add Contact" component={AddContact} />
          <Stack.Screen name="CreateCardName" component={Name} />
          <Stack.Screen name="CreateCardWork" component={Work} />
          <Stack.Screen name="CreateCardImage" component={ImageUpload} />
          <Stack.Screen name="CreateCardPublic" component={PublicPrivate} />
          <Stack.Screen name="CreateCardUrl" component={Url} />
          <Stack.Screen name="UserCardView" component={UserCardView} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="LoginScreen" component={Login} />
          <Stack.Screen name="PassWordScreen" component={PasswordScreen} />
          <Stack.Screen name="ForgotPassword" component={ForgetPassword} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default StackNavigator;
