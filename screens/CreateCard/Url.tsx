import React, {useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {useID} from '../../Context/CardIDContext';
import {useAuth} from '../../Context/AuthContext';

const win = Dimensions.get('window');
const ratio = win.width / 541; //541 is actual image width

export const Url = ({navigation}) => {
  const [url, setUrl] = useState('');
  const [loader, setLoader] = useState(true);
  const {idContext, setIdContext} = useID();
  const {token} = useAuth();
  console.log(idContext, 'from context');

  // console.log(cardId)
  const getEmail = async () => {
    try {
      const value = await AsyncStorage.getItem('@token');
      const _id = await AsyncStorage.getItem('_id');
      const data_output = JSON.parse(value);
      console.log(data_output);
      setToken(data_output);
      setId(_id);

      // if (data_output !== null) {
      //     console.log(".......", data_output.emailid)
      //     setEmail(data_output.emailid)
      //     setNewUser(data_output.profileactive)
      // }
    } catch (e) {
      // error reading value
      console.log(e);
    }
  };

  const header = {
    headers: {
      Authorization: 'Bearer ' + token,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  const handleSubmit = async e => {
    await axios
      .post(
        'http://3.109.143.227/api/new/card',
        {
          _id: idContext,
          url: url,
        },
        header,
      )
      .then(res => {
        // const response = res.data.data
        console.log(res);
      })
      .catch(e => console.log(e));
    setIdContext('');
    alert('Card Created');
    navigation.navigate('HomeScreen');
  };

  useEffect(() => {
    getEmail();
    // handleSubmit2();
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
          position: 'relative',
        }}>
        <View>
          <Image
            source={require('./../../assets/create-card/Rectangle.png')}
            style={styles.backImage}
          />
          <Text
            style={{
              position: 'absolute',
              left: 10,
              bottom: 50,
              right: 10,
              color: '#000',
            }}>
            {' '}
            Yassim{' '}
          </Text>
        </View>

        <View style={styles.overlay} />
      </View>

      <View style={styles.detailsContainer}>
        <View
          style={{
            width: '100%',
            height: 40,
            backgroundColor: 'white',
            position: 'absolute',
            top: 5,
            // left: 10,
            // right: 10,
            paddingRight: 10,
            paddingLeft: 10,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Image
            source={require('./../../assets/create-card/Back.png')}
            style={styles.cardImage}
          />
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: 8,
                height: 8,
                backgroundColor: '#881098',
                borderRadius: 10,
                margin: 2,
              }}
            />
            <View
              style={{
                width: 8,
                height: 8,
                backgroundColor: '#881098',
                borderRadius: 10,
                margin: 2,
              }}
            />
            <View
              style={{
                width: 8,
                height: 8,
                backgroundColor: '#881098',
                borderRadius: 10,
                margin: 2,
              }}
            />
            <View
              style={{
                width: 8,
                height: 8,
                backgroundColor: '#881098',
                borderRadius: 10,
                margin: 2,
              }}
            />
            <View
              style={{
                width: 8,
                height: 8,
                backgroundColor: '#881098',
                borderRadius: 10,
                margin: 2,
              }}
            />
          </View>
          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
            }}>
            <Text
              style={{
                color: '#000',
                paddingRight: 10,
              }}>
              Skip
            </Text>
          </View>
        </View>
        <ScrollView style={styles.inputContainer}>
          <Text style={styles.text}>Url:</Text>

          <TextInput
            style={styles.input}
            placeholder="Bulla"
            value={url}
            placeholderTextColor="#00001"
            onChangeText={text => setUrl(text)}
          />

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text>Continue</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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

  cardImage: {
    // position: "relative",
  },
  detailsContainer: {
    flex: 1,
    // padding: 20,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 8,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: '#fff',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'black',
    opacity: 0.3,
  },
  inputContainer: {
    padding: 20,
  },
  backImage: {
    marginTop: 10,
  },
});
