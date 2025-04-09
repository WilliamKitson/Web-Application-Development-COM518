import databaseModule from "../modules/databaseModule.mjs";
import bcrypt from "bcrypt";

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

        bcrypt.hash(password, 10, function(err, hash) {
            return stmt.run(
                username,
                hash
            );
        });

        return null;
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