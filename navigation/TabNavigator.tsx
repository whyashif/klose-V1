import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Dialer} from '../Dialer/Dialer';
import BackgroundRun from '../screens/BackgroundRun';
import CallLogsScreen from '../screens/CallLogs/CallLogs';
import {Contact} from '../screens/ContactListing/Contact';
import {Login} from '../screens/Login/Login';
import {NotificationScreen} from '../screens/Notification/Notification';
import Logout from '../screens/Password/Logout';
import {UserCards} from '../screens/UserCards/UserCards';

const Tab = createBottomTabNavigator();

export const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen name="Contacts" component={Contact} />
      <Tab.Screen name="My Cards" component={UserCards} />
      <Tab.Screen name="Dialer" component={Dialer} />
      <Tab.Screen name="Call logs" component={CallLogsScreen} />
      <Tab.Screen name="LogOut" component={Logout} />
      <Tab.Screen name="Notification" component={NotificationScreen} />
    </Tab.Navigator>
  );
};
