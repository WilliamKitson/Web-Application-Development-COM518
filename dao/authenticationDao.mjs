import databaseModule from "../modules/databaseModule.mjs";
import bcrypt from "bcrypt";

export default class AuthenticationDao {
    constructor(database, table) {
        this.database = database;
        this.table = table;
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