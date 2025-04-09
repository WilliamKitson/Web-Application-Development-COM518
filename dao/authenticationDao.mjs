import databaseModule from "../modules/databaseModule.mjs";

export default class AuthenticationDao {
    constructor(database, table) {
        this.database = database;
        this.table = table;
    }

    register(username, password) {
        const stmt = databaseModule.prepare(
            "INSERT INTO poi_users(username, password) " +
            "VALUES(?,?)"
        );

        return stmt.run(
            username,
            password
        );
    }

    login(username) {
        const stmt = databaseModule.prepare(
            "SELECT * " +
            "FROM poi_users " +
            "WHERE username=? "
        );

        const info = stmt.all(username);

        if (!info.length) {
            return null;
        }

        return info[0];
    }
}