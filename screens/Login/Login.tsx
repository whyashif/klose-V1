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
import { urlPort } from '../../config/config';


export const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [errormsg, setErrorMsg] = useState('');

  // console.log(Dimensions.get('window').height);

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
          navigation.navigate('Password');
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

        <TouchableOpacity style={styles.googleButton} onPress={getItem}>
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
