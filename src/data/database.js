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


async function getAllLists() {
  console.log("[db] Fetching lists from the db...");
  return getDatabase()
    .then((db) =>
      
      db.executeSql("SELECT list_id as id, title FROM List ORDER BY id DESC;"),
    )
    .then(([results]) => {
      if (results === undefined) {
        return [];
      }
      const count = results.rows.length;
      const lists = [];
      for (let i = 0; i < count; i++) {
        const row = results.rows.item(i);
        const { title, id } = row;
        console.log(`[db] List title: ${title}, id: ${id}`);
        lists.push({ id, title });
      }
      return lists;
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

async function updateListItem(listItem) {
  const doneNumber = listItem.done ? 1 : 0;
  return getDatabase()
    .then((db) =>
      db.executeSql("UPDATE ListItem SET text = ?, done = ? WHERE item_id = ?;", [
        listItem.text,
        doneNumber,
        listItem.id,
      ]),
    )
    .then(([results]) => {
      console.log(`[db] List item with id: ${listItem.id} updated.`);
    });
}

async function deleteList(list) {
  console.log(`[db] Deleting list titled: "${list.title}" with id: ${list.id}`);
  return getDatabase()
    .then((db) => {
      return db.executeSql("DELETE FROM ListItem WHERE list_id = ?;", [list.id]).then(() => db);
    })
    .then((db) => db.executeSql("DELETE FROM List WHERE list_id = ?;", [list.id]))
    .then(() => {
      console.log(`[db] Deleted list titled: "${list.title}"!`);
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
  insertRecipe
};
