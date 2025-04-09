import AuthenticationDao from "../dao/authenticationDao.mjs";
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

        let hashedPassword = password;

        bcrypt.hash(password, 10, function(err, hash) {
            hashedPassword = hash;
        });

        try {
            res.json(this.dao.register(
                username,
                hashedPassword
            ));

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
            const account = this.dao.login(req.body.username);

            if (!account) {
                res.status(401).json({error: "username not found"});
                return;
            }

            const match = await bcrypt.compare(password, account.password);

            if (match) {
                req.session.username = account.username;
                res.json({username: req.session.username});
                return;
            }

            res.status(401).json({error: "password incorrect"});

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