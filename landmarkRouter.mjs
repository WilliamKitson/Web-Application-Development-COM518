import express from 'express';
import Database from "better-sqlite3";

const landmarkRouter = express.Router();
const database = new Database("./pointsofinterest.db");

landmarkRouter.use(express.json());

landmarkRouter.get("/regions", (req, res) => {
    try {
        const stmt = database.prepare(
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
        const stmt = database.prepare(
            "SELECT * " +
            "FROM pointsofinterest " +
            "WHERE region=?"
        );

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

    try {
        const stmt = database.prepare(
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
        const stmt = database.prepare(
            "UPDATE pointsofinterest " +
            "SET recommendations = recommendations + 1 " +
            "WHERE id = ?"
        );

        res.json(stmt.run(req.params.id));

    } catch(error) {
        res.status(500).json({error: error});
    }
});

export default landmarkRouter;