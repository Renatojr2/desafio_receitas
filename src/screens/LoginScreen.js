import React, {useEffect, useState, useContext} from 'react';
import {
  Dimensions,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useUser} from '../hooks/useCreateUser'

import {AppContext} from '../store/appContext'

import themes from '../config/themes';
import { enablePromise } from 'react-native-sqlite-storage';
const w = Dimensions.get('screen').width;

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState();
  const [senha, setSenha] = useState();
  const {selectUsuario, usuario, selectedUsuario} = useUser()
  const {_, dispatch} = useContext(AppContext)


  const handleLogin = async () =>  {
    selectUsuario({login: email, senha }).then(()=> {
      const action = { type: 'selectUser', payload: selectedUsuario};
      dispatch(action);

    });

  }

  return (
    <ScrollView
      style={{
        width: '100%',
      }}>
      <View style={styles.container}>
        <View>
          <Image
            resizeMode="center"
            source={require('../assets/icon/principal.png')}
            style={styles.banner}
          />
        </View>
        <View style={{alignItems: 'center', width: '100%', marginTop: -340}}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>O seu app de receitas</Text>
            <Text style={styles.title}>Faça deliciosos pratos.</Text>
          </View>

          <View style={styles.inputContainer}>
            <TextInput 
              style={styles.input} 
              placeholder="E-mail" 
              value={email}
              onChangeText={setEmail}
            />
            <TextInput 
              style={styles.input} 
              placeholder="Password"
              value={senha}
              onChangeText={setSenha}
              secureTextEntry={true}
            />
            <View style={{alignItems: 'center'}}>
              <TouchableOpacity
                onPress={handleLogin}
                style={styles.btn}>
                <Text style={styles.btnTxt}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('CreateUser')}
            style={styles.btn2}>
            <Text style={styles.textBtn2}>Não tenho uma conta.</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Login;

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
    width: w * 0.7,
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
    width: '100%',
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
  },
});
