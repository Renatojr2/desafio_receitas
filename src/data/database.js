import SQLite from "react-native-sqlite-storage";


import { DatabaseInitialization } from "./databaseInicialization";
import { AppState, AppStateStatus } from "react-native";

let databaseInstance;
 


async function createUser({id, nome, login, senha}) {
  return getDatabase()
    .then((db) => db.executeSql("INSERT INTO usuarios (id, nome, login , senha) VALUES (?, ?, ?, ?);", [id, nome, login, senha]))
    .then(([results]) => {
      
      console.log(`[db] usuario criado: "${results}"!`);
    });
}

async function insertId(id) {
  return getDatabase()
    .then((db) => db.executeSql("INSERT INTO id(id) VALUES (?);", [id]))
    .then(([results]) => {
      
      console.log(`[db] usuario criado: "${results}"!`);
    });
}
async function selectId() {
  return getDatabase()
    .then((db) => db.executeSql("SELECT * FROM id"))
    .then(([results]) => {
      if(results === undefined) {
        return []
      }
      const count = results.rows.length;
      const id = [];
      for (let i = 0; i < count; i++) {
        const row = results.rows.item(i);
    
        id.push(row);
      }
      return id;
    })
      
}

async function selectUsuario({login, senha}) {
  return getDatabase()
    .then((db) => db.executeSql(`SELECT * FROM usuarios WHERE login = ? and senha = ?;`, [login, senha] ))
    .then(([results]) => {
      if(results === undefined) {
        return []
      }
      const count = results.rows.length;
      const user = [];
      for (let i = 0; i < count; i++) {
        const row = results.rows.item(i);
    
        user.push(row);
      }
      return user;
    })
}


async function deleteRecipe(id) {
  return getDatabase()
    .then((db) =>
      db.executeSql("DELETE FROM receitas WHERE id = ?;",[id]),
    )
    .then(([results]) => {
      console.log('receita deletada')
    });
}

async function insertCategory(){ 
  return getDatabase()
    .then((db) => db.executeSql(
      "INSERT INTO categorias(id, nome) VALUES(?, ?), (?, ?), (?, ?), (?, ?);", ['1', 'Carnes','2', 'Sopas','3', 'Aves','4', 'Sobremesas']
    )).then(([results]) => {
      console.log(`Categorias criadas com sucesso `);
    })
}
async function insertRecipe({id,nome, tempo, porcoes, preparo,ingredientes}){
  return getDatabase().then((db) => db.executeSql(
      "INSERT INTO receitas(id, nome, tempo_preparo_minutos, porcoes, modo_preparo, ingredientes) VALUES (?, ?, ?, ?, ?, ?);",[id, nome, tempo, porcoes, preparo,ingredientes]
    )).then(([results]) => {
      console.log(`Receita criada com sucesso ${results.rows.item}`);
    }).catch((e) =>  console.log(e))
     
  
}

async function getRecipe() {
  return getDatabase()
    .then((db) =>
      db.executeSql(`SELECT * FROM receitas;`),
    )
    .then(([results]) => {
      console.log(results)
      if (results === undefined) {
        return [];
      }
      const count = results.rows.length;
      const Recipe = [];
      for (let i = 0; i < count; i++) {
        const row = results.rows.item(i);
        const { id, nome, tempo_preparo_minutos, porcoes, modo_preparo, ingredientes  } = row;
        
        Recipe.push({ id, nome, tempo_preparo_minutos, porcoes, modo_preparo, ingredientes });
      }
      console.log(`[db] Receitas`, Recipe);

      return Recipe;
    });
}

async function getEspecificRecipe(id) {
  
  return getDatabase()
    .then((db) =>
      db.executeSql(`SELECT * FROM receitas WHERE id = ?;`, [id]),
    )
    .then(([results]) => {
      console.log(results)
      if (results === undefined) {
        return [];
      }
      const count = results.rows.length;
      const Recipe = [];
      for (let i = 0; i < count; i++) {
        const row = results.rows.item(i);
       
        Recipe.push(row);
      }
      console.log(`[db] Receitas`, Recipe);

      return Recipe;
    });
}


async function getCategory() {
  return getDatabase()
    .then((db) =>
      db.executeSql(`SELECT * FROM categorias;`),
    )
    .then(([results]) => {
      if (results === undefined) {
        return [];
      }
      const count = results.rows.length;
      const Category = [];
      for (let i = 0; i < count; i++) {
        const row = results.rows.item(i);
        const { id, nome } = row;
        Category.push({ id, nome });
      }
      console.log(`[db] Categorias`, Category);
      return Category;
    });
}




async function getDatabase() {
  if (databaseInstance !== undefined) {
    return Promise.resolve(databaseInstance);
  }

  return open();
}


async function open(){
  SQLite.DEBUG(true);
  SQLite.enablePromise(true);

  if (databaseInstance) {
    console.log("[db] Database is already open: returning the existing instance");
    return databaseInstance;
  }


  const db = await SQLite.openDatabase({
    name: 'receitas_app.db',
    location: "default",
  });
  console.log("[db] Database open!");


  const databaseInitialization = new DatabaseInitialization();
  await databaseInitialization.updateDatabaseTables(db);

  databaseInstance = db;
  return db;
}


async function close() {
  if (databaseInstance === undefined) {
    console.log("[db] No need to close DB again - it's already closed");
    return;
  }
  const status = await databaseInstance.close();
  console.log("[db] Database closed.");
  databaseInstance = undefined;
}


let appState = "active";
console.log("[db] Adding listener to handle app state changes");
AppState.addEventListener("change", handleAppStateChange);


function handleAppStateChange(nextAppState) {
  if (appState === "active" && nextAppState.match(/inactive|background/)) {

    console.log("[db] App has gone to the background - closing DB connection.");
    close();
  }
  appState = nextAppState;
}


export const sqliteDatabase = {
  createUser,
  selectUsuario, 
  insertCategory, 
  getCategory,
  getRecipe,
  insertRecipe,
  getEspecificRecipe,
  insertId,
  selectId,
  deleteRecipe

};
