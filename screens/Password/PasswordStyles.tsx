import {StyleSheet} from 'react-native';
import {DEVICE_HEIGHT, DEVICE_WIDTH} from '../../App';

export const styles = StyleSheet.create({
  container: {
    marginLeft: 30,
    marginRight: 30,
  },
  header: {
    // flex: 1,
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
  inputContainer: {
    marginTop: DEVICE_HEIGHT * 0.04,
  },

  inputHeader: {
    color: '#9B9B9B',
    fontSize: DEVICE_HEIGHT * 0.015,
    fontFamily: 'Avenir',
    marginBottom: 5,
  },

  passwordInputContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#D6A6DE',
    borderWidth: 1,
    borderRadius: 8,
  },
  input: {
    height: 58,
    width: '90%',
    borderWidth: 1,
    padding: 10,
    borderColor: 'transparent',
    color: '#4A4A4A',
  },
  buttonForgetPassword: {
    color: '#881098',
    display: 'flex',
    alignItems: 'flex-end',
    fontWeight: 'bold',
    fontSize: DEVICE_HEIGHT * 0.015,
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
