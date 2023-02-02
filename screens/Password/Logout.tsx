import {View, Text, Button, DevSettings} from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Logout = () => {
  handleLogout = () => {
    console.log('clicke');
    AsyncStorage.clear();
  };

  return (
    <View>
      <Text>Logout</Text>
      <Button
        title="Logout"
        onPress={() => {
          AsyncStorage.clear();
          DevSettings.reload();
          console.log('clear');
        }}
      />
    </View>
  );
};

export default Logout;
