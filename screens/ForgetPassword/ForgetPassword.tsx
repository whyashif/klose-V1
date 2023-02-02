import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
} from 'react-native';

import axios from 'axios';
import {urlPort} from '../../config/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAuth} from '../../Context/AuthContext';

export const ForgetPassword = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newUser, setNewUser] = useState(false);
  const [errormsg, setErrorMsg] = useState('');

  const handleOnChange = e => {
    e.preventDefault();
    setErrorMsg('');
    setEmail(e.target.value);
    console.log(email);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (/\s/g.test(password) === true) {
        alert('Spaces are not allowed in Password');
      } else if (password.length <= 5) {
        alert(' Password must be atleast 6 characters');
        return;
      } else if (password.length > 26) {
        alert('Password can have only 24 characters.');

        return;
      } else {
        const param = {
          email: email,
          password: password,
        };
        await axios.post(`${urlPort}/verify/password`, param).then(res => {
          if (res !== null) {
            AsyncStorage.setItem('@token', JSON.stringify(res.data.data.token));
            setAuthenticated(true);
            navigation.navigate('HomeScreen');
            console.log(res.data.data.token);
          }
        });
      }
    } catch (error) {
      if (error.response !== undefined) {
        if (error.response.data !== undefined) {
          alert(error.response.data.message);
        }
      }
      // console.log(error.response.data)
    }
  };
  const getEmail = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_Key');
      const data_output = JSON.parse(value);

      if (data_output !== null) {
        // console.log(".......", data_output)
        setEmail(data_output.emailid);
        setNewUser(data_output.profileactive);
      }
    } catch (e) {
      // error reading value
    }
  };
  useEffect(() => {
    getEmail();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          // style={{ marginTop: 20 }}
          // style={{ width: 50, height: 50 }}
          source={require('./../../assets/login/Back.png')}
        />
        <Image
          // style={{ marginTop: 20 }}
          source={require('./../../assets/login/Klose.png')}
        />
        <Image
          // style={{ display: "hidden" }}2
          source={require('./../../assets/login/Back.png')}
        />
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
        }}>
        <View>
          <Text style={styles.text}>Password</Text>

          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            secureTextEntry={true}
            onChangeText={text => setPassword(text)}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text>Continue</Text>
        </TouchableOpacity>

        <Text style={styles.orText}>or</Text>

        <TouchableOpacity
          style={styles.googleButton}

          // onPress={() => navigation.navigate('Password')}
        >
          <Image source={require('./../../assets/login/google.png')} />
          <Text>Continue with Google</Text>
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
  },
});
