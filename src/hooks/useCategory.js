import React, { useState, useContext, useEffect } from "react";

import { useDatabase } from "../data/databaseContext";
import {AppContext} from '../store/appContext'


export function useCategory() {
  const [category, setCategory] = useState([]);
  const {state,dispatch} =  useContext(AppContext);
  const database = useDatabase();

  useEffect(() => {
    insertCategory();
  }, []);

  function insertCategory() {
    database.getCategory().then(res => {
      if(res.length === 0) {
        database.insertCategory().then(setCategory);
      } else {
      const action = {type: 'selectCategory', payload: res};
      dispatch(action);
      setCategory(res);
      }
    })
  }


  
  

  return {
    category,
    setCategory,
    insertCategory
  };
}