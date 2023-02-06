import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  Dimensions,
  ScrollView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import {useState} from 'react';

import {
  launchImageLibrary,
  ImagePickerResponse,
} from 'react-native-image-picker';

import axios from 'axios';
import {useID} from '../../Context/CardIDContext';
import {useAuth} from '../../Context/AuthContext';

const win = Dimensions.get('window');
const ratio = win.width / 541; //541 is actual image width

export const ImageUpload = ({navigation}) => {
  const [name, setName] = useState('');

  const [photo, setPhoto] = React.useState(null);

  const [loader, setLoader] = useState(false);

  const {idContext} = useID();
  const {token} = useAuth();
  // console.log(idContext, "from context")

  const header = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: 'Bearer ' + token,
    },
  };

  const handleUploadPhoto = async () => {
    if (photo !== null) {
      console.log('photo...', photo.assets[0]);
      const uri =
        Platform.OS === 'android'
          ? photo.assets[0].uri
          : photo.assets[0].uri.replace('file://', '');
      const filename = photo.assets[0].uri.split('/').pop();
      const match = /\.(\w+)$/.exec(filename);
      const ext = match?.[1];
      const type = match ? `image/${match[1]}` : `image`;

      const formData = new FormData();
      formData.append('image', {
        uri,
        name: `image.${ext}`,
        type,
      });

      console.log(token, 'form token');

      formData.append('_id', idContext);
      await axios
        .post('http://3.109.143.227/api/new/card/image', formData, header)
        .then(res => {
          console.log(res);

          // navigation.navigate("Card")
          navigation.navigate({
            name: 'CreateCardPublic',
            params: res.data.data._id,
          });
        });
    } else {
      alert('Please select a file or else skip');
    }
  };

  const selectFile = async () => {
    let options = {
      mediaType: 'photo',
      includeBase64: true,
      quality: 1,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        let source;

        source = {
          uri: 'data:image/jpeg;base64,' + response.assets,
          isStatic: true,
        };

        if (Platform.OS === 'android') {
          source = {uri: response.assets[0].uri, isStatic: true};
        } else {
          source = {
            uri: response.assets[0].uri.replace('file://', ''),
            isStatic: true,
          };
        }
        setPhoto(response);
      }
    });
  };

  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        position: 'relative',
      }}>
      {loader ? (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator size="large" color="#881098" />
        </View>
      ) : (
        <ScrollView style={styles.container}>
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
                    backgroundColor: '#D6A6DE',
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
                    color: '#000',
                    paddingRight: 10,
                    paddingRight: 10,
                  }}
                  onPress={() => navigation.navigate('Card')}>
                  Skip
                </Text>
              </View>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.text}>
                Add a picture so people can recognize you
              </Text>

              <TouchableOpacity style={styles.button} onPress={selectFile}>
                <Text>Upload</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={handleUploadPhoto}>
                <Text>Continue</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      )}
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
