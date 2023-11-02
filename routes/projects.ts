import express, { Request, Response, NextFunction } from "express";
import { ErrorPreset, StatusErrorPreset } from "../Classes/StatusError";
import { ProjectAppInfo } from "../interfaces/ProjectApp";
import { submitProjectAppInfo, getProjects, deleteProject } from "../model";
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

router.get(
    "/get/all",
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const projectList = await getProjects();
            res.json({projects: projectList});
        } catch (err) {
            next(err);
        }
    }
)

router.get(
    '/get/:projectName',
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const projectName = req.params.projectName;
        const projectList = await getProjects();
  
        const project = projectList.find((project) => project.project_name === projectName);
  
        if (project) {
          res.status(200).json({ project });
        } else {
          res.status(404).json({ message: `Project '${projectName}' not found` });
        }
      } catch (err) {
        next(err);
      }
    }
  );

router.delete(
    '/delete/:projectName', 
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const projectName = req.params.projectName;
  
        const projectList = await getProjects();
        const projectExists = projectList.some((project) => project.project_name === projectName);
  
        if (projectExists) {
          await deleteProject(projectName);
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

