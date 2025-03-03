import express from 'express';
import Database from 'better-sqlite3';

const app = express();
const database = new Database('pointsofinterest.db');

app.get('/testpointsofinterest', (req, res) => {
    try {
        const stmt = database.prepare("SELECT * FROM pointsofinterest");
        const results = stmt.all();
        res.json(results);
    } catch(error) {
        res.status(500).json({ error: error });
    }
})

app.listen(3000);