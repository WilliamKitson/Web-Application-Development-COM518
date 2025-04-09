import databaseModule from "../modules/databaseModule.mjs";
import xss from "xss";

export default class LandmarkDao {
    constructor(database, table) {
        this.database = database;
        this.table = table;
    }

    getRegions() {
        const stmt = databaseModule.prepare(
            "SELECT DISTINCT region " +
            "FROM pointsofinterest"
        );

        const info = stmt.all()

        if (!info.length) {
            return null;
        }

        for (const i in info) {
            info[i].region = xss(info[i].region);
        }

        return info;
    }
}