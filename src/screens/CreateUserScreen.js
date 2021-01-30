/* eslint-disable prettier/prettier */
import React,{useState} from 'react';
import {
  Dimensions,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {useUser } from '../hooks/useCreateUser'
import {useCategory } from '../hooks/useCategory'



import themes from '../config/themes';
const w = Dimensions.get('screen').width;





const CreateUser = () => {
  const { createUser } = useUser();
  const { insertCategory } = useCategory();
    const [nome, setNome] = useState('')
    const [login, setLogin] = useState('')
    const [senha, setSenha] = useState('')
    const navigation = useNavigation()


    const guidGenerator = () => {
      var S4 = function() {
         return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
      };
      return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    }


    const handleCreateUser =  () => {
      const id = guidGenerator();
      createUser({id: id,nome, login, senha});
      insertCategory();
       navigation.pop();
      
    }
    
    return (
      <ScrollView
      style={{
        width: '100%',
      }}
      >
    <View style={styles.container}>
      <View>
      <Image
        resizeMode="center"
        source={require('../assets/icon/principal.png')}
        style={styles.banner}
      />
      </View>
      <View style={{ alignItems: 'center', width: '100%', marginTop: -340}}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Crie uma conta para para</Text>
        <Text style={styles.title}>acessar seu app de receitas.</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.input} 
          placeholder='Nome'
          value={nome}
          onChangeText={(t) => setNome(t)}
        />
        <TextInput  
          style={styles.input}
          placeholder='E-mail'
          value={login}
          onChangeText={(t) => setLogin(t)}
        />
        <TextInput 
          placeholder='Password' 
          style={styles.input}
          value={senha}
          onChangeText={(t) => setSenha(t)}
          secureTextEntry={true}
        />
      <View style={{ alignItems: 'center'}}>
        <TouchableOpacity onPress={handleCreateUser} style={styles.btn}>
          <Text style={styles.btnTxt}>Criar</Text>
        </TouchableOpacity>
      </View>
    </View>
    </View>
    </View>
    </ScrollView>
  );
};

export default CreateUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    width: w,
 
  },

  title: {
    fontSize: 23,
    fontWeight: '500',
    color: '#111',
  },

  banner: {
    marginTop: -310,
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
    marginBottom: 10,
  },


  btnTxt: {
    color: 'white',
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
