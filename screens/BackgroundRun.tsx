import {View, Text, Button} from 'react-native';
import React, {useEffect} from 'react';
import VIForegroundService from '@voximplant/react-native-foreground-service';
import BackgroundService from 'react-native-background-actions';

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
    createNotificationChannel();
  }, []);

  return (
    <View>
      <Text>BackgroundRun</Text>
      <Button onPress={StartBgService} title="Start" />
      <Button onPress={StopBgService} title="Stop" />
    </View>
  );
};

export default BackgroundRun;
