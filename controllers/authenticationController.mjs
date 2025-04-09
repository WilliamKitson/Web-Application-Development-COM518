import AuthenticationDao from "../dao/authenticationDao.mjs";

export default class AuthenticationController {
    constructor(database) {
        this.dao = new AuthenticationDao(database, "poi_users");
    }

    register(req, res) {
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
            const account = this.dao.register(
                username,
                password
            );

            res.json(account);

        } catch(error) {
            res.status(500).json({ error: error });
        }
    }

    getUser(req, res) {
        res.json({username: req.session.username || null} );
    }

    logout(req, res) {
        req.session = null;
        res.json({loggedout: true});
    }
}