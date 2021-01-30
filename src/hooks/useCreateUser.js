import React, { useState, useEffect, useContext } from "react";
import {Alert} from 'react-native'
import {useNavigation} from '@react-navigation/native';

import { useDatabase } from "../data/databaseContext";
import {AppContext} from '../store/appContext'


export function useUser() {
  const [usuario, setUsuario] = useState([]);
  const [selectedUsuario, setSelectedUsuario] = useState([]);
  const {state, dispatch} =  useContext(AppContext);
  const database = useDatabase();
  const navigation = useNavigation();



  async function createUser(usuario) {
    await database.createUser(usuario).then(setUsuario);
  }


  async function selectUsuario({login, senha}) {
    return await database.selectUsuario({login, senha}).then((res) => {
      if(res.length > 0) {
        setSelectedUsuario(res);
        const action = {type: 'getUser', payload: res};
        dispatch(action);
        
        navigation.navigate('MainScreen');
      } else {
        Alert.alert('Atenção', 'Senha ou usuario inválido!');
      }

    })
  }

  return {
    usuario,
    selectedUsuario,
    createUser,
    selectUsuario,
  };
}