import express, { Request, Response, NextFunction } from "express";
import { ErrorPreset, StatusErrorPreset } from "../Classes/StatusError";
import RateLimit from "../middleware/RateLimiting";
import ValidateSession from "../middleware/CheckSessionMiddleware";
import { createApplication } from "../model";
import { UserProjectApp } from "../interfaces/ProjectApp";

const router = express.Router();


//api/projects/create
//Key - Content-Key
//Value - application/json

/**
 * Welcome to the API :)
 */
router.get(
    "/",
    async (req: Request, res: Response, next: NextFunction) => {
      res.send("welcome to the project applications api!");
    }
)

router.post(
    '/create',
    RateLimit(20, 1000 * 60),
    async (req: Request, res: Response, next: NextFunction) => {

        let u: UserProjectApp = {
          project_id: req.body.project_id,
          user_id: req.body.user_id,
          short_answer_1: req.body.short_answer_1,
          short_answer_2: req.body.short_answer_2,
          long_answer: req.body.long_answer,
          phone_number: req.body.phone_number,
          email: req.body.email
        }

        console.log(u);
        
        if (!(
          u.project_id && u.user_id && u.phone_number && u.email
        )) {
          next(new StatusErrorPreset(ErrorPreset.MissingRequiredFields));
        }

        await createApplication(u);
        res.json({ ok: 1 });
      }
)

module.exports = router;
export default router;