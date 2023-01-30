import {View, Text, FlatList, SafeAreaView, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {PermissionsAndroid} from 'react-native';
import CallLogs from 'react-native-call-log';

const CallLogsScreen = () => {
  const [listData, setListDate] = useState([]);
  const getLogs = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
        {
          title: 'Call Log Example',
          message: 'Access your call logs',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log(CallLogs);
        CallLogs.loadAll().then(c => {
          setListDate(c);
          console.log(c);
        });
      } else {
        console.log('Call Log permission denied');
      }
    } catch (e) {
      console.log(e);
    }
  };
  const ItemView = ({item}) => {
    return (
      // FlatList Item
      <View>
        <Text style={styles.textStyle}>
          Name : {item.name ? item.name : 'NA'}
          {'\n'}
          DateTime : {item.dateTime}
          {'\n'}
          Duration : {item.duration}
          {'\n'}
          PhoneNumber : {item.phoneNumber}
          {'\n'}
          RawType : {item.rawType}
          {'\n'}
          Timestamp : {item.timestamp}
          {'\n'}
          Type : {item.type}
        </Text>
      </View>
    );
  };

  const ItemSeparatorView = () => {
    return (
      // FlatList Item Separator
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };

  useEffect(() => {
    getLogs();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.titleText}>Call Logs</Text>
        <FlatList
          data={listData}
          //data defined in constructor
          ItemSeparatorComponent={ItemSeparatorView}
          //Item Separator View
          renderItem={ItemView}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </SafeAreaView>
  );
};

export default CallLogsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  titleText: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'grey',
  },
  textStyle: {
    fontSize: 16,
    marginVertical: 10,
    color: 'grey',
  },
});
