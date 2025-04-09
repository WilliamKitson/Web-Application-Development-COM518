import express from 'express';
import Database from "better-sqlite3";
import expressSession from 'express-session';
import betterSqlite3Session from 'express-session-better-sqlite3';
import databaseModule from "../modules/databaseModule.mjs";
import AuthenticationController from "../controllers/authenticationController.mjs";

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
authenticationRouter.post("/login", authenticationController.login.bind(authenticationController));
authenticationRouter.get('/user', authenticationController.getUser.bind(authenticationController));
authenticationRouter.post('/logout', authenticationController.logout.bind(authenticationController));

export default authenticationRouter;