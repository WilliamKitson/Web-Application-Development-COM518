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

    createLandmark(req, res) {
        if (req.session.username == null) {
            res.status(401).json({ error: "you are not logged in." });
            return;
        }

        const {
            name,
            type,
            country,
            region,
            lon,
            lat,
            description
        } = req.body;

        if (!name) {
            res.status(400).json({ error: "no name supplied" });
            return;
        }

        if (!type) {
            res.status(400).json({ error: "no type supplied" });
            return;
        }

        if (!country) {
            res.status(400).json({ error: "no country supplied" });
            return;
        }

        if (!region) {
            res.status(400).json({ error: "no region supplied" });
            return;
        }

        if (lon == null) {
            res.status(400).json({ error: "no longitude supplied" });
            return;
        }

        if (lat == null) {
            res.status(400).json({ error: "no latitude supplied" });
            return;
        }

        if (!description) {
            res.status(400).json({ error: "no description supplied" });
            return;
        }

        try {
            res.json(this.dao.createLandmark(
                name,
                type,
                country,
                region,
                lon,
                lat,
                description
            ));

        } catch(error) {
            res.status(500).json({ error: error });
        }
    }

    recommendLandmark(req, res) {
        if (req.session.username == null) {
            res.status(401).json({ error: "you are not logged in." });
            return;
        }

        try {
            const recommendation = this.dao.recommendLandmark(req.params.id);

            if(!recommendation) {
                res.status(404).json({error: 'no point of interest with that ID'});
                return;
            }

            res.json(recommendation);

        } catch(error) {
            res.status(500).json({error: error});
        }
    }

    reviewLandmark(req, res) {
        if (req.session.username == null) {
            res.status(401).json({ error: "you are not logged in." });
            return;
        }

        const {
            review
        } = req.body;

        if (!review) {
            res.status(400).json({ error: "no review supplied." });
            return;
        }

        try {
            res.json(this.dao.reviewLandmark(
                req.params.id,
                review
            ));

        } catch(error) {
            res.status(500).json({ error: error });
        }
    }
}