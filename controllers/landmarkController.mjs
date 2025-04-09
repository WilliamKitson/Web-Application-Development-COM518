import LandmarkDao from "../dao/landmarkDao.mjs";
import databaseModule from "../modules/databaseModule.mjs";
import xss from "xss";

export default class LandmarkController {
    constructor(database) {
        this.dao = new LandmarkDao(database, "poi_users");
    }

    getRegions(req, res) {
        if (req.session.username == null) {
            res.status(401).json({ error: "you are not logged in." });
            return;
        }

        try {
            res.json(this.dao.getRegions());

        } catch(error) {
            res.status(500).json({ error: error });
        }
    }

    getLandmarks(req, res) {
        if (req.session.username == null) {
            res.status(401).json({ error: "you are not logged in." });
            return;
        }

        try {
            const landmarks = this.dao.getLandmarks(req.params.region);

            if (landmarks) {
                res.json(landmarks);
                return;
            }

            res.status(404).json({ error: "no points of interest associated with this region." });

        } catch(error) {
            res.status(500).json({ error: error });
        }
    }
}