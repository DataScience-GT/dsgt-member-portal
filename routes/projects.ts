import express, { Request, Response, NextFunction } from "express";
import { ErrorPreset, StatusErrorPreset } from "../Classes/StatusError";
import { ProjectAppInfo } from "../interfaces/ProjectApp";
import { submitProjectAppInfo } from "../model";
import RateLimit from "../middleware/RateLimiting";

const router = express.Router();

router.post(
    "/create",
    RateLimit(20, 1000 * 60 * 60),
    async (req: Request, res: Response, next: NextFunction) => {

        let p: ProjectAppInfo = {
            projectName: req.body.projectName,
            projectLocation: req.body.projectLocation,
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
            && p.skillsDesired
        )) {
            next(new StatusErrorPreset(ErrorPreset.MissingRequiredFields));
        }

        await submitProjectAppInfo(p);
        res.json({ ok: 1 });
    }
)

module.exports = router;
export default router;

