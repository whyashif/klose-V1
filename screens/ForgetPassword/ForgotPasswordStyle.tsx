import { StyleSheet } from 'react-native';
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '../../App';

export const styles = StyleSheet.create({
  container: {
    marginLeft: 30,
    marginRight: 30,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: DEVICE_HEIGHT * 0.03,
  },
  signUptext: {
    color: '#9B9B9B',
    fontSize: DEVICE_HEIGHT * 0.025,
    marginTop: DEVICE_HEIGHT * 0.04,
    fontFamily: 'Avenir',
  },
  inputContainer1: {
    // marginTop: DEVICE_HEIGHT * 0.04,
  },

  // borderColor: '#D6A6DE',
  passwordInputContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#D6A6DE',
    borderWidth: 1,
    borderRadius: 8,
    // marginTop: DEVICE_HEIGHT * 0.02,
  },

  inputHeader: {
    color: '#9B9B9B',
    fontSize: DEVICE_HEIGHT * 0.015,
    fontFamily: 'Avenir',
    marginBottom: 5,
    marginTop: 5,
  },
  inputHeaderMessage: {
    color: '#9B9B9B',
    fontSize: DEVICE_HEIGHT * 0.015,
    fontFamily: 'Avenir',
    // marginBottom: 10,s
    marginTop: 5,
  },

  inputHeaderEmail: {
    fontSize: DEVICE_HEIGHT * 0.015,
    fontFamily: 'Avenir',
    marginBottom: DEVICE_HEIGHT * 0.02,
    color: 'rgba(86, 86, 87, 0.8)',
  },

  // input2: {
  //   height: 58,
  //   borderWidth: 1,
  //   padding: 10,
  //   borderColor: '#D6A6DE',
  //   borderRadius: 8,
  //   // marginTop: DEVICE_HEIGHT * 0.02,
  //   color: '#000',
  // },

  input: {
    height: 58,
    padding: 10,
    display: "flex",
    flex: 1,
    borderWidth: 1,
    borderColor: 'transparent',
    color: '#4A4A4A',
  },

  input1: {
    height: 58,
    padding: 10,
    display: "flex",
    flex: 1,
    borderWidth: 1,
    borderColor: 'transparent',

    // borderRadius: 8,
    color: '#4A4A4A',
    // position: 'relative',
  },
  buttonForgetPassword: {
    color: '#881098',
    display: 'flex',
    alignItems: 'flex-end',
    fontWeight: 'bold',
    // marginVertical: 5,
    marginRight: 5
  },
  buttonForgetPassword2: {
    color: 'rgba(74, 74, 74,0.5)',
    display: 'flex',
    alignItems: 'flex-end',
    fontWeight: 'bold',
    // marginVertical: 5,
    marginRight: 5
  },
  button: {
    backgroundColor: '#881098',
    height: 58,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    marginVertical: DEVICE_HEIGHT * 0.02,
    fontFamily: 'Avenir',
  },
});
