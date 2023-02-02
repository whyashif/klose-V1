import {
  View,
  Text,
  Button,
  PermissionsAndroid,
  Platform,
  AppState,
} from 'react-native';
import React, {useEffect, useCallback} from 'react';
import VIForegroundService from '@voximplant/react-native-foreground-service';
import BackgroundService from 'react-native-background-actions';
import CallDetectorManager from 'react-native-call-detection';
import ReactNativeForegroundService from '@supersami/rn-foreground-service';

const sleep = time => new Promise(resolve => setTimeout(() => resolve(), time));

const veryIntensiveTask = async taskDataArguments => {
  // Example of an infinite loop task
  const {delay} = taskDataArguments;
  await new Promise(async resolve => {
    for (let i = 0; BackgroundService.isRunning(); i++) {
      console.log(i);
      await sleep(delay);
    }
  });
};

const options = {
  taskName: 'Example',
  taskTitle: 'ExampleTask title',
  taskDesc: 'ExampleTask description',
  taskIcon: {
    name: 'ic_launcher',
    type: 'mipmap',
  },
  color: '#ff00ff',
  linkingURI: 'yourSchemeHere://chat/jane', // See Deep Linking for more info
  parameters: {
    delay: 1000,
  },
};

const BackgroundRun = () => {
  const createNotificationChannel = async () => {
    const channelConfig = {
      id: 'channelId',
      name: 'Channel name',
      description: 'Channel description',
      enableVibration: false,
    };
    await VIForegroundService.getInstance().createNotificationChannel(
      channelConfig,
    );
  };

  const startForegroundService = async () => {
    const notificationConfig = {
      channelId: 'channelId',
      id: 3456,
      title: 'Title',
      text: 'Some text',
      icon: 'ic_icon',
      button: 'Some text',
    };
    try {
      await VIForegroundService.getInstance().startService(notificationConfig);
    } catch (e) {
      console.error(e);
    }
  };

  const stopForeGround = async () => {
    await VIForegroundService.getInstance().stopService();
  };

  const StartBgService = async () => {
    await BackgroundService.start(veryIntensiveTask, options);
    await BackgroundService.updateNotification({
      taskDesc: 'New ExampleTask description',
    });
  };

  const StopBgService = async () => {
    await BackgroundService.stop();
  };

  useEffect(() => {
    askPermission();
  });

  askPermission = async () => {
    try {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
        PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
      ]);
    } catch (err) {
      console.warn(err);
    }
  };
  useEffect(() => {
    // const callDetector = new CallDetectorManager((event, phoneNumber) => {
    //   if (event === 'Disconnected') {
    //   } else if (event === 'Connected') {
    //     console.log('Connect');
    //   } else if (event === 'Incoming') {
    //     console.log('Incoming', phoneNumber);
    //   } else if (event === 'Dialing') {
    //   } else if (event === 'Offhook') {
    //   } else if (event === 'Missed') {
    //   }
    // }, true);
    // const subscription = AppState.addEventListener('change', nextAppState => {
    //   if (nextAppState === 'active') {
    //     onStop();
    //   } else onStart();
    // });
    // return () => {
    //   // callDetector.dispose()
    //   subscription.remove();
    // };
  }, []);

  const onStart = () => {
    if (ReactNativeForegroundService.is_task_running('callLogTask')) return;
    ReactNativeForegroundService.add_task(
      () => {
        console.log('start task');
      },
      {
        delay: 5000,
        onLoop: true,
        taskId: 'callLogTask',
        onError: e => console.log(`Error logging:`, e),
      },
    );
    return ReactNativeForegroundService.start({
      id: 144,
      visibility: 'secret',
      importance: 'low',
    });
  };

  const onStop = () => {
    if (ReactNativeForegroundService.is_task_running('callLogTask')) {
      ReactNativeForegroundService.remove_task('callLogTask');
    }
    return ReactNativeForegroundService.stop();
  };
  return (
    <View>
      <Text>BackgroundRun</Text>
      <Button onPress={StartBgService} title="Start" />
      <Button onPress={StopBgService} title="Stop" />
    </View>
  );
};

export default BackgroundRun;
