import express, { Request, Response, NextFunction } from "express";
import { ErrorPreset, StatusErrorPreset } from "../Classes/StatusError";
import RateLimit from "../middleware/RateLimiting";
import ValidateSession from "../middleware/CheckSessionMiddleware";
import { ProjectApp } from "../interfaces/ProjectApp";
import { checkIfUserAppliedToProject, createProjectApplication, 
  deleteProjectApp,
  getProjectApplications,
  getProjectsFromApps } from "../model";

const router = express.Router();

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
    ValidateSession("body"),
    RateLimit(20, 1000 * 60),
    async (req: Request, res: Response, next: NextFunction) => {

      let u: ProjectApp = {
        projectId: req.body.projectId,
        user_id: res.locals.session.user_id,
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
        u.projectId && u.user_id && u.preferredEmail && u.preferredPhone && u.linkedin
        && u.resume && u.technicalSkills && u.motivations && u.teamFit && u.availability
      )) {
        next(new StatusErrorPreset(ErrorPreset.MissingRequiredFields));
      }

      let hasApplied = await checkIfUserAppliedToProject(u.projectId, u.user_id);
      if (hasApplied) {
        next(new StatusErrorPreset(ErrorPreset.NoPermission));
      }

      await createProjectApplication(u);
      res.json({ ok: 1 });
    }
)

/**
 * Deletes a project application based on the app_id
 * @param {string} session_id requesting user's session_id
 * @param {string} app_id id of project to delete
 */
router.delete(
  '/delete',
  ValidateSession("body"),
  RateLimit(20, 1000 * 60),
  async (req: Request, res: Response, next: NextFunction) => {
    let app_id = req.body.app_id;
    if (!app_id) {
      next(new StatusErrorPreset(ErrorPreset.MissingRequiredFields));
      return;
    }
    const deletedCount = await deleteProjectApp(app_id);

    if (deletedCount === 1) {
      res.json({ ok: 1 });
    } else {
      res.status(404).json({ message: `project with app ID '${app_id}' not found.` });
    }
  }
)

/**
 * Fetches all project apps from the db.
 */
router.get(
  '/get',
  ValidateSession("query"),
  RateLimit(20, 1000 * 60),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      let projectAppList = await getProjectApplications();
      let projectsFromApps = await getProjectsFromApps(projectAppList);
      res.json({ ok: 1, data: { apps: projectAppList, projects: projectsFromApps } });
    } catch (err) {
      next(err);
    }
  }
)

module.exports = router;
export default router;