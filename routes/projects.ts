import express, { Request, Response, NextFunction } from "express";
import { ErrorPreset, StatusErrorPreset } from "../Classes/StatusError";
import { ProjectInfo } from "../interfaces/ProjectApp";
import { submitProjectInfo, getProjects, deleteProject, updateProject } from "../model";
import RateLimit from "../middleware/RateLimiting";
import ValidateSession from "../middleware/CheckSessionMiddleware";

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
    res.send("welcome to the projects api!");
  }
)

/**
 * Creates a project application
 * @param {ProjectInfo} p a collection of attributes for a ProjectAppInfo object
 */
router.post(
  '/create',
  RateLimit(20, 1000 * 60),
  async (req: Request, res: Response, next: NextFunction) => {

    let p: ProjectInfo = {
      name: req.body.projectName,
      location: req.body.projectLocation,
      hosts: req.body.projectHosts,
      contactEmail: req.body.projectContactEmail,
      relatedFields: req.body.relatedFields,
      relatedFieldOther: req.body.relatedFieldOther,
      imgData: req.body.imgData,
      description: req.body.projectDescription,
      numStudentsDesired: req.body.numStudentsDesired,
      termLength: req.body.termLength,
      compensationHour: req.body.compensationHour,
      startDate: req.body.startDate,
      skillsDesired: req.body.skillsDesired,
      skillDesiredOther: req.body.skillDesiredOther
    }

    if (!(
      p.name && p.location && p.relatedFields && p.description
      && p.numStudentsDesired && p.termLength && p.compensationHour && p.startDate
      && p.skillsDesired && p.hosts && p.contactEmail
    )) {
      next(new StatusErrorPreset(ErrorPreset.MissingRequiredFields));
    }

    await submitProjectInfo(p);
    res.json({ ok: 1 });
  }
)

/**
 * Updates a project by project id
 * @param {string} field_to_update field to update
 * @param {string} updated_field updated field
 */
router.post(
  '/update',
  ValidateSession("body", "professor"),
  RateLimit(20, 1000 * 60),
  async (req: Request, res: Response, next: NextFunction) => {
    let project_id = req.body.project_id;
    let field_to_update = req.body.field_to_update;
    let updated_field = req.body.updated_field;
    if (!project_id) {
      next(new StatusErrorPreset(ErrorPreset.MissingRequiredFields));
      return;
    }
    await updateProject(project_id, field_to_update, updated_field);
    res.json({ ok: 1 });
  }
)

/**
 * Fetches all projects from the db.
 */
router.get(
  '/get',
  ValidateSession("query"),
  RateLimit(20, 1000 * 60),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      let projectList = await getProjects();
      res.json({ ok: 1, data: projectList });
    } catch (err) {
      next(err);
    }
  }
)

/**
 * Deletes a project based on the project_id
 * @param {string} session_id requesting user's session_id
 * @param {string} project_Id id of project to delete
 */
router.delete(
  '/delete',
  ValidateSession("body", "professor"),
  RateLimit(20, 1000 * 60),
  async (req: Request, res: Response, next: NextFunction) => {
    let project_id = req.body.project_id;
    if (!project_id) {
      next(new StatusErrorPreset(ErrorPreset.MissingRequiredFields));
      return;
    }
    const deletedCount = await deleteProject(project_id);

    if (deletedCount === 1) {
      res.json({ ok: 1 });
    } else {
      res.status(404).json({ message: `project with project ID '${project_id}' not found.` });
    }
  }
)

module.exports = router;
export default router;

