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

    createLandmark(name, type, country, region, lat, lon, description) {
        const stmt = databaseModule.prepare(
            "INSERT INTO pointsofinterest(name, type, country, region, lat, lon, description, recommendations) " +
            "VALUES(?,?,?,?,?,?,?,0)"
        );

        return stmt.run(
            xss(name),
            xss(type),
            xss(country),
            xss(region),
            xss(lat),
            xss(lon),
            xss(description)
        );
    }

    recommendLandmark(landmark) {
        const stmt = databaseModule.prepare(
            "UPDATE pointsofinterest " +
            "SET recommendations = recommendations + 1 " +
            "WHERE id = ?"
        );

        const info = stmt.run(xss(landmark));

        if(!info.changes) {
            return null;
        }

        return info;
    }

    reviewLandmark(landmark, review) {
        const stmt = databaseModule.prepare(
            "INSERT INTO poi_reviews(poi_id, review) " +
            "VALUES(?,?)"
        );

        return stmt.run(
            xss(landmark),
            xss(review)
        );
    }
}