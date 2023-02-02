import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {urlPort} from '../../config/config';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

export const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [errormsg, setErrorMsg] = useState('');
  const [user, setUser] = useState('');

  GoogleSignin.configure({
    scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
    webClientId:
      '472167905856-dsb3m2l78mq3louhc2k9n2eb0qc1olmv.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
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
      // await GoogleSignin.hasPlayServices();

      // await GoogleSignin();
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn().then(async user => {
        console.log('..................sign in ', user.user.id);
        setUser(user.user.id);
        // AsyncStorage.setItem("userInfo", user)
        // await AsyncStorage.setItem(
        //     'userInfo',
        //     JSON.stringify(user.idToken)
        // );
      });

      // const userInfos =
      // console.log(userInfos);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
        // console.log(GoogleSignin);
      }
      console.log(error);
    }

    // console.log("async storage service")
    // console.log(await AsyncStorage.getItem('userInfo'))
  };

  const apiTest = () => {
    axios
      .get(`http://localhost:3000/social/login/data/?id=${user}`)
      .then(response => console.log(response))
      .catch(err => console.error(err));
  };

  const handleOnChange = e => {
    e.preventDefault();
    setErrorMsg('');
    setEmail(e.target.value);
    console.log(email);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g.test(email) === false) {
      // setErrorMsg('Please enter a valid email')
      alert('Please enter a valid email');
      return;
    }
    await axios
      .post(`${urlPort}/login`, {
        email: email.toLowerCase(),
      })
      .then(res => {
        const response = res.data.data;
        console.log(response);
        if (response !== null) {
          AsyncStorage.setItem('@storage_Key', JSON.stringify(response));
          navigation.navigate('PassWordScreen');
        }
      });
  };

  const getItem = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_Key');
      const data_output = JSON.parse(value);

      if (data_output !== null) {
        console.log('.......', data_output.emailid);
      }
    } catch (e) {
      // error reading value
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          // style={{ display: "hidden" }}
          // source={require('./../../assets/login/Back.png')}
          style={{margin: 10}}
        />
        <Image
        // style={{ marginTop: 20 }}
        // source={require('./../../assets/login/Klose.png')}
        />
        <Image
          // style={{ display: "hidden" }}
          // source={require('./../../assets/login/Back.png')}
          style={{margin: 10}}
        />
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
        }}>
        <View>
          <Text style={styles.text}>Sign up or Login into Klose</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            placeholderTextColor="#565657"
            onChangeText={text => setEmail(text)}
          />
        </View>
        <TouchableOpacity
          style={styles.button}
          // onPress={() => navigation.navigate('Password')}
          onPress={handleSubmit}>
          <Text
            style={{
              fontFamily: 'Avenir',
            }}>
            Continue
          </Text>
        </TouchableOpacity>

        <Text style={styles.orText}>or</Text>

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

const styles = StyleSheet.create({
  container: {
    marginLeft: 30,
    marginRight: 30,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  text: {
    color: '#9B9B9B',
    fontSize: 20,
    marginTop: 40,
    fontFamily: 'Avenir',
  },
  input: {
    height: 58,
    borderWidth: 1,
    padding: 10,
    borderColor: '#D6A6DE',
    borderRadius: 8,
    marginTop: 40,
    color: '#000',
  },
  button: {
    backgroundColor: '#881098',
    height: 58,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    marginTop: 40,
    fontFamily: 'Avenir',
  },
  googleButton: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#fffff',
    height: 58,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#979797',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  orText: {
    marginTop: 30,
    textAlign: 'center',
    fontFamily: 'Avenir',
  },
});
