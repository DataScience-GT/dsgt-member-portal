import express, { Request, Response, NextFunction } from "express";
import { ErrorPreset, StatusErrorPreset } from "../Classes/StatusError";
import { ProjectAppInfo } from "../interfaces/ProjectApp";
import { submitProjectAppInfo, getProjects, getProject, deleteProject} from "../model";
import RateLimit from "../middleware/RateLimiting";

const router = express.Router();

router.post(
    "/create",
    RateLimit(100, 1000 * 60 * 60),
    async (req: Request, res: Response, next: NextFunction) => {

        let p: ProjectAppInfo = {
            projectName: req.body.projectName,
            projectLocation: req.body.projectLocation,
            projectHosts: req.body.projectHosts,
            projectContactEmail: req.body.projectContactEmail,
            relatedFields: req.body.relatedFields,
            relatedFieldOther: req.body.relatedFieldOther,
            projectDescription: req.body.projectDescription,
            numStudentsDesired: req.body.numStudentsDesired,
            termLength: req.body.termLength,
            compensationHour: req.body.compensationHour,
            startDate: req.body.startDate,
            skillsDesired: req.body.skillsDesired,
            skillDesiredOther: req.body.skillDesiredOther
        }

        if (!(
            p.projectName && p.projectLocation && p.relatedFields && p.projectDescription
            && p.numStudentsDesired && p.termLength && p.compensationHour && p.startDate
            && p.skillsDesired && p.projectHosts && p.projectContactEmail
        )) {
            next(new StatusErrorPreset(ErrorPreset.MissingRequiredFields));
        }

        await submitProjectAppInfo(p);
        res.json({ ok: 1 });
    }
)

/**
 * Get all projects in postgres database
 */
router.get(
    "/get",
    RateLimit(100, 1000 * 60 * 60),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const projectList = await getProjects();
            res.json({ok: 1, data: projectList});
        } catch (err) {
            next(err);
        }
    }
)

/**
 * Get a singular project by name in postgres database
 * 
 * Throw a 404 if project not found
 */
router.get(
    '/get/:projectName',
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const projectName = req.params.projectName;
        const project = await getProject(projectName);
  
        if (project) {
          res.json({ project });
        } else {
          res.status(404).json({ message: `Project '${projectName}' not found.` });
        }
      } catch (err) {
        next(err);
      }
    }
  );
  
/**
 * Delete a singular project by name in postgres database
 * 
 * Throw a 404 if project not found
 */
router.delete(
    '/delete/:projectName', 
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const projectName = req.params.projectName;
        const deletedCount = await deleteProject(projectName);
  
        if (deletedCount === 1) {
          res.status(200).json({ message: `Project '${projectName}' has been deleted.` });
        } else {
          res.status(404).json({ message: `Project '${projectName}' not found.` });
        }
      } catch (err) {
        next(err);
      }
    }
  );

module.exports = router;
export default router;

