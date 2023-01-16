import {
  View,
  Text,
  ActivityIndicator,
  Appearance,
  FlatList,
  StyleSheet,
  StatusBar,
} from 'react-native';
import React from 'react';
import {useContacts} from '../../Context/ContactContext';
import ContactUI from './ContactUI';
import {DEVICE_WIDTH} from '../../App';

export const Contact = () => {
  const {contactsFromPhone, contactLoader} = useContacts();

  console.log(contactsFromPhone);
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {contactLoader ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size={'large'} color="#809" />
        </View>
      ) : (
        <View>
          <FlatList data={contactsFromPhone} renderItem={ContactUI} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: DEVICE_WIDTH * 0.02,
  },
  loaderContainer: {flex: 1, justifyContent: 'center'},
});

export default ContactUI;
