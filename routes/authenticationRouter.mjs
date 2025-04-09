import express from 'express';
import Database from "better-sqlite3";
import expressSession from 'express-session';
import betterSqlite3Session from 'express-session-better-sqlite3';
import databaseModule from "../modules/databaseModule.mjs";
import AuthenticationController from "../controllers/authenticationController.mjs";
import bcrypt from "bcrypt";

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

const authenticationController = new AuthenticationController(databaseModule);

authenticationRouter.post("/register", authenticationController.register.bind(authenticationController));

authenticationRouter.post("/login", async (req, res) => {
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
            "WHERE username=? "
        );

        const info = stmt.all(username);

        if (!info.length) {
            res.status(401).json({error: "username not found"});
        }

        const match = await bcrypt.compare(password, info[0].password);

        if (match) {
            req.session.username = req.body.username;
            res.json({username: req.session.username});

        } else {
            res.status(401).json({error: "password incorrect"});
        }

    } catch(error) {
        res.status(500).json({ error: error });
    }
});

authenticationRouter.get('/user', authenticationController.getUser.bind(authenticationController));
authenticationRouter.post('/logout', authenticationController.logout.bind(authenticationController));

export default authenticationRouter;