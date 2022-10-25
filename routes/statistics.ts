import express, { Request, Response, NextFunction } from "express";
const router = express.Router();

//rate limiting middleware
import RateLimit from "../middleware/RateLimiting";

//import data function
import {
    getUserDemographics
} from "../model";

//basic endpoint => api/statistics/
router.get(
    "/", 
    RateLimit(5, 1000 * 60),
    (req: Request, res: Response, next: NextFunction) => {
        res.send("welcome to the statistics api!");
    }
);

//user demographics endpoint => api/statistics/users/
router.get(
    "/users", 
    RateLimit(5, 1000 * 60),
    async (req: Request, res: Response, next: NextFunction) => {
        const data = await getUserDemographics();
        res.json({ ok: 1, demographicData: data })
    },

);

module.exports = router;
export default router;