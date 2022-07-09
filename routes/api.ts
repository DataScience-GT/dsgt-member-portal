import express, { Express, Request, Response, NextFunction } from "express";
const router = express.Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.send("welcome to the api!");
    res.status(200);
});

router.get("/auth", (req: Request, res: Response, next: NextFunction) => {
    // let auth = req.headers.authorization;

    res.send(req.query);
    res.status(200);
});

module.exports = router;
