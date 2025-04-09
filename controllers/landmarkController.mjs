import LandmarkDao from "../dao/landmarkDao.mjs";

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
}