import {View, Text, StyleSheet, Linking, Image} from 'react-native';
import React from 'react';
import {DEVICE_HEIGHT, DEVICE_WIDTH} from '../../App';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ContactUI = ({item, index}) => {
  const phoneHandler = phone => {
    // Linking.openURL(`tel:${phone}`)
    RNImmediatePhoneCall.immediatePhoneCall(phone);
    // console.log('jello');
  };
  const emailHandler = email => {
    Linking.openURL(`mailto:${email}`);
  };

  return (
    <View style={styles.container} key={index}>
      <View style={styles.imageContainer}>
        {/* <Text style={{color: '#000'}}>Image</Text> */}
        {item.thumbnailPath ? (
          <Image
            source={{uri: item.thumbnailPath}}
            style={{
              height: 60,
              width: 60,
              resizeMode: 'cover',
              borderRadius: 50,
            }}
          />
        ) : (
          <View
            style={{
              height: 60,
              width: 60,
              backgroundColor: '#F1E9FD',
              borderRadius: 50,
              display: 'flex',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: 'grey',
                fontSize: 45,
                textAlign: 'center',
              }}>
              {item.givenName[0]}
            </Text>
          </View>
        )}
      </View>
      <View>
        <Text style={styles.contactName}>{item.givenName}</Text>
        <Text style={styles.contactDetails}>Developer</Text>
        <Text style={styles.contactDetails}>Why,Gurugram</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={styles.iconContainer}>
            <FontAwesome5 name="sms" size={DEVICE_HEIGHT * 0.03} />
          </View>
          <View style={styles.iconContainer}>
            <FontAwesome5
              name="whatsapp"
              // onPress={() =>
              //   sendTextMessage(item?.phoneNumbers[0]?.number, message)
              // }
              size={DEVICE_HEIGHT * 0.03}
            />
          </View>
          <View style={styles.iconContainer}>
            <Feather
              name="phone-call"
              onPress={() => phoneHandler(item?.phoneNumbers[0]?.number)}
              size={DEVICE_HEIGHT * 0.03}
            />
          </View>
          <View style={styles.iconContainer}>
            <Ionicons
              name="mail-outline"
              // onPress={() => {
              //   Linking.openURL(
              //     `mailto:${item.emailAddresses[0]?.email}?subject=testing&body=${message}`,
              //   );
              // }}
              size={DEVICE_HEIGHT * 0.03}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    padding: DEVICE_HEIGHT * 0.02,
    margin: 5,
    borderWidth: 2,
    borderColor: '#F1E9FD',
  },

  loaderContainer: {flex: 1, justifyContent: 'center'},
  imageContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: DEVICE_HEIGHT * 0.03,
  },
  iconContainer: {
    backgroundColor: 'rgba(136, 16, 152, 0.03)',
    padding: 8,
    margin: 5,
    borderRadius: 4,
  },
  contactName: {
    color: 'black',
    fontSize: DEVICE_HEIGHT * 0.02,
    fontFamily: 'Avenir-Heavy',
  },
  contactDetails: {
    color: 'black',
    fontSize: DEVICE_HEIGHT * 0.015,
    fontFamily: 'Avenir-Medium',
  },
});

export default ContactUI;
