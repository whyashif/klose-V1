import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  Dimensions,
  ScrollView,
  Switch,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {RadioButton} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {useID} from '../../Context/CardIDContext';

const win = Dimensions.get('window');
const ratio = win.width / 541; //541 is actual image width

export const PublicPrivate = ({navigation}) => {
  const [name, setName] = useState('');
  const [token, setToken] = useState('');
  const [id, setId] = useState('');
  // const [isEnabled, setIsEnabled] = useState(true)S
  const hello = () => {
    navigation.navigate('Card');
  };

  const {idContext} = useID();

  console.log(idContext, 'from context');

  const [checked, setChecked] = useState(false);

  const header = {
    headers: {
      Authorization: 'Bearer ' + token,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  const getEmail = async () => {
    try {
      const value = await AsyncStorage.getItem('@token');
      const _id = await AsyncStorage.getItem('_id');
      const data_output = JSON.parse(value);
      console.log(data_output);
      setToken(data_output);
      setId(_id);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = async e => {
    await axios
      .post(
        'http://3.109.143.227/api/new/card',
        {
          _id: idContext,
          private: checked,
        },
        header,
      )
      .then(res => {
        // const response = res.data.data
        console.log(res);
      });
    navigation.navigate('CreateCardUrl');
  };

  useEffect(() => {
    getEmail();
    // handleSubmit2()
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
            {name}{' '}
          </Text>
        </View>

        <View style={styles.overlay} />
      </View>

      <ScrollView style={styles.detailsContainer}>
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
                backgroundColor: '# ',
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

            <View
              style={{
                width: 8,
                height: 8,
                backgroundColor: '#D6A6DE',
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
                color: '#D3D3D3',
                paddingRight: 10,
              }}>
              Skip
            </Text>
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.text}>Do you want to make this card public?</Text>
          <Text style={styles.text}>
            A public card should only have information that you would want to
            share with anyone on the internet like your public links or your
            company pager
          </Text>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <RadioButton
              value={false}
              status={checked === false ? 'checked' : true}
              onPress={() => {
                setChecked(false);
                console.log(checked);
              }}
            />
            <Text style={styles.label}>Public</Text>
          </View>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <RadioButton
              // color="#1E6DAD"
              value={true}
              status={checked === true ? 'checked' : false}
              onPress={() => {
                setChecked(true);
                console.log(checked);
              }}
            />
            <Text style={styles.label}>Private</Text>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text>Continue</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
