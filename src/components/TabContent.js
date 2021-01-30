import React, {useEffect} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { useRecipe } from "../hooks/userRecipe";

import themes from '../config/themes';
const w = Dimensions.get('screen').width;



const TabContent = ({onPress, recipe}) => { 

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity style={styles.item} onPress={onPress}>
        <View
          style={styles.image}
        />
        <View style={styles.body}>
          <Text style={styles.titleItem}>{item.nome}</Text>
          <View style={styles.footerCard}>
            <View style={styles.footerItem}>
              <Image source={require('../assets/icon/clock.png')} />
              <Text style={styles.footerItemText}>{item.tempo_preparo_minutos} min</Text>
            </View>
            <Text style={styles.footerItemText}>{item.porcoes} Porçoes</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.itemScroll}>
      <FlatList
        scrollEnabled={false}
        renderItem={renderItem}
        data={recipe}
      />
    </View>
  );
};

export default TabContent;

const styles = StyleSheet.create({
  title: {
    fontSize: 17,
    fontWeight: '600',
    color: 'gray',
    textAlign: 'center'
  },
 
  titleItem: {
    fontSize: 18,
    fontWeight: '600',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  body: {
    paddingHorizontal: 20,
    flex: 1,
  },
 
  line: {
    width: 30,
    height: 2,
    backgroundColor: themes.colors.main,
    alignSelf: 'center',
    marginTop: 3,
  },
  image: {
    width: w / 3.8,
    height: w / 3.8,
    borderRadius: 15,
    backgroundColor: themes.colors.main,
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',

  },
  footerCard: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',

  },
  footerItemText: {
    fontSize: 14,
    color: 'gray',
    marginLeft: 10,
    fontWeight: '500',
 
  },
  iconHeart: {
    tintColor: themes.colors.main,
  },
  buttonHeart: {
    position: 'absolute',
    right: 15,
    top: 1,
  },
  itemScroll: {
    width: w - 30,
  },
});
