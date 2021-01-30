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

  // useEffect(() => {
  //   dispatch({type: 'selectedItem', payload: id})
  // },[id])

  async function insertRecipe(receita) {
    await database.insertRecipe(receita).then(setRecipe);
  }
  async function isertId(id) {
    await database.insertId(id).then(setId)
  
  }

  async function getRecipe(receita) {
    await database.getRecipe(receita).then((res) => {
      const action = {type: 'selectRecipe', payload: res};
      dispatch(action);
      setRecipe(res)
      return res;
    })
  }
  async function getEspecificRecipe(id) {
    await database.getEspecificRecipe(id).then((res) => {
      setRecipe(res)
      return res;
    })
  }




  

  return {
    insertRecipe,
    setRecipe,
    recipe,
    getRecipe,
     id,
    getEspecificRecipe,
    isertId
  };
}