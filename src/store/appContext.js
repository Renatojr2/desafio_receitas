import { createContext } from 'react';

export const AppContext = createContext({});

export const appReducer = (state, action) => {
  switch (action.type) {
    case 'selectUser':
      return { user: action.payload };
    case 'selectCategory':
      return { category: action.payload };
    case 'categorySelected':
      return { categorySelected: action.payload };
    case 'selectRecipe':
      return { recipe: action.payload };
    case 'selectedItem':
      return { item: action.payload };
    default:
      return state;
  }
};

export const initialState = {
  user: {},
  category: [],
  recipe: [],
  categorySelected: '',
  item: '',
};