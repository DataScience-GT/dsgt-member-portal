import express, { Request, Response, NextFunction } from "express";
import { ErrorPreset, StatusErrorPreset } from "../Classes/StatusError";
import RateLimit from "../middleware/RateLimiting";
import ValidateSession from "../middleware/CheckSessionMiddleware";

const router = express.Router();

router.get(
    "/",
    async (req: Request, res: Response, next: NextFunction) => {
      res.send("welcome to the project applications api!");
    }
  )

module.exports = router;
export default router;