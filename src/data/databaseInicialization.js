import SQLite from "react-native-sqlite-storage";

export class DatabaseInitialization {

 
  updateDatabaseTables(database){
    let dbVersion = 0;

 
    return database
      .transaction(this.createTables)  
      .then(() => {
 
        return this.getDatabaseVersion(database);
      })
      .then(version => {
        dbVersion = version;
        console.log("versão: " + dbVersion);


        if (dbVersion < 1) {
    
        }
      
        return;
      });
  }

  createTables(transaction) {

    transaction.executeSql(
      'CREATE TABLE IF NOT EXISTS usuarios('+
        'id TEXT PRIMARY KEY,'+
        'nome VARCHAR(100) NULL,'+
        'login VARCHAR(100) NOT NULL,'+
        'senha VARCHAR(100) NOT NULL);'
      );

    
    transaction.executeSql(
      `CREATE TABLE IF NOT EXISTS receitas (
        id TEXT PRIMARY KEY,
        nome VARCHAR(45) NOT NULL,
        tempo_preparo_minutos INT NOT NULL,
        porcoes INT  NOT NULL,
        modo_preparo TEXT NOT NULL,
        ingredientes TEXT NOT NULL
        );`
      );

    
    transaction.executeSql(
      `CREATE TABLE IF NOT EXISTS categorias(
        id TEXT PRIMARY KEY,
        nome VARCHAR(100) NULL
      );`
    );
     

    transaction.executeSql(`
      CREATE TABLE IF NOT EXISTS Version(
        version_id INTEGER PRIMARY KEY NOT NULL,
        version INTEGER
      );
    `);
  }


  getDatabaseVersion(database) {
    return database
      .executeSql("SELECT version FROM Version ORDER BY version DESC LIMIT 1;")
      .then(([results]) => {
        if (results.rows && results.rows.length > 0) {
          const version = results.rows.item(0).version;
          return version;
        } else {
          return 0;
        }
      })
      .catch((error) => {
        console.log(`Versão database: ${error}`);
        return 0;
      });
  }
}