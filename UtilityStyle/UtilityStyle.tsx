import {StyleSheet} from 'react-native';
import {DEVICE_HEIGHT, DEVICE_WIDTH} from './../App';

export const utilityStyles = StyleSheet.create({
  flexCenterRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  errorMessage: {
    color: '#FF0000',
    fontSize: 12,
    margin: 5,
  },
});
