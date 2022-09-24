import express, { Request, Response, NextFunction } from "express";
import {
  ErrorPreset,
  StatusError,
  StatusErrorPreset,
} from "../Classes/StatusError";
import { checkTeamIdExists, createTeam, getTeam, getTeams } from "../model";
const router = express.Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("welcome to the teams api!");
});

router.get("/list", async (req: Request, res: Response, next: NextFunction) => {
  let count = parseInt(req.query.count as string);

  //get a list of teams (provide count if given)
  let teams = await getTeams(count);
  res.json({ ok: 1, data: teams });
});

router.post(
  "/create",
  async (req: Request, res: Response, next: NextFunction) => {
    //input data
    const name = req.body.name;
    const description = req.body.description || req.body.desc;

    //null check on name (desc not required)
    if (!name) {
      next(new StatusErrorPreset(ErrorPreset.MissingRequiredFields));
      return;
    }

    await createTeam(name, description);

    res.json({ ok: 1 });
  }
);

router.get(
  "/:team_id",
  async (req: Request, res: Response, next: NextFunction) => {
    //input data
    const team_id = parseInt(req.params.team_id as string);

    //check team exists
    if (!(await checkTeamIdExists(team_id))) {
      next(new StatusError("Team not found", 404));
      return;
    }

    //get data for team
    const team_data = await getTeam(team_id);

    res.json({ ok: 1, data: team_data });
  }
);

module.exports = router;
export default router;
