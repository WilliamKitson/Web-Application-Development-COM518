import Database from "better-sqlite3";
const databaseModule = new Database("./pointsofinterest.db");
export default databaseModule;