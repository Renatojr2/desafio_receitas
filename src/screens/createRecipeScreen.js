/* eslint-disable prettier/prettier */
import React,{useState,useEffect, useContext} from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Picker,
  TouchableOpacity

} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Textarea from 'react-native-textarea';

import {useUser } from '../hooks/useCreateUser'
import {useRecipe } from '../hooks/userRecipe'
import {AppContext} from '../store/appContext'
import {useCategory} from '../hooks/useCategory'
import { useDatabase } from "../data/databaseContext";



import themes from '../config/themes';

const w = Dimensions.get('screen').width;





const CreateRecipe = () => {
    const [nome, setNome] = useState('')
    const [tempo, setTempo] = useState('')
    const [porcoes, setPorcoes] = useState('')
    const [categoria, setCategoria] = useState('')
    const [preparo, setPreparo] = useState('')
    const [ingredientes, setIngredientes] = useState('')

    const [selectedValue] = useState()
    const navigation = useNavigation()

    const {state, dispatch} = useContext(AppContext);
    const {category} = useCategory()
    const {insertRecipe} = useRecipe()
  

    const id_categorias = category.find(category => category.nome === selectedValue);
 

    

    const hangleCreateRecipe = async () => {
      const id = guidGenerator()
      await insertRecipe({id, nome, tempo, porcoes, preparo,ingredientes});
      const action = {type: 'categorySelected', payload: categoria }
      dispatch(action)
        navigation.pop();
      }


    const guidGenerator = () => {
      let S4 = function() {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
      };
      return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    }


    
    return (
      <ScrollView
      style={{
        width: '100%',
      }}
      >
    <View style={styles.container}>
      <View style={{ alignItems: 'center', width: '100%'}}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Crie uma receita</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.input} 
          placeholder='Nome da receita'
          value={nome}
          onChangeText={(t) => setNome(t)}
        />
        <TextInput 
          style={styles.input} 
          placeholder='Tempo de preparo(min)'
          value={tempo}
          keyboardType={'numeric'}
          onChangeText={(t) => setTempo(t)}
        />
       
        <TextInput  
          style={styles.input}
          placeholder='Porções'
          value={porcoes}
          keyboardType={'numeric'}
          onChangeText={(t) => setPorcoes(t)}
        />
        <View style={{marginBottom: 5}}>
          <Text style={{color: '#888'}}>Carnes, Sopa, Aves ou Sobremesa</Text>
        </View>
        <TextInput  
          style={styles.input}
          placeholder='Categoria'
          value={categoria}
          onChangeText={(t) => setCategoria(t)}
        />
        <Textarea
          containerStyle={styles.textareaContainer}
          style={styles.textarea}
          value={preparo}
          onChangeText={(t) => setPreparo(t)}
          maxLength={120}
          placeholder={'Modo de preparo'}
          placeholderTextColor={'#c7c7c7'}
          underlineColorAndroid={'transparent'}
        />
        <Textarea
          containerStyle={styles.textareaContainer}
          style={styles.textarea}
          value={ingredientes}
          onChangeText={setIngredientes}
          maxLength={120}
          placeholder={'Ingredientes'}
          placeholderTextColor={'#c7c7c7'}
          underlineColorAndroid={'transparent'}
        />
      <View style={{ alignItems: 'center', flexDirection: 'row'}}>
        <Pressable onPress={()=> navigation.goBack()} style={styles.btnBack}>
          <Text style={styles.btnTxt2}>voltar</Text>
        </Pressable>
        <TouchableOpacity onPress={hangleCreateRecipe} style={styles.btn}>
          <Text style={styles.btnTxt}>Criar</Text>
        </TouchableOpacity>
      </View>
    </View>
    </View>
    </View>
    </ScrollView>
  );
};

export default CreateRecipe;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    width: w,
 
  },

  textareaContainer: {
    height: 180,
    borderColor: '#666', 
    borderWidth: 1, 
    width: '70%', 
    marginBottom: 15, 
    borderRadius: 12,
    padding: 10,
  },

  title: {
    fontSize: 23,
    fontWeight: '500',
    color: '#111',
    marginVertical: 50,
  },

  banner: {
    width: w * .7,
  },

  btn: {
    width: 160,
    height: 60,
    backgroundColor: themes.colors.main,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 5,
    borderColor: '#FFF',
    marginTop: 20,
    marginBottom: 75,
  },

  btnBack: {
    width: 150,
    height: 50,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: themes.colors.main,
    marginTop: 20,
    marginBottom: 75,

  
  },


  btnTxt: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  btnTxt2: {
    color: themes.colors.main,
    fontSize: 18,
    fontWeight: '600',
    
  },

  inputContainer: {
    alignItems: 'center', 
    width: '100%'
  },
  input: {
    borderColor: '#666', 
    borderWidth: 1, 
    width: '70%', 
    marginBottom: 15, 
    borderRadius: 12,
    padding: 10,
  },
  inputPiker: {
    borderColor: '#666', 
    borderWidth: 1, 
    width: '70%', 
    marginBottom: 15, 
    borderRadius: 12,

  },
  textContainer: {
    marginTop: 10, 
    marginBottom: 30,
  },

  btn2: {
    marginBottom: 40,

  },
  textBtn2: {
    color: themes.colors.text,
    fontSize: 16,
  }

  
});
