import React, {useEffect} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {
  StatusBar,
  StyleSheet,
  useColorScheme,
  Dimensions,
  AppState,
} from 'react-native';
import BackgroundService from 'react-native-background-actions';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import StackNavigator from './navigation/StackNavigator';
import {Login} from './screens/Login/Login';
import Password from './screens/Password/Password';
import {ContactContextProvider} from './Context/ContactContext';
import {DeviceEventEmitter, Platform} from 'react-native';
import {AuthenticationContextProvider} from './Context/AuthContext';

export const DEVICE_HEIGHT = Dimensions.get('window').height;
export const DEVICE_WIDTH = Dimensions.get('window').width;

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {}, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <AuthenticationContextProvider>
        <ContactContextProvider>
          <StackNavigator />
        </ContactContextProvider>
      </AuthenticationContextProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
