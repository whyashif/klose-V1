import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image, TextInput} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {urlPort} from '../../config/config';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {styles} from './LoginStyles';
import {DEVICE_HEIGHT, DEVICE_WIDTH} from '../../App';
import {utilityStyles} from '../../UtilityStyle/UtilityStyle';
import {useData} from '../../Context/UserDataContext';
import {useAuth} from '../../Context/AuthContext';

export const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [gooogleEmail, setGoogleEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [googleId, setGoogleId] = useState('');
  const {newUser, setNewUser} = useData();
  const {setAuthenticated} = useAuth();

  console.log(newUser, 'new user');

  GoogleSignin.configure({
    scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
    webClientId:
      '472167905856-7gk6tnin825isulkoe0dpjrnotavl0vs.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
    offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    hostedDomain: '', // specifies a hosted domain restriction
    forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
    accountName: '', // [Android] specifies an account name on the device that should be used
    iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
    googleServicePlistPath: '', // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
    openIdRealm: '', // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
    profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
  });

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn().then(async user => {
        console.log('..................sign in ', user.user);
        await axios
          .post(`${urlPort}/social/auth/login`, {
            socilaId: user.user.id,
            social_email: user.user.email,
          })
          .then(response => {
            if (response !== null) {
              AsyncStorage.setItem(
                '@token',
                JSON.stringify(response.data.token),
              );
              setAuthenticated(true);
              navigation.navigate('HomeScreen');
              console.log(response.data.token);
            }
          })
          .catch(err => console.error(err));
      });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
      }
      console.log(error);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (email === '') {
      setErrorMessage('Abey email daal bhai email');
      return;
    } else if (
      /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g.test(email) === false
    ) {
      setErrorMessage('Email toh sahi se daalo yaar :)');
      return;
    } else
      await axios
        .post(`${urlPort}/login`, {
          email: email.toLowerCase(),
        })
        .then(res => {
          const response = res.data.data;

          if (response !== null) {
            AsyncStorage.setItem('@storage_Key', JSON.stringify(response));
            console.log(
              response.password,
              '.....password.............................',
            );

            if (response.password === undefined) {
              setNewUser(true);
            } else if (response.password !== undefined) {
              setNewUser(false);
            }
            navigation.navigate({
              name: 'PassWordScreen',
              params: response,
            });
          }
        });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={{margin: 10}} />
        <Image
          style={{marginTop: 20}}
          source={require('./../../assets/login/Klose.png')}
        />
        <Image style={{margin: 10}} />
      </View>
      <View>
        <Text style={styles.signUptext}>Sign up or Login into Klose</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.inputHeader}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="ashif@why.com"
            value={email}
            placeholderTextColor="rgba(86, 86, 87, 0.3)"
            onChangeText={text => {
              setErrorMessage('');
              setEmail(text);
            }}
          />
          <Text style={utilityStyles.errorMessage}>{errorMessage}</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text
            style={{
              fontFamily: 'Avenir',
              color: '#FDFEFF',
              fontSize: DEVICE_HEIGHT * 0.015,
            }}>
            Continue
          </Text>
        </TouchableOpacity>
        <View style={[utilityStyles.flexCenterRow, styles.orMargin]}>
          <View style={styles.horizontalLine} />
          <Text style={styles.orText}>or</Text>
          <View style={styles.horizontalLine} />
        </View>

        <TouchableOpacity style={styles.googleButton} onPress={signIn}>
          <Image source={require('./../../assets/login/google.png')} />
          <Text
            style={{
              color: '#4A4A4A',
              fontFamily: 'Avenir',
            }}>
            Continue with Google
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
