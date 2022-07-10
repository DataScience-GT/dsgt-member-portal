import express, { Express, Request, Response, NextFunction } from "express";
const router = express.Router();

import { apiAuthenticate } from "../Auth";

router.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.send("welcome to the api!");
});

router.get(
    "/auth",
    apiAuthenticate,
    (req: Request, res: Response, next: NextFunction) => {
        // let auth = req.headers.authorization;

        // res.send(apiAuthenticate(req));
        res.json({ ok: 1 });
    }
);

module.exports = router;
