import React, { useContext } from "react";
import { sqliteDatabase} from "../data/database";

const DatabaseContext = React.createContext(undefined);

export const DatabaseProvider= (props)=> {
  return <DatabaseContext.Provider value={sqliteDatabase} {...props} />;
};


export function useDatabase() {
  const database = useContext(DatabaseContext);
  if (database === undefined) {
    throw new Error("useDatabase must be used within a DatabaseProvider");
  }
  return database;
}