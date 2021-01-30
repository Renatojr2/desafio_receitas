import React, {useContext, useEffect,useState} from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather'
import {useNavigation} from '@react-navigation/native';

import {useRecipe} from '../hooks/userRecipe';

import themes from '../config/themes';
import {AppContext} from '../store/appContext'

const w = Dimensions.get('screen').width;


const DetailScreen = () => {
  const {state, dispatch} = useContext(AppContext)
  // const [receitas, setReceitas] = useState([])
  const navigation = useNavigation();
  const {deleteRecipe, recipe, getEspecificRecipe} = useRecipe()

    
    const receitas = recipe.find((item) => {
      return item.id === state.item
    })
    console.log('fora', state.item)
    console.log('receitas id', recipe)
  
  
  useEffect(() => {
    getEspecificRecipe(state.item)
    console.log('state', state.item)
  },[])
  

  const onBack = () => {
    navigation.goBack();
  }
  const deletecurrentRecipe = () => {
    deleteRecipe(state.item)
    navigation.goBack();

  }



  return (
    <View style={styles.container}>
      <View style={styles.background}/>
      <View style={styles.header}>
        <Pressable onPress={onBack}>
          <Image source={require('../assets/icon/back.png')} />
        </Pressable>
        <Pressable onPress={deletecurrentRecipe}>
          <Icon name={'trash-2'} size={30} color={'#fff'}/>
        </Pressable>


      </View>
      <ScrollView
        style={{
          paddingTop: (w * 121) / 195 - 80,
          flex: 1,
          paddingHorizontal: 20,
          paddingBottom: 56,
        }}>
          {receitas ? 
          (<>
        <View>
          <View style={styles.body}>
          <Text style={styles.titleItem}>{receitas.nome}</Text>
          <View style={styles.footerCard}>
            <View style={styles.footerItem}>
              <Image source={require('../assets/icon/clock.png')} />
              <Text style={styles.footerItemText}>{receitas.tempo_preparo_minutos} min</Text>
            </View>
            <Text style={styles.footerItemText}>{receitas.porcoes} Porções</Text>
          </View>
        </View>
      </View>
      <Text style={styles.title}>Ingrdientes</Text>
      <View style={styles.body2}>
          <View style={styles.footerCard2}>
            <Text style={styles.footerItemText}>{receitas.modo_preparo}</Text>
            
          </View>

           
        </View>
          <View style={{marginTop: 20}}>
            <Text style={{marginRight: 10,  fontWeight: 'bold'}}>
              {' Modo de Preparo'}
            </Text>
            <Text>
              { receitas.ingredientes}
            </Text>
          </View>
        </>
        ):null
          }
      </ScrollView>
    </View>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 45,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    flexDirection: 'row',
    width: '100%',
    zIndex: 9999,
  },
  titleItem: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: '600',
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  body: {
    padding: 20,
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'gray',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

    body2: {
      padding: 10,
      flex: 1,
      flexDirection: 'row',
      backgroundColor: '#FFF',
      borderRadius: 10,
      shadowColor: 'gray',
      borderColor: themes.colors.main,
      borderWidth:1,
    },
  starCon: {
    flexDirection: 'row',
    marginVertical: 9,
  },
  star: {
    marginRight: 5,
  },
  footerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '60%',
  },

  footerCard2: {

    alignItems: 'flex-start',
    justifyContent: 'space-between',
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
    // position: 'absolute',
    // right: 15,
    // top: 1,
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 100,
  },
  background: {
    width: w,
    height: (w * 121) / 230,
    position: 'absolute',
    top: 0,
    backgroundColor: themes.colors.main,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
    marginVertical: 10,
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#222',
    marginVertical: 8,
  },
  desc: {
    color: 'gray',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  itemImg: {
    width: w / 3,
    height: w / 3,
    borderRadius: 20,
  },
  item: {
    paddingRight: 15,
    paddingVertical: 10,
    // marginRight: 10,
  },
  text: {
    fontSize: 15,
    // fontWeight: '500',
    color: '#222',
    lineHeight: 25,
  },
});
