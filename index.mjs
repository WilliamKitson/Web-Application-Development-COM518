import express from 'express';
import Database from 'better-sqlite3';

const app = express();
const database = new Database('pointsofinterest.db');

app.get('/pointsofinterest/:region', (req, res) => {
    try {
        const stmt = database.prepare("SELECT * FROM pointsofinterest WHERE region=?");
        const results = stmt.all(req.params.region);
        res.json(results);
    } catch(error) {
        res.status(500).json({ error: error });
    }
});

app.listen(3000);