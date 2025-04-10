import express from 'express';
import Database from "better-sqlite3";
import expressSession from 'express-session';
import betterSqlite3Session from 'express-session-better-sqlite3';
import databaseModule from "../modules/databaseModule.mjs";
import LandmarkController from "../controllers/landmarkController.mjs";

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

const landmarkController = new LandmarkController(databaseModule);

landmarkRouter.get("/regions", landmarkController.getRegions.bind(landmarkController));
landmarkRouter.get("/:region", landmarkController.getLandmarks.bind(landmarkController));
landmarkRouter.post("/create", landmarkController.createLandmark.bind(landmarkController));
landmarkRouter.put("/recommend/:id", landmarkController.recommendLandmark.bind(landmarkController));
landmarkRouter.post("/review/:id", landmarkController.reviewLandmark.bind(landmarkController));

export default landmarkRouter;