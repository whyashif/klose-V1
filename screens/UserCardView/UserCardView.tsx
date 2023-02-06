import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  Dimensions,
  ActivityIndicator,
  ScrollView,
  Button,
  Settings,
  Pressable,
} from 'react-native';
import {DEVICE_HEIGHT, DEVICE_WIDTH} from '../../App';
// import {BottomSheet} from './BottomSheet.js';

// import {BottomSheet} from './BottomSheet.js';
import {useData} from '../../Context/UserDataContext';

export const UserCardView = ({navigation, route}) => {
  // console.log(route.params, 'param data....................');
  const {name, jobtitle, company, profileimagepath} = useData().oneCardData;
  // console.log(name, 'name');
  // useEffect(() => {}, [useData]);
  return (
    <View>
      <View style={styles.container}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            height: DEVICE_HEIGHT * 0.04,
            marginBottom: 5,

            // margin: 10,
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              // style={{ display: "hidden" }}
              source={require('./../../assets/login/Back.png')}
              style={{
                alignSelf: 'center',
                padding: 10,
              }}
            />
            <Text
              style={{
                fontSize: 20,
                color: '#881098',
                fontWeight: 'bold',
                marginHorizontal: 10,
              }}>
              My Card
            </Text>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
              width: 60,
              height: 30,
              borderRadius: 16,
              // borderBottomLeftRadius: 8,

              borderColor: '#881098',
            }}>
            <TouchableOpacity>
              <Text
                style={{
                  fontSize: 12,
                  color: '#881098',
                  fontWeight: 'bold',
                  // marginHorizontal: 10,
                }}>
                Edit
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView>
          <View>
            {/* image */}
            {profileimagepath === undefined ? (
              <View>
                <Image source={require('./../../assets/default/man.png')} />
                <View style={styles.overlay} />
              </View>
            ) : (
              <View>
                <Image source={{uri: profileimagepath}} style={styles.image} />
                <View style={styles.overlay} />
              </View>
            )}

            {/* <View style={styles.overlay} /> */}
            <View
              style={{
                position: 'absolute',
                bottom: DEVICE_HEIGHT * 0.03,
              }}>
              <Text style={styles.header}>{name}</Text>
              <Text style={styles.body}>{jobtitle}</Text>
              <Text style={styles.body}>{company}</Text>
            </View>
          </View>
          <View style={{padding: 10}}>
            {/* details */}
            <View style={styles.aboutContainer}>
              {/* about */}
              <Image
                source={require('./../../assets/social-icons/quotation-marks.png')}
                style={{position: 'absolute', top: -10}}
              />
              <Text
                style={{
                  fontFamily: 'Avenir-Heavy',
                  fontSize: DEVICE_HEIGHT * 0.02,
                  color: 'grey',
                }}>
                Dekho woh aagya
              </Text>
            </View>

            {/* Social Container */}
            <View style={{marginTop: 20}}>
              <View style={styles.socialChild}>
                <View style={styles.socialChildContainer}>
                  <Pressable
                    onPress={() => navigation.navigate('Edit Profile')}>
                    <Image
                      source={require('./../../assets/social-icons/icons/Facebook.png')}
                      style={styles.socialIcon}
                    />
                  </Pressable>
                </View>
                <View style={styles.socialChildContainer}>
                  <Image
                    source={require('./../../assets/social-icons/icons/Instagram.png')}
                    style={styles.socialIcon}
                  />
                </View>
                <View style={styles.socialChildContainer}>
                  <Image
                    source={require('./../../assets/social-icons/icons/Twitter.png')}
                    style={styles.socialIcon}
                  />
                </View>
                <View style={styles.socialChildContainer}>
                  <Image
                    source={require('./../../assets/social-icons/icons/LinkedIN.png')}
                    style={styles.socialIcon}
                  />
                </View>
              </View>
              <View style={styles.socialContainerChild}>
                <View style={styles.socialChild}>
                  <View style={styles.socialChildContainer}>
                    <Image
                      source={require('./../../assets/social-icons/icons/Github.png')}
                      style={styles.socialIcon}
                    />
                  </View>
                  <View style={styles.socialChildContainer}>
                    <Image
                      source={require('./../../assets/social-icons/icons/Dribbble.png')}
                      style={styles.socialIcon}
                    />
                  </View>
                  <View style={styles.socialChildContainer}>
                    <Image
                      source={require('./../../assets/social-icons/icons/Behance.png')}
                      style={styles.socialIcon}
                    />
                  </View>
                  <View style={styles.socialChildContainer}>
                    <Image
                      source={require('./../../assets/social-icons/icons/Youtube.png')}
                      style={styles.socialIcon}
                    />
                  </View>
                </View>
              </View>
              <View style={styles.socialContainerChild}>
                <View style={styles.socialChild}>
                  <View style={styles.socialChildContainer}>
                    <Image
                      source={require('./../../assets/social-icons/icons/tiktok.png')}
                      style={styles.socialIcon}
                    />
                  </View>
                  <View style={styles.socialChildContainer}>
                    <Image
                      source={require('./../../assets/social-icons/icons/Codeopen.png')}
                      style={styles.socialIcon}
                    />
                  </View>
                  <View style={styles.socialChildContainer}>
                    <Image
                      source={require('./../../assets/social-icons/icons/Snapchat.png')}
                      style={styles.socialIcon}
                    />
                  </View>
                  <View style={styles.socialChildContainer}>
                    <Image
                      source={require('./../../assets/social-icons/icons/link.png')}
                      style={styles.socialIcon}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
      {/* <BottomSheet data={route} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'white',
    // borderRadius: 8,
    // height: DEVICE_HEIGHT,
    // flex: 1,

    paddingBottom: DEVICE_HEIGHT * 0.15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },

    // shadowOpacity: 0.29,
    // shadowRadius: 4.65,
    // elevation: 7,

    // margin: 10,
    padding: 20,
  },
  imageContainer: {
    height: DEVICE_HEIGHT * 0.6,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 1,
    marginBottom: 20,
    // marginTop: 20,
  },
  image: {
    height: DEVICE_HEIGHT * 0.6,
    borderRadius: 8,
    display: 'flex',
  },

  header: {
    color: '#222',
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    paddingLeft: 20,
    paddingTop: 20,
    opacity: 0.8,
    fontFamily: 'Avenir',
  },

  body: {
    color: 'white',
    fontSize: 18,
    paddingLeft: 20,
    paddingLeft: 20,
    paddingRight: 20,
    color: 'white',
    opacity: 0.8,
    fontFamily: 'Avenir',
  },

  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 8,
    height: DEVICE_HEIGHT * 0.6,
    marginBottom: 20,
  },
  socialContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 40,
  },

  socialChild: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: DEVICE_HEIGHT * 0.02,
  },
  socialChildContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  aboutContainer: {
    // width: DEVICE_WIDTH * 0.8,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: DEVICE_HEIGHT * 0.04,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    marginTop: 30,
  },
  socialIcon: {
    width: 40,
    height: 40,
  },
});