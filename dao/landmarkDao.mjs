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

    getLandmarks(region) {
        const stmt = databaseModule.prepare(
            "SELECT * " +
            "FROM pointsofinterest " +
            "WHERE region=?"
        );

        const info = stmt.all(xss(region));

        if (!info.length) {
            return null;
        }

        for (const i in info) {
            info[i].id = xss(info[i].id);
            info[i].name = xss(info[i].name);
            info[i].type = xss(info[i].type);
            info[i].country = xss(info[i].country);
            info[i].region = xss(info[i].region);
            info[i].description = xss(info[i].description);
        }

        return info;
    }
}