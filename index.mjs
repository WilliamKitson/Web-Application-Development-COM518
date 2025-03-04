import express from 'express';
import Database from 'better-sqlite3';

const app = express();
const database = new Database('pointsofinterest.db');

app.use(express.json());

app.get('/pointsofinterest/:region', (req, res) => {
    try {
        const stmt = database.prepare("SELECT * FROM pointsofinterest WHERE region=?");
        const results = stmt.all(req.params.region);
        res.json(results);

    } catch(error) {
        res.status(500).json({ error: error });
    }
});

app.post('/pointsofinterest/create', (req, res) => {
    const {
        name,
        type,
        country,
        region,
        lat,
        lon,
        description,
        recommendations
    } = req.body;

    try {
        const stmt = database.prepare(
            "INSERT INTO pointsofinterest(name, type, country, region, lat, lon, description, recommendations) " +
            "VALUES(?,?,?,?,?,?,?,?)"
        );

        res.json(stmt.run(
            name,
            type,
            country,
            region,
            lat,
            lon,
            description,
            recommendations
        ));

    } catch(error) {
        console.log(error);
        res.status(500).json({ error: error });
    }
});

app.put('/pointsofinterest/recommend/:id', (req, res) =>{
    try {
        const stmt = database.prepare(
            "UPDATE pointsofinterest" +
            "SET recommendations = recommendations + 1" +
            "WHERE id = ?"
        );

        res.json(stmt.run(req.params.id));

    } catch(error) {
        res.status(500).json({error: error});
    }
});

app.listen(3000);