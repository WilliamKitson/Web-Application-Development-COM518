import AuthenticationDao from "../dao/authenticationDao.mjs";

export default class AuthenticationController {
    constructor(database) {
        this.dao = new AuthenticationDao(database, "poi_users");
    }

    login(req, res) {
        const {
            username,
            password
        } = req.body;

        try {
            const account = this.dao.login(
                username,
                password
            );

            if (account) {
                req.session.username = req.body.username;
                res.json({username: req.session.username});

            } else {
                res.status(401).json({error: "invalid login!"});
            }

        } catch(error) {
            res.status(500).json({ error: error });
        }
    }
}