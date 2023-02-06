import React, {useState, useCallback, useEffect, useRef} from 'react';
import {
  Animated,
  View,
  Text,
  StyleSheet,
  Button,
  Dimensions,
  Image,
  ActivityIndicator,
  Pressable,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {useData} from '../../Context/UserDataContext';

import {DEVICE_HEIGHT, DEVICE_WIDTH} from './../../App';

export const SLIDER_WIDTH = Dimensions.get('window').width * 1.5;
export const SLIDER_HEIGHT = Dimensions.get('window').height * 0.65;
console.log(SLIDER_HEIGHT, '.........');
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.55);

export const UserCards = ({navigation}) => {
  const {loader, cardData, cardExists, setOneCardData} = useData();
  const [selectedcard, setSelectedcard] = useState(null);

  const CreateCardHandler = () => {
    navigation.navigate('CreateCardName');
  };

  // console.log(cardData, '..............................cardData');
  const onPresshandlerCard = item => {
    navigateHandler();
    setOneCardData(item);
    setSelectedcard(item._id);
  };

  const navigateHandler = useCallback(() => {
    if (selectedcard !== null) {
      const item = cardData.filter(data => {
        if (data._id === selectedcard) {
          console.log(data, '...........updated data');
          return data;
        }
      });
      setOneCardData(item[0]);
      navigation.navigate({
        name: 'UserCardView',
        params: item,
      });
    }
  }, [cardData, selectedcard]);

  const CreateNewCard = () => {
    navigation.navigate('CreateCardName');
  };

  useEffect(() => {
    navigateHandler();
  }, [navigateHandler]);

  const CarouselCardItem = ({item, index}) => {
    return (
      <View style={{margin: 10}}>
        <TouchableOpacity onPress={() => onPresshandlerCard(item)}>
          <View style={styles.container} key={index}>
            <View>
              <View>
                <Image
                  source={{uri: item.profileimagepath}}
                  style={styles.image}
                />
                <View style={styles.overlay} />
              </View>

              <View
                style={{
                  position: 'absolute',
                  bottom: DEVICE_HEIGHT * 0.03,
                }}>
                {item.name === undefined || '' ? (
                  <Text style={styles.header}>Add a name</Text>
                ) : (
                  <Text style={styles.header}>{item.name}</Text>
                )}

                <Text style={styles.body}>{item.company}</Text>
                <Text style={styles.body}>{item.jobtitle}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {loader ? (
        <ActivityIndicator />
      ) : (
        <View>
          {cardExists === false ? (
            <Pressable onPress={CreateCardHandler}>
              <Text style={styles.cardElement}>Create Your New Card</Text>
            </Pressable>
          ) : (
            <View>
              <FlatList
                data={cardData}
                renderItem={CarouselCardItem}
                horizontal
              />
              <Pressable
                onPress={CreateNewCard}
                style={styles.createCardElement}>
                <Text style={{color: 'grey', fontWeight: 'bold', fontSize: 16}}>
                  Create a new card
                </Text>
              </Pressable>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    width: ITEM_WIDTH,
    height: SLIDER_HEIGHT,
    paddingBottom: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    marginTop: 50,
  },
  image: {
    width: ITEM_WIDTH,
    height: SLIDER_HEIGHT,
    borderRadius: 8,
  },
  header: {
    color: '#222',
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    paddingLeft: 20,
    paddingTop: 20,
    opacity: 0.8,
  },

  body: {
    color: '#222',
    fontSize: 18,
    paddingLeft: 20,
    paddingLeft: 20,
    paddingRight: 20,
    color: 'white',
    opacity: 0.8,
  },
  cardElement: {
    display: 'flex',
    fontSize: 20,
    fontWeight: 'bold',
    borderWidth: 1,
    borderColor: '#000',
    height: 300,
    width: ITEM_WIDTH,
    borderRadius: 20,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#000',
  },

  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 8,
  },
  createCardElement: {
    display: 'flex',
    fontSize: 20,
    borderWidth: 1,
    borderColor: '#20232a',
    height: DEVICE_HEIGHT * 0.08,
    width: 200,
    borderRadius: 20,
    textAlign: 'center', // <-- the magic
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: DEVICE_HEIGHT * 0.05,
  },
});
