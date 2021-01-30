import React, { useState, useContext, useEffect } from "react";
import {useNavigation} from '@react-navigation/native';

import { useDatabase } from "../data/databaseContext";
import {AppContext} from '../store/appContext'


export function useRecipe() {
  const [recipe, setRecipe] = useState([]);
  const [id, setId] = useState();
  const {state,dispatch} =  useContext(AppContext);
  const database = useDatabase();
  const navigation = useNavigation();


  async function insertRecipe(receita) {
    await database.insertRecipe(receita).then(setRecipe);
  }
  async function getId(id) {
    setId(id)
    dispatch({type: 'selectedItem', payload: id})
    navigation.navigate('DetailScreen')
  }

  async function getRecipe(receita) {
    await database.getRecipe(receita).then((res) => {
      const action = {type: 'selectRecipe', payload: res};
      dispatch(action);
      setRecipe(res)
      return res;
    })
  }




  

  return {
    insertRecipe,
    setRecipe,
    recipe,
    getRecipe,
    getId, id
  };
}