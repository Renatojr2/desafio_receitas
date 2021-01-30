import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useContext} from 'react';
import {ScrollView, StyleSheet, Text, Dimensions, View, Image, TouchableOpacity, FlatList} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';
import themes from '../config/themes';
import {useRecipe} from '../hooks/userRecipe';
import {AppContext} from '../store/appContext';




const w = Dimensions.get('window').width



const MainScreen = () => {
  const {state, dispatch} = useContext(AppContext)
  const navigation = useNavigation();
  const {getRecipe,recipe} = useRecipe()



  useEffect(() => {
    getRecipe()
  }, [])

  const handleDatails = async (id) => {
    dispatch({type: 'selectedItem', payload: id})
    navigation.navigate('DetailScreen')
  
  }


  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>O que você gostaria de cozinhar?</Text>

        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly'}}>
            <Text style={{fontSize: 18}}>Adicionar receita</Text>
            <TouchableOpacity 
              style={styles.btn}
              onPress={() => navigation.navigate('CreateRecipe')}
            >
              <Text style={styles.textButton}>+</Text>
            </TouchableOpacity>
          </View> 
        <View style={styles.itemScroll}>
        {
          state.recipe? state.recipe.map(item => (
            <TouchableOpacity style={styles.item} onPress={() => handleDatails(item.id)}>
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

          )): null
        }
       </View>
     
      </ScrollView>
    </SafeAreaView>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  title: {
    fontSize: 30,
    fontWeight: '500',
    color: '#41423F',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 15,

    // paddingTop: 50,
  },

  btn: {
    backgroundColor: themes.colors.main,
    width: 50,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  filterButton: {
    backgroundColor: themes.colors.main,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textButton: {
    fontSize: 40,
    color: '#fff',
  },
  iconsearch: {
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  title2: {
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
