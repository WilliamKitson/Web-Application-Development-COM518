import express from 'express';
import Database from "better-sqlite3";
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

        res.json(stmt.all());

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

        const info = stmt.all(req.params.region);

        if (!info.length) {
            res.status(404).json({ error: "no points of interest associated with this region." });
        }

        const results = stmt.all(req.params.region);
        res.json(results);

    } catch(error) {
        res.status(500).json({ error: error });
    }
});

landmarkRouter.post("/create", (req, res) => {
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
            name,
            type,
            country,
            region,
            lat,
            lon,
            description
        ));

    } catch(error) {
        res.status(500).json({ error: error });
    }
});

landmarkRouter.put("/recommend/:id", (req, res) =>{
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