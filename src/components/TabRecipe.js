import React, {useState, useContext, useEffect} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import themes from '../config/themes';
import TabContent from './TabContent';
const w = Dimensions.get('screen').width;
const tabs = ['Carnes', 'Saladas', 'Sopas', 'Doces'];
import {AppContext} from '../store/appContext'
import {useCategory} from '../hooks/useCategory'


const TabRecipe = ({onPress}) => {
  const [selected, setSelected] = useState(0);
  const {state,_} = useContext(AppContext);
  const {category} = useCategory()
  const recipe = state.recipe


  const onScroll = ({nativeEvent}) => {
    const index = Math.round(nativeEvent.contentOffset.x / (w - 20));
    
    setSelected(index);
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ScrollView horizontal>
          {category.map((e, i) => (
            <Pressable key={e.id} onPress={() => setSelected(i)}>
              <Text
                style={[
                  styles.title,
                  selected === i && {color: themes.colors.main},
                ]}>
                {e.nome}
              </Text>
              {selected === i && <View style={styles.line} />}
            </Pressable>
          ))}
        </ScrollView>
      </View>
      <ScrollView
        horizontal
        pagingEnabled
        snapToAlignment="center"
        onScroll={onScroll}
        decelerationRate="fast">
        <TabContent recipe={recipe} onPress={onPress} />
      </ScrollView>
    </View>
  );
};

export default TabRecipe;

const styles = StyleSheet.create({
  title: {
    fontSize: 17,
    fontWeight: '600',
    color: 'gray',
    marginLeft: 10,
  },
  starCon: {
    flexDirection: 'row',
    marginVertical: 9,
  },
  star: {
    marginRight: 5,
  },
  titleItem: {
    fontSize: 16,
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
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
    borderRadius: 10,
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerCard: {
    flexDirection: 'row',
    alignItems: 'center',
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
    position: 'absolute',
    right: 15,
    top: 1,
  },
});
