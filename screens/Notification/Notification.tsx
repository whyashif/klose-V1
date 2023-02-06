import React, {useEffect} from 'react';
import {View, Button} from 'react-native';
import notifee, {AndroidImportance, EventType} from '@notifee/react-native';

export const NotificationScreen = () => {
  async function onDisplayNotification() {
    // Request permissions (required for iOS)
    await notifee.requestPermission();

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    // Display a notification
    await notifee.displayNotification({
      title:
        '<p style="color: #4caf50;"><b>Styled HTMLTitle</span></p></b></p> &#128576;',
      subtitle: '&#129395;',
      body: 'Aisa dikhta hai LOCAL NOTIFICATION',
      android: {
        channelId,
        color: '#4caf50',
        actions: [
          {
            title: '<b>Dance</b> &#128111;',
            pressAction: {id: 'dance'},
          },
          {
            title: '<p style="color: #f44336;"><b>Cry</b> &#128557;</p>',
            pressAction: {id: 'cry'},
          },
        ],
        importance: AndroidImportance.HIGH,
      },
    });
  }

  useEffect(() => {
    setInterval(() => {
      onDisplayNotification();
    }, 3000);
    notifee.onBackgroundEvent(() => {
      onDisplayNotification();
    });
  }, []);

  return (
    <View>
      <Button
        title="Display Notification"
        onPress={() => onDisplayNotification()}
      />
    </View>
  );
};
