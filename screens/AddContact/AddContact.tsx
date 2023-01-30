import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  Alert,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import MapView from 'react-native-maps';
import Contacts from 'react-native-contacts';
import {PermissionsAndroid} from 'react-native';
import SelectList from 'react-native-dropdown-select-list';
import {Picker} from '@react-native-picker/picker';
import {useIsFocused} from '@react-navigation/native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import DatePicker from 'react-native-date-picker';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';

export const AddContact = ({navigation}) => {
  const [displayName, setDisplayName] = useState('');
  const [givenName, setGivenName] = useState('');
  const [familyName, setFamilyName] = useState('');
  const [phoneNumbers, setPhoneNumbers] = useState(['']);
  const [selectedLabel, setSelectedLabel] = useState({});
  const [email, setEmail] = useState('');
  const [contactSave, setContactSave] = useState(false);
  const [company, setCompany] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [location, setLocation] = useState(false);
  const [geolocation, setGeoLocation] = useState('');
  const [loader, setLoader] = useState(false);
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  // const [date, setDate] = useState(new Date())
  // const [open, setOpen] = useState(false)

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Geolocation Permission',
          message: 'Can we access your location?',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      console.log('granted', granted);
      if (granted === 'granted') {
        console.log('You can use Geolocation');
        return true;
      } else {
        console.log('You cannot use Geolocation');
        return false;
      }
    } catch (err) {
      return false;
    }
  };

  const getLocation = () => {
    setLoader(true);
    const result = requestLocationPermission();
    result.then(res => {
      //   console.log('res is:', res);
      if (res) {
        Geolocation.getCurrentPosition(
          position => {
            // console.log(position, 'position');
            axios
              .get(
                `https://api.opencagedata.com/geocode/v1/json?q=${position.coords.latitude}+${position.coords.longitude}&key=270b953f770e4dfb9efb4ee7ba6a9e4a`,
              )
              .then(
                response => {
                  console.log(response.data.results[0].formatted);
                  setGeoLocation(response.data.results[0].formatted);
                  setLoader(false);
                },
                // console.log(response.data.results[0].formatted),
              );
          },
          error => {
            // See error code charts below.
            console.log(error.code, error.message);
            setLocation(false);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      }
    });
    console.log(location);
  };

  const data = [
    {key: '1', value: 'Mobile'},
    {key: '2', value: 'Work'},
    {key: '3', value: 'Home'},
    {key: '4', value: 'Other'},
  ];

  useEffect(() => {
    if (phoneNumbers[phoneNumbers.length - 1].length > 0) {
      setPhoneNumbers(prevState => [...prevState, '']);
    }
    try {
      if (
        phoneNumbers[phoneNumbers.length - 2].length === 0 &&
        phoneNumbers.length >= 2
      ) {
        setPhoneNumbers(prevState => {
          const newState = prevState.slice();
          newState.pop();
          return newState;
        });
      }
    } catch {}
    requestLocationPermission();
  }, [phoneNumbers]);

  const getContacts = async () => {
    // We need to ask permission for Android only
    if (Platform.OS === 'android') {
      // Calling the permission function
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS,
        {
          title: 'Example App Camera Permission',
          message: 'Example App needs access to your camera',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // Permission Granted
        add_Contact();
        console.log('granted...', granted);
      } else {
        // Permission Denied
        alert('CAMERA Permission Denied');
      }
    } else {
      // addContact()
    }
  };

  //   function add_Contact() {
  //     // var newPerson = {
  //     //   emailAddresses: [
  //     //     {
  //     //       label: 'Home',
  //     //       email: email,
  //     //     },
  //     //   ],
  //     //   displayName: givenName + ' ' + familyName,
  //     //   givenName: givenName.toString(),
  //     //   familyName: familyName.toString(),
  //     //   phoneNumbers: [
  //     //     {
  //     //       label: 'Mobile',
  //     //       number: phoneNumbers.toString(),
  //     //     },
  //     //   ],
  //     //   company: company,
  //     //   jobTitle: jobTitle,
  //     //   // birthday: date
  //     // };

  //     var newPerson = {
  //       emailAddresses: [
  //         {
  //           label: 'work',
  //           email: 'mrniet@example.com',
  //         },
  //       ],
  //       displayName: 'Friedrich Nietzsche',
  //     };

  //     Contacts.addContact(newPerson).then(() => {
  //       console.log(newPerson);
  //     });
  //     //   .then(res => console.log('res....', res))
  //     //   .catch(err => console.log('error', err));
  //     // console.log('contact created');
  //     setContactSave(true);
  //     // console.log(result);
  //     // Contacts.openContactForm(newPerson).then(contact => {
  //     //   // contact has been saved
  //     // });
  //     setTimeout(() => {
  //       navigation.navigate('Contacts');
  //     }, 1500);
  //   }

  const getPermission = () => {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS, {
      title: 'Contacts',
      message: 'This app would like to view your contacts.',
      buttonPositive: 'Please accept bare mortal',
    }).then(res => {
      if (res == 'granted') {
        let newPerson = {
          emailAddresses: [
            {
              label: 'work',
              email: email,
            },
          ],
          phoneNumbers: [
            {
              label: 'Mobile',
              number: phoneNumbers.toString(),
            },
          ],
          displayName: givenName + ' ' + familyName,
          givenName: givenName.toString(),
          familyName: familyName.toString(),
          company: company,
          jobTitle: jobTitle,
        };

        Contacts.addContact(newPerson);
        navigation.goBack();
      }
    });
  };

  return (
    <View style={styles.container}>
      {loader ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator />
        </View>
      ) : (
        <ScrollView>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="FirstName"
              value={givenName}
              onChangeText={text => setGivenName(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="LastName"
              value={familyName}
              onChangeText={text => setFamilyName(text)}
            />
          </View>
          <Text style={styles.input}>Contact</Text>
          {phoneNumbers.map((phoneNumber, index) => (
            <View
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                margin: 20,
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%',
              }}
              key={index}>
              <View style={{width: '70%'}}>
                <TextInput
                  style={styles.input}
                  placeholder="Phone Number"
                  keyboardType="number-pad"
                  value={phoneNumber}
                  onChangeText={text =>
                    setPhoneNumbers(prevState => {
                      const newState = prevState.slice();
                      newState[index] = text;
                      return newState;
                    })
                  }
                />
              </View>

              {/* <View style={{ width: "30%" }}>
                        <Picker
                            selectedValue={selectedLabel}
                            onValueChange={(itemValue, itemIndex) =>
                                setSelectedLabel(itemValue)
                            }>
                            <Picker.Item label="Mobile" value="Mobile" />
                            <Picker.Item label="Work" value="Work" />
                            <Picker.Item label="Home" value="Home" />
                            <Picker.Item label="Other" value="Other" />

                        </Picker>

                    </View> */}
            </View>
          ))}
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            value={email}
            onChangeText={text => setEmail(text)}
          />
          <TextInput
            style={styles.input2}
            placeholder="Location"
            value={geolocation}
            onChangeText={text => setGeoLocation(text)}
          />
          <Text style={styles.input}>Contact Information</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Compnany"
              value={company}
              onChangeText={text => setCompany(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Job Title"
              value={jobTitle}
              onChangeText={text => setJobTitle(text)}
            />

            {/* <>
                    <Button title="Open" onPress={() => setOpen(true)} />
                    <DatePicker
                        modal
                        mode="date"
                        open={open}
                        date={date}
                        onConfirm={(date) => {
                            setOpen(false)
                            setDate(date)
                        }}
                        onCancel={() => {
                            setOpen(false)
                        }}
                    />
                </> */}
          </View>
          <View style={{margin: 20}}>
            <Button
              title="Save"
              onPress={() => getPermission()}
              // onPress={() => console.log(date)}
            />
          </View>
          {contactSave ? <Text>Contact Saved</Text> : null}
          <Button title="Get Location" onPress={getLocation} />
          <Text>{geolocation}</Text>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {flex: 1, justifyContent: 'center'},
  container: {
    flex: 1,
    backgroundColor: 'grey',
  },
  inputContainer: {
    padding: 10,
    margin: 10,
  },
  input: {
    borderBottomWidth: 0.5,
    borderBottomColor: 'gray',
    padding: 10,
  },
  input2: {
    borderBottomWidth: 0.5,
    borderBottomColor: 'gray',
    padding: 20,
  },
});
