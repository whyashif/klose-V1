import React from 'react';
import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { Login } from '../screens/Login/Login';
import Password from '../screens/Password/Password';
import { Contact } from '../screens/Contact/Contact';
// import {TabNavigation} from '../Components/Navigation/TabNavigation';
// import {CreateContactScreen} from '../Screens/CreateContact/CreateContactScreen';
// import {ProfileScreen} from '../Screens/Profile/ProfileScreen';
// import {Login} from '../Screens/Login/Login';
// import {LoginScreen} from '../Screens/Login/LoginScreen';
// import {PasswordScreen} from '../Screens/Password/PasswordScreen';
// import {Name} from '../Screens/CreateCards/Name';
// import {HomeScreen} from '../Screens/Home/HomeScreen';
// import {Work} from '../Screens/CreateCards/Work';
// import {ImageUpload} from '../Screens/CreateCards/Image';
// import {Card} from '../Screens/CreateCards/Card';
// import {Url} from '../Screens/CreateCards/Url';
// import {CreateCard} from '../Screens/CreateCards/CreateCard';
// import {useAuth} from '../context/useAuth';
// import {CustomizeCard} from '../Screens/CustomizeCard/CustomizeCard';
// import {EditCardNavigator} from './EditCardNavigator';
// import {ProfileEdit} from '../Screens/SettingsPanel/ProfileEdit';
// import {BottomSheet} from '../Screens/CustomizeCard/BottomSheet';
// import {UserCard} from '../Screens/UserCard/UserCard';
// import {KloseContact} from '../Screens/KloseContact/KloseContact';
// import {KloseContactProfile} from '../Screens/KloseContactProfile/KloseContactProfile';

const Stack = createNativeStackNavigator();
const authenticated = false
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
          <Stack.Screen name="Contacts" component={Contact} />
        </Stack.Navigator>
     
    </NavigationContainer>

  );
};

export default StackNavigator;