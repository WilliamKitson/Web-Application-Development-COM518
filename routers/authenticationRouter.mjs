import express from 'express';
import Database from "better-sqlite3";
import expressSession from 'express-session';
import betterSqlite3Session from 'express-session-better-sqlite3';
import databaseModule from "../databaseModule.mjs";

const authenticationRouter = express.Router();
authenticationRouter.use(express.json());

const sessionDatabase = new Database('session.db');
const sqliteStore = betterSqlite3Session(expressSession, sessionDatabase);

authenticationRouter.use(expressSession({
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

authenticationRouter.post("/login", (req, res) => {
    const {
        username,
        password
    } = req.body;

    if (!username) {
        res.status(400).json({ error: "no username supplied" });
        return;
    }

    if (!password) {
        res.status(400).json({ error: "no password supplied" });
        return;
    }

    try {
        const stmt = databaseModule.prepare(
            "SELECT * " +
            "FROM poi_users " +
            "WHERE username=? " +
            "AND password=? "
        );

        const info = stmt.all(username, password);

        if (info.length) {
            req.session.username = req.body.username;
            res.json({username: req.session.username});

        } else {
            res.status(401).json({error: "invalid login!"});
        }

    } catch(error) {
        res.status(500).json({ error: error });
    }
});

authenticationRouter.get('/user', (req, res) => {
    res.json({username: req.session.username || null} );
});

authenticationRouter.post('/logout', (req, res) => {
    req.session = null;
    res.json({loggedout: true});
});

export default authenticationRouter;