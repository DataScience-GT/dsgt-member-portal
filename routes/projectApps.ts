import express, { Request, Response, NextFunction } from "express";
import { ErrorPreset, StatusErrorPreset } from "../Classes/StatusError";
import RateLimit from "../middleware/RateLimiting";
import ValidateSession from "../middleware/CheckSessionMiddleware";
import { createApplication, checkIfUserAppliedToProject } from "../model";
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
        try {
          let u: UserProjectApp = {
          project_id: req.body.project_id,
          user_id: req.body.user_id,
          saq_response_1: req.body.saq_response_1,
          saq_response_2: req.body.saq_response_2,
          user_goals: req.body.user_goals
        }

        if (!(
          u.project_id && u.user_id
        )) {
          next(new StatusErrorPreset(ErrorPreset.MissingRequiredFields));
        }

        let result = await checkIfUserAppliedToProject(u.project_id, u.user_id)
        if (result[0].duplicateCount != 0) {
          res.status(409).json({ error: `User has already applied to the project` });
        }
        
        await createApplication(u);
        res.json({ ok: 1 });
      } catch(err) {
        next(err);
      }
    }
)

module.exports = router;
export default router;