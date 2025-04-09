import AuthenticationDao from "../dao/authenticationDao.mjs";
import databaseModule from "../modules/databaseModule.mjs";
import bcrypt from "bcrypt";

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

    async login(req, res) {
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
                return;
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
    }

    getUser(req, res) {
        res.json({username: req.session.username || null} );
    }

    logout(req, res) {
        req.session = null;
        res.json({loggedout: true});
    }
}