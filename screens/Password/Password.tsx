import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  Alert,
  Pressable,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import axios from 'axios';
import {urlPort} from '../../config/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAuth} from '../../Context/AuthContext';
import {styles} from './PasswordStyles';
import {utilityStyles} from '../../UtilityStyle/UtilityStyle';
import {DEVICE_WIDTH} from '../../App';
import {useData} from '../../Context/UserDataContext';

export const PasswordScreen = ({navigation, route}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const {newUser} = useData();

  console.log(newUser, 'password new user');

  const {setAuthenticated} = useAuth();

  // console.log(route.params);

  const handleOnChange = e => {
    e.preventDefault();
    setErrorMsg('');
    setEmail(e.target.value);
    // console.log(email);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (/\s/g.test(password) === true) {
        setErrorMessage('Spaces are not allowed in Password');
      } else if (password.length <= 5) {
        setErrorMessage(' Password must be atleast 6 characters');
        return;
      } else if (password.length > 26) {
        setErrorMessage('Password can have only 24 characters.');

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
          setErrorMessage(error.response.data.message);
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
        setEmail(data_output.emailid);
      }
    } catch (e) {}
  };

  const handleForgetPassword = () => {
    navigation.navigate({
      name: 'ForgotPassword',
    });

    axios
      .post(`${urlPort}/forget/password/${email}`)
      .then(res => {
        // console.log(res, 'forget password response');
        const {success} = res.data;
        console.log(success, 'data');
        if (success === false) {
          const {message} = res.data;
          alert(
            "You've exceeded the maximum number of attempts to send verification code.",
          );
        } else {
          navigation.navigate({
            name: 'ForgotPassword',
            params: res.data,
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getEmail();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={{margin: 10}}
          source={require('./../../assets/login/Back.png')}
        />
        <Image
          style={{marginTop: 20}}
          source={require('./../../assets/login/Klose.png')}
        />
        <Image style={{margin: 10}} />
      </View>
      <View>
        {newUser ? (
          <Text style={styles.signUptext}>Welcome to Klose</Text>
        ) : (
          <Text style={styles.signUptext}>Welcome Back</Text>
        )}

        <View style={styles.inputContainer}>
          {newUser ? (
            <Text style={styles.inputHeader}>Enter a new Password</Text>
          ) : (
            <Text style={styles.inputHeader}>Password</Text>
          )}

          <View style={styles.passwordInputContainer}>
            <TextInput
              style={styles.input}
              placeholder="********"
              value={password}
              placeholderTextColor="rgba(86, 86, 87, 0.3)"
              onChangeText={text => {
                setErrorMessage('');
                setPassword(text);
              }}
              secureTextEntry={passwordVisibility}
            />
            <View style={{marginRight: DEVICE_WIDTH * 0.05}}>
              {passwordVisibility ? (
                <Pressable
                  onPress={() => {
                    setPasswordVisibility(!passwordVisibility);
                  }}>
                  <Icon name="visibility" size={20} color="#BA68C8" />
                </Pressable>
              ) : (
                <Pressable
                  onPress={() => {
                    setPasswordVisibility(!passwordVisibility);
                  }}>
                  <Icon name="visibility-off" size={20} color="#BA68C8" />
                </Pressable>
              )}
            </View>
          </View>

          <Text style={utilityStyles.errorMessage}>{errorMessage}</Text>
        </View>
        {newUser ? null : (
          <TouchableOpacity
            style={styles.buttonForgetPassword}
            onPress={handleForgetPassword}>
            <Text style={styles.buttonForgetPassword}>Forgot Password?</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text>Continue</Text>
        </TouchableOpacity>
      </View>
      {newUser ? (
        <Text style={styles.inputHeader}>
          By signing up to Klose, you agree to our Terms and Conditions and
          Privacy Policy
        </Text>
      ) : null}
    </View>
  );
};
