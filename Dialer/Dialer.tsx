import React, {useState} from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  Pressable,
} from 'react-native';
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';
import {DEVICE_HEIGHT, DEVICE_WIDTH} from '../App';
// import {Dialer} from 'react-native-dialer';

export const Dialer = () => {
  const [state, setstate] = useState([]);

  console.log(state);

  const dialNumber = () => {
    // Dialer.makeCall(phoneNumber);
  };

  // const makeCall = () => {
  //     let num=""
  //     for (let i = 0; i < state.length, i++){
  //         num=num+i
  //     }s
  //     console.log(num)
  // }

  const phoneHandler = () => {
    if (state.length > 0) {
      RNImmediatePhoneCall.immediatePhoneCall(state.join(''));
    }
  };

  const removeItem = () => {
    setstate(previousArr => previousArr.slice(0, -1));
  };

  return (
    <View
      style={{
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text
        style={{
          color: '#000',
          height: 20,
          fontSize: 20,
          margin: 40,
        }}>
        {' '}
        {state}{' '}
      </Text>
      <Pressable
        style={{
          display: 'flex',
          // flex: 1,
          height: 100,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            display: 'flex',
            // flex: 1,
            alignItems: 'center',
            width: 400,
            justifyContent: 'space-around',
            flexDirection: 'row',
          }}>
          <Pressable
            style={styles.numStyle}
            onPress={() => {
              setstate([...state, '1']);
            }}>
            <Text>1</Text>
          </Pressable>

          <Pressable
            style={styles.numStyle}
            onPress={() => {
              setstate([...state, '2']);
            }}>
            <Text>2</Text>
          </Pressable>
          <Pressable
            style={styles.numStyle}
            onPress={() => {
              setstate([...state, '3']);
            }}>
            <Text>3</Text>
          </Pressable>
        </View>
      </Pressable>
      <Pressable
        style={{
          display: 'flex',
          // flex: 1,
          height: 100,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            display: 'flex',
            // flex: 1,
            alignItems: 'center',
            width: 400,
            justifyContent: 'space-around',
            flexDirection: 'row',
          }}>
          <Pressable
            style={styles.numStyle}
            onPress={() => {
              setstate([...state, '4']);
            }}>
            <Text>4</Text>
          </Pressable>

          <Pressable
            style={styles.numStyle}
            onPress={() => {
              setstate([...state, '5']);
            }}>
            <Text>5</Text>
          </Pressable>
          <Pressable
            style={styles.numStyle}
            onPress={() => {
              setstate([...state, '6']);
            }}>
            <Text>6</Text>
          </Pressable>
        </View>
      </Pressable>
      <Pressable
        style={{
          display: 'flex',
          // flex: 1,
          height: 100,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            display: 'flex',
            // flex: 1,
            alignItems: 'center',
            width: 400,
            justifyContent: 'space-around',
            flexDirection: 'row',
          }}>
          <Pressable
            style={styles.numStyle}
            onPress={() => {
              setstate([...state, '7']);
            }}>
            <Text>7</Text>
          </Pressable>

          <Pressable
            style={styles.numStyle}
            onPress={() => {
              setstate([...state, '8']);
            }}>
            <Text>8</Text>
          </Pressable>
          <Pressable
            style={styles.numStyle}
            onPress={() => {
              setstate([...state, '9']);
            }}>
            <Text>9</Text>
          </Pressable>
        </View>
      </Pressable>
      <Pressable
        style={{
          display: 'flex',
          // flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            display: 'flex',
            // flex: 1,
            height: 100,
            alignItems: 'center',
            width: 400,
            justifyContent: 'space-around',
            flexDirection: 'row',
          }}>
          <Text style={{color: '#000', width: 20, height: 20}}></Text>
          <Pressable
            style={styles.numStyle}
            onPress={() => {
              setstate([...state, '0']);
            }}
            onLongPress={() => {
              console.log('Press');
            }}>
            <Text>0</Text>
          </Pressable>
          <Text style={{color: '#000'}}></Text>
        </View>
      </Pressable>
      <Pressable
        style={{
          display: 'flex',
          // flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            display: 'flex',
            // flex: 1,
            height: 100,
            alignItems: 'center',
            width: 400,
            justifyContent: 'space-around',
            flexDirection: 'row',
          }}>
          <Pressable style={styles.numStyle} onPress={phoneHandler}>
            <Text>Call</Text>
          </Pressable>
          {/* <Button title="call" onPress={phoneHandler} /> */}
          <Pressable
            style={styles.numStyle}
            onPress={removeItem}
            onLongPress={() => {
              setstate([]);
            }}>
            <Text>X</Text>
          </Pressable>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '80%',
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
  },
  numStyle: {
    width: DEVICE_WIDTH * 0.15,
    height: DEVICE_HEIGHT * 0.06,
    backgroundColor: 'grey',
    borderRadius: DEVICE_WIDTH,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
