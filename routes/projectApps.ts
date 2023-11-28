import express, { Request, Response, NextFunction } from "express";
import { ErrorPreset, StatusErrorPreset } from "../Classes/StatusError";
import RateLimit from "../middleware/RateLimiting";
import ValidateSession from "../middleware/CheckSessionMiddleware";
import { createApplication, checkIfUserAppliedToProject } from "../model";
import { ProjectApp } from "../interfaces/ProjectApp";

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

      let u: ProjectApp = {
        projectId: req.body.projectId,
        uuid: res.locals.session.user_id,
        preferredPhone: req.body.preferredPhone,
        preferredEmail: req.body.preferredEmail,
        linkedin: req.body.linkedin,
        resume: req.body.resume,
        technicalSkills: req.body.technicalSkills,
        motivations: req.body.motivations,
        teamFit: req.body.teamFit,
        availability: req.body.availability
      }

      if (!(
        u.projectId && u.uuid && u.preferredEmail && u.preferredPhone && u.linkedin
        && u.resume && u.technicalSkills && u.motivations && u.teamFit && u.availability
      )) {
        next(new StatusErrorPreset(ErrorPreset.MissingRequiredFields));
      }

      let result = await checkIfUserAppliedToProject(u.projectId, u.uuid);
      if (result[0].duplicateCount != 0) {
        res.status(409).json({ error: `User has already applied to the project` });
      }
        
      await createApplication(u);
      res.json({ ok: 1 });
    }
)

module.exports = router;
export default router;