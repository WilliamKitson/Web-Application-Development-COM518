import express from 'express';
import databaseModule from "../databaseModule.mjs";

const landmarkRouter = express.Router();
landmarkRouter.use(express.json());

landmarkRouter.get("/regions", (req, res) => {
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
        lat,
        lon,
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

    if (!lat) {
        res.status(400).json({ error: "no latitude supplied" });
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