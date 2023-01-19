import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  Dimensions,
  ActivityIndicator,
  ScrollView,
  Button,
  Settings,
  Pressable,
  Linking,
  Platform,
} from 'react-native';
import {DEVICE_HEIGHT, DEVICE_WIDTH} from '../../App';
import {Contact} from 'react-native-contacts';
import Feather from 'react-native-vector-icons/Feather';
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export const ContactDetails = ({navigation, route}) => {
  console.log(route.params.item, 'param data....................');
  const {
    thumbnailPath,
    birthday,
    givenName,
    jobTitle,
    company,
    phoneNumbers,
    emailAddresses,
    note,
  } = route.params.item;
  //   const {name, jobtitle, company, profileimagepath} = useData().oneCardData;
  // console.log(name, 'name');
  // useEffect(() => {}, [useData]);

  const phoneHandler = phone => {
    // Linking.openURL(`tel:${phone}`)
    RNImmediatePhoneCall.immediatePhoneCall(phone);
    // console.log('jello');
  };
  const emailHandler = email => {
    Linking.openURL(`mailto:${email}`);
  };

  const whatsAppHandler = phone => {
    Linking.openURL(`whatsapp://send?text=hello&phone=${phone}`);
  };

  const sendTextMessage = useCallback(async (phNumber, message) => {
    const separator = Platform.OS === 'ios' ? '&' : '?';
    const url = `sms:${phNumber}${separator}body=${message}`;
    await Linking.openURL(url);
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          height: DEVICE_HEIGHT * 0.04,
          marginBottom: 5,

          // margin: 10,
        }}>
        <Pressable
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            navigation.goBack();
          }}>
          <Image
            // style={{ display: "hidden" }}
            source={require('./../../assets/login/Back.png')}
            style={{
              alignSelf: 'center',
              padding: 10,
            }}
          />
          <Text
            style={{
              fontSize: 20,
              color: '#881098',
              fontWeight: 'bold',
              marginHorizontal: 10,
            }}>
            {givenName}
          </Text>
        </Pressable>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
            width: 60,
            height: 30,
            borderRadius: 16,
            // borderBottomLeftRadius: 8,

            borderColor: '#881098',
          }}>
          <TouchableOpacity>
            <Text
              style={{
                fontSize: 12,
                color: '#881098',
                fontWeight: 'bold',
                // marginHorizontal: 10,
              }}>
              Edit
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
        <View>
          {/* image */}
          {thumbnailPath === '' ? (
            <View>
              <Image
                source={require('./../../assets/default/Rectangle.png')}
                style={styles.image}
              />
              <View style={styles.overlay} />
            </View>
          ) : (
            <View>
              <Image source={{uri: thumbnailPath}} style={styles.image} />
              <View style={styles.overlay} />
            </View>
          )}

          {/* <View style={styles.overlay} /> */}
          <View
            style={{
              position: 'absolute',
              bottom: DEVICE_HEIGHT * 0.03,
            }}>
            <Text style={styles.header}>{givenName}</Text>
            {jobTitle ? (
              <Text style={styles.body}>{jobTitle}</Text>
            ) : (
              <Text style={styles.body}>Work Info not available</Text>
            )}
            {company ? <Text style={styles.body}>{company}</Text> : null}
            {/* <Text style={styles.body}>{jobTitle}</Text> */}
          </View>
        </View>
        <View style={{padding: 10}}>
          <View style={styles.aboutContainer}>
            {/* about */}
            <Image
              source={require('./../../assets/social-icons/quotation-marks.png')}
              style={{position: 'absolute', top: -10}}
            />
            <Text
              style={{
                fontFamily: 'Avenir-Heavy',
                fontSize: DEVICE_HEIGHT * 0.02,
                color: 'grey',
              }}>
              {note}
            </Text>
          </View>
          {phoneNumbers.length !== 0 ? (
            <View style={styles.aboutContainer}>
              {phoneNumbers.map(number => {
                return (
                  <View>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          fontFamily: 'Avenir-Heavy',
                          fontSize: DEVICE_HEIGHT * 0.02,
                          color: 'grey',
                        }}>
                        {number.number.replace(/\s+/g, '')}
                      </Text>
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <Feather
                          name="phone-call"
                          onPress={() => phoneHandler(number.number)}
                          size={DEVICE_HEIGHT * 0.03}
                          color="#881098"
                          style={{marginHorizontal: DEVICE_WIDTH * 0.02}}
                        />
                        <FontAwesome5
                          name="whatsapp"
                          size={DEVICE_HEIGHT * 0.03}
                          color="#881098"
                          onPress={() => whatsAppHandler(number.number)}
                          style={{marginHorizontal: DEVICE_WIDTH * 0.02}}
                        />
                        <FontAwesome5
                          name="sms"
                          size={DEVICE_HEIGHT * 0.03}
                          color="#881098"
                          onPress={() =>
                            sendTextMessage(number.number, 'Sent using Klose: ')
                          }
                          style={{marginHorizontal: DEVICE_WIDTH * 0.02}}
                        />
                      </View>
                    </View>
                    <View style={styles.lineSeparator} />
                  </View>
                );
              })}
            </View>
          ) : null}

          {emailAddresses.length !== 0 ? (
            <View style={styles.aboutContainer}>
              {emailAddresses.map(email => {
                return (
                  <View>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={{
                          fontFamily: 'Avenir-Heavy',
                          fontSize: DEVICE_HEIGHT * 0.02,
                          color: 'grey',
                        }}>
                        {email.email}
                      </Text>
                      <View>
                        <Ionicons
                          name="mail-outline"
                          onPress={() => emailHandler(email.email)}
                          size={DEVICE_HEIGHT * 0.03}
                          color="#881098"
                        />
                      </View>
                    </View>
                    <View style={styles.lineSeparator} />
                  </View>
                );
              })}
            </View>
          ) : null}

          {/* </View> */}

          {/* details */}

          {/* Social Container */}
          <View style={{marginTop: 20}}>
            <View style={styles.socialChild}>
              <View style={styles.socialChildContainer}>
                <Pressable
                // onPress={() => navigation.navigate('Edit Profile')}
                >
                  <Image
                    source={require('./../../assets/social-icons/icons/Facebook.png')}
                    style={styles.socialIcon}
                  />
                </Pressable>
              </View>
              <View style={styles.socialChildContainer}>
                <Image
                  source={require('./../../assets/social-icons/icons/Instagram.png')}
                  style={styles.socialIcon}
                />
              </View>
              <View style={styles.socialChildContainer}>
                <Image
                  source={require('./../../assets/social-icons/icons/Twitter.png')}
                  style={styles.socialIcon}
                />
              </View>
              <View style={styles.socialChildContainer}>
                <Image
                  source={require('./../../assets/social-icons/icons/LinkedIN.png')}
                  style={styles.socialIcon}
                />
              </View>
            </View>
            <View>
              <View style={styles.socialChild}>
                <View style={styles.socialChildContainer}>
                  <Image
                    source={require('./../../assets/social-icons/icons/Github.png')}
                    style={styles.socialIcon}
                  />
                </View>
                <View style={styles.socialChildContainer}>
                  <Image
                    source={require('./../../assets/social-icons/icons/Dribbble.png')}
                    style={styles.socialIcon}
                  />
                </View>
                <View style={styles.socialChildContainer}>
                  <Image
                    source={require('./../../assets/social-icons/icons/Behance.png')}
                    style={styles.socialIcon}
                  />
                </View>
                <View style={styles.socialChildContainer}>
                  <Image
                    source={require('./../../assets/social-icons/icons/Youtube.png')}
                    style={styles.socialIcon}
                  />
                </View>
              </View>
            </View>
            <View>
              <View style={styles.socialChild}>
                <View style={styles.socialChildContainer}>
                  <Image
                    source={require('./../../assets/social-icons/icons/tiktok.png')}
                    style={styles.socialIcon}
                  />
                </View>
                <View style={styles.socialChildContainer}>
                  <Image
                    source={require('./../../assets/social-icons/icons/Codeopen.png')}
                    style={styles.socialIcon}
                  />
                </View>
                <View style={styles.socialChildContainer}>
                  <Image
                    source={require('./../../assets/social-icons/icons/Snapchat.png')}
                    style={styles.socialIcon}
                  />
                </View>
                <View style={styles.socialChildContainer}>
                  <Image
                    source={require('./../../assets/social-icons/icons/link.png')}
                    style={styles.socialIcon}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: DEVICE_HEIGHT * 0.05,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    padding: 20,
  },
  imageContainer: {
    height: DEVICE_HEIGHT * 0.6,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 1,
    marginBottom: 20,
    // marginTop: 20,
  },
  image: {
    height: DEVICE_HEIGHT * 0.6,
    minHeight: DEVICE_HEIGHT * 0.6,
    borderRadius: 8,
    display: 'flex',
    minWidth: DEVICE_WIDTH * 0.9,
    resizeMode: 'cover',
  },

  header: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    paddingLeft: 20,
    paddingTop: 20,
    opacity: 0.8,
    fontFamily: 'Avenir',
  },

  body: {
    color: 'white',
    fontSize: 18,
    paddingLeft: 20,
    paddingRight: 20,
    opacity: 0.8,
    fontFamily: 'Avenir',
  },

  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 8,
    height: DEVICE_HEIGHT * 0.6,
    marginBottom: 20,
  },
  socialContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 40,
  },

  socialChild: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: DEVICE_HEIGHT * 0.02,
  },
  socialChildContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  phoneNumberContainer: {
    // width: DEVICE_WIDTH * 0.8,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: DEVICE_HEIGHT * 0.025,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    marginTop: 30,
  },
  aboutContainer: {
    // width: DEVICE_WIDTH * 0.8,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: DEVICE_HEIGHT * 0.04,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    marginTop: 30,
  },
  socialIcon: {
    width: 40,
    height: 40,
  },
  lineSeparator: {
    // width: DEVICE_WIDTH,
    height: 1,
    opacity: 0.1,
    margin: DEVICE_HEIGHT * 0.015,
    backgroundColor: '#881098',
  },
});
