import 'react-native-gesture-handler';
import React, {useReducer} from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {createStackNavigator} from '@react-navigation/stack';
import Login from './src/screens/LoginScreen';
import MainScreen from './src/screens/MainScreen';
import DetailScreen from './src/screens/DetailScreen';
import CreateRecipe from './src/screens/createRecipeScreen'
import CreateUser from './src/screens/CreateUserScreen';
import {DatabaseProvider} from './src/data/databaseContext'
import {AppContext, initialState, appReducer} from './src/store/appContext'

const Stack = createStackNavigator();

export default function App() {
  const [state, dispatch] = useReducer(appReducer ,initialState)
  return (
    <NavigationContainer>
      <AppContext.Provider value={{state, dispatch}}>
        <DatabaseProvider>
          <Stack.Navigator headerMode="none">
            <Stack.Screen
              name="IntroducScreen"
              component={Login} />
            <Stack.Screen
              name="MainScreen"
              component={MainScreen} />
            <Stack.Screen
              name="DetailScreen"
              component={DetailScreen} />
            <Stack.Screen
              name="CreateUser"
              component={CreateUser} />
            <Stack.Screen
              name="CreateRecipe"
              component={CreateRecipe} />
          </Stack.Navigator>
        </DatabaseProvider>
      </AppContext.Provider>
    </NavigationContainer>
  );
}
