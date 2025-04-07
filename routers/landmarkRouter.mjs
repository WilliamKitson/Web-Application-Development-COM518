import express from 'express';
import Database from "better-sqlite3";
import xss from 'xss';
import expressSession from 'express-session';
import betterSqlite3Session from 'express-session-better-sqlite3';
import databaseModule from "../databaseModule.mjs";

const landmarkRouter = express.Router();
landmarkRouter.use(express.json());

const sessionDatabase = new Database('session.db');
const sqliteStore = betterSqlite3Session(expressSession, sessionDatabase);

landmarkRouter.use(expressSession({
    store: new sqliteStore(),
    secret: 'BinnieAndClyde',
    resave: true,
    saveUninitialized: false,
    rolling: true,
    unset: 'destroy',
    proxy: true,
    cookie: {
        maxAge: 600000,
        httpOnly: false
    }
}));

landmarkRouter.get("/regions", (req, res) => {
    if (req.session.username == null) {
        res.status(401).json({ error: "you are not logged in." });
        return;
    }

    try {
        const stmt = databaseModule.prepare(
            "SELECT DISTINCT region " +
            "FROM pointsofinterest"
        );

        const info = stmt.all()

        for (const i in info) {
            info[i].region = xss(info[i].region);
        }

        res.json(info);

    } catch(error) {
        res.status(500).json({ error: error });
    }
});

landmarkRouter.get("/:region", (req, res) => {
    if (req.session.username == null) {
        res.status(401).json({ error: "you are not logged in." });
        return;
    }

    try {
        const stmt = databaseModule.prepare(
            "SELECT * " +
            "FROM pointsofinterest " +
            "WHERE region=?"
        );

        const info = stmt.all(xss(req.params.region));

        for (const i in info) {
            info[i].id = xss(info[i].id);
            info[i].name = xss(info[i].name);
            info[i].type = xss(info[i].type);
            info[i].country = xss(info[i].country);
            info[i].region = xss(info[i].region);
            info[i].lon = xss(info[i].lon);
            info[i].lat = xss(info[i].lat);
            info[i].description = xss(info[i].description);
            info[i].recommendations = xss(info[i].recommendations);
        }

        if (!info.length) {
            res.status(404).json({ error: "no points of interest associated with this region." });
        }

        res.json(info);

    } catch(error) {
        res.status(500).json({ error: error });
    }
});

landmarkRouter.post("/create", (req, res) => {
    if (req.session.username == null) {
        res.status(401).json({ error: "you are not logged in." });
        return;
    }

    const {
        name,
        type,
        country,
        region,
        lon,
        lat,
        description
    } = req.body;

    if (!name) {
        res.status(400).json({ error: "no name supplied" });
        return;
    }

    if (!type) {
        res.status(400).json({ error: "no type supplied" });
        return;
    }

    if (!country) {
        res.status(400).json({ error: "no country supplied" });
        return;
    }

    if (!region) {
        res.status(400).json({ error: "no region supplied" });
        return;
    }

    if (lon == null) {
        res.status(400).json({ error: "no longitude supplied" });
        return;
    }

    if (lat == null) {
        res.status(400).json({ error: "no latitude supplied" });
        return;
    }

    if (!description) {
        res.status(400).json({ error: "no description supplied" });
        return;
    }

    try {
        const stmt = databaseModule.prepare(
            "INSERT INTO pointsofinterest(name, type, country, region, lat, lon, description, recommendations) " +
            "VALUES(?,?,?,?,?,?,?,0)"
        );

        res.json(stmt.run(
            xss(name),
            xss(type),
            xss(country),
            xss(region),
            xss(lat),
            xss(lon),
            xss(description)
        ));

    } catch(error) {
        res.status(500).json({ error: error });
    }
});

landmarkRouter.put("/recommend/:id", (req, res) =>{
    if (req.session.username == null) {
        res.status(401).json({ error: "you are not logged in." });
        return;
    }

    try {
        const stmt = databaseModule.prepare(
            "UPDATE pointsofinterest " +
            "SET recommendations = recommendations + 1 " +
            "WHERE id = ?"
        );

        const info = stmt.run(req.params.id);

        if(!info.changes) {
            res.status(404).json({error: 'no point of interest with that ID'});
            return;
        }

        res.json(info);

    } catch(error) {
        res.status(500).json({error: error});
    }
});

export default landmarkRouter;