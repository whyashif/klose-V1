import {
  View,
  Text,
  ActivityIndicator,
  Appearance,
  FlatList,
  StyleSheet,
  StatusBar,
  Pressable,
  Image,
  Linking,
  Platform,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {useContacts} from '../../Context/ContactContext';
import {DEVICE_WIDTH, DEVICE_HEIGHT} from '../../App';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Searchbar} from 'react-native-paper';
import {useSharedValue} from 'react-native-reanimated';
import {FlashList} from '@shopify/flash-list';

export const Contact = ({navigation}) => {
  const {contactsFromPhone, contactLoader, contactData, setContactData} =
    useContacts();
  const [searchText, setSearchText] = useState('');
  const OnSearchHandle = (searchQuery: string) => {
    setSearchText(searchQuery.toLowerCase());
    if (searchQuery.length <= 0) {
      setContactData(contactsFromPhone);
    }
  };

  const SearchDataHandle = useCallback(() => {
    if (searchText.length > 0) {
      const searchQuery = searchText.toLowerCase();
      console.log(typeof searchQuery);
      const filterData = contactsFromPhone.filter((element: string) => {
        // console.log(element.note);
        if (element.displayName !== undefined && element.displayName !== null) {
          return (
            element.displayName.toLowerCase().includes(searchQuery) ||
            element.emailAddresses.some(obj => {
              return obj.email.toLowerCase().includes(searchQuery);
            }) ||
            element.phoneNumbers.some(obj2 => {
              return obj2.number.toLowerCase().includes(searchQuery);
            }) ||
            (element.note !== null &&
              element.note.toLowerCase().includes(searchQuery))
          );
        }
      });
      console.log(filterData, 'filterData');
      if (searchText) {
        setContactData(filterData);
      }
    }
    // console.log(contactData);
  }, [searchText]);

  const message = 'Contact test';

  const phoneHandler = (phone: string) => {
    RNImmediatePhoneCall.immediatePhoneCall(phone);
  };
  const emailHandler = (email: string) => {
    Linking.openURL(`mailto:${email}`);
  };

  const whatsAppHandler = (phone: string) => {
    Linking.openURL(`whatsapp://send?text=hello&phone=${phone}`);
  };

  const sendTextMessage = useCallback(
    async (phNumber: string, message: string) => {
      const separator = Platform.OS === 'ios' ? '&' : '?';
      const url = `sms:${phNumber}${separator}body=${message}`;
      await Linking.openURL(url);
    },
    [],
  );

  useEffect(() => {
    SearchDataHandle();
  }, [SearchDataHandle]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {contactLoader ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size={'large'} color="#881098" />
        </View>
      ) : (
        <View>
          <Searchbar value={searchText} onChangeText={OnSearchHandle} />
          <Pressable
            style={{
              height: DEVICE_HEIGHT * 0.08,
              // backgroundColor: 'grey',
              marginTop: DEVICE_HEIGHT * 0.01,
              marginBottom: DEVICE_HEIGHT * 0.01,
              borderRadius: 8,
              borderWidth: 2,
              borderColor: '#881098',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              navigation.navigate('Add Contact');
            }}>
            <Ionicons
              name="md-person-add-outline"
              color="#881098"
              size={DEVICE_HEIGHT * 0.03}
            />
            <Text
              style={{
                color: 'black',
                opacity: 0.5,
                marginHorizontal: 10,
                fontSize: DEVICE_WIDTH * 0.045,
                fontFamily: 'Avenir-Heavy',
                textAlign: 'center',
              }}>
              Add New Contact
            </Text>
          </Pressable>
          <FlatList
            data={contactData}
            renderItem={({item, index}) => (
              <Pressable
                onPress={() => {
                  navigation.navigate({
                    name: 'ContactDetails',
                    params: {item},
                  });
                }}>
                <View style={styles.contactContainer} key={index}>
                  <Pressable
                    style={styles.imageContainer}
                    onPress={() => {
                      navigation.navigate({
                        name: 'ContactDetails',
                        params: {item},
                      });
                    }}>
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
                        {item.givenName === null ? (
                          <Text
                            style={{
                              color: 'grey',
                              fontSize: 45,
                              textAlign: 'center',
                            }}>
                            ?
                          </Text>
                        ) : (
                          <Text
                            style={{
                              color: 'grey',
                              fontSize: 45,
                              textAlign: 'center',
                            }}>
                            {item.givenName[0]}
                          </Text>
                        )}
                      </View>
                    )}
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      navigation.navigate({
                        name: 'ContactDetails',
                        params: {item},
                      });
                    }}>
                    <Text style={styles.contactName}>{item.givenName}</Text>
                    <Text style={styles.contactDetails}>{item.jobTitle}</Text>
                    <Text style={styles.contactDetails}>{item.company}</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <View style={styles.iconContainer}>
                        <Feather
                          name="phone-call"
                          onPress={() =>
                            phoneHandler(item?.phoneNumbers[0]?.number)
                          }
                          size={DEVICE_HEIGHT * 0.03}
                          color="#881098"
                        />
                      </View>
                      <View style={styles.iconContainer}>
                        <FontAwesome5
                          name="whatsapp"
                          onPress={() =>
                            whatsAppHandler(item?.phoneNumbers[0]?.number)
                          }
                          size={DEVICE_HEIGHT * 0.03}
                          color="#881098"
                        />
                      </View>
                      <View style={styles.iconContainer}>
                        <FontAwesome5
                          name="sms"
                          size={DEVICE_HEIGHT * 0.03}
                          onPress={() =>
                            sendTextMessage(
                              item?.phoneNumbers[0]?.number,
                              message,
                            )
                          }
                          color="#881098"
                        />
                      </View>

                      <View style={styles.iconContainer}>
                        <Ionicons
                          name="mail-outline"
                          onPress={() => {
                            Linking.openURL(
                              `mailto:${item.emailAddresses[0]?.email}?subject=testing&body=${message}`,
                            );
                          }}
                          color="#881098"
                          size={DEVICE_HEIGHT * 0.03}
                        />
                      </View>
                    </View>
                  </Pressable>
                </View>
              </Pressable>
            )}
          />
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

  // contactUI
  contactContainer: {
    display: 'flex',
    flexDirection: 'row',
    padding: DEVICE_HEIGHT * 0.02,
    margin: 5,
    borderWidth: 2,
    borderColor: '#F1E9FD',
  },
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
