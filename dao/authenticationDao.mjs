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

    async login(username, password) {
        const stmt = databaseModule.prepare(
            "SELECT * " +
            "FROM poi_users " +
            "WHERE username=? "
        );

        const info = stmt.all(username);

        if (info.length) {
            const match = await bcrypt.compare(password, info[0].password);

            if (match) {
                return info[0];
            }
        }

        return null;
    }
}