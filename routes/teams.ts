import express, { Request, Response, NextFunction } from "express";
import {
  ErrorPreset,
  StatusError,
  StatusErrorPreset,
} from "../Classes/StatusError";
import ValidateSession from "../middleware/CheckSessionMiddleware";
import {
  checkTeamIdExists,
  createTeam,
  getTeam,
  getTeams,
  getUserFromId,
  updateTeam,
} from "../model";
const router = express.Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("welcome to the teams api!");
});

router.get(
  "/list",
  ValidateSession("query", "administrator"),
  async (req: Request, res: Response, next: NextFunction) => {
    let count = parseInt(req.query.count as string);

    //get a list of teams (provide count if given)
    let teams = await getTeams(count);
    res.json({ ok: 1, data: teams });
  }
);

router.post(
  "/create",
  ValidateSession("body", "administrator"),
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
  ValidateSession("body", "administrator"),
  async (req: Request, res: Response, next: NextFunction) => {
    //input data
    const team_id = parseInt(req.params.team_id as string);

    //check team exists
    if (!(await checkTeamIdExists(team_id))) {
      next(new StatusError("Team not found", 404));
      return;
    }

    //get data for team
    let team_data = (await getTeam(team_id))[0];
    team_data.member_list = [];

    let to_add = team_data.members.split(",");
    for (let m of to_add) {
      let member_data = await getUserFromId(parseInt(m));
      if (!team_data.member_list) {
        team_data.member_list = [member_data[0]];
      } else {
        team_data.member_list.push(member_data[0]);
      }
    }

    res.json({ ok: 1, data: team_data });
  }
);

router.post(
  "/:team_id/add",
  ValidateSession("body", "administrator"),
  async (req: Request, res: Response, next: NextFunction) => {
    //input data
    const team_id = parseInt(req.params.team_id as string);
    const members = req.body.members as string;

    //null check on members
    if (!members) {
      next(new StatusErrorPreset(ErrorPreset.MissingRequiredFields));
      return;
    }

    //check team exists
    if (!(await checkTeamIdExists(team_id))) {
      next(new StatusError("Team not found", 404));
      return;
    }

    //get data for team
    const team_data = (await getTeam(team_id))[0];

    let newMembers = new Set<number>(); // use a set to ignore duplicates

    //keep existing members
    if (team_data.members) {
      team_data.members.split(",").forEach((m) => {
        newMembers.add(parseInt(m));
      });
    }

    //add new members
    members.split(",").forEach((m) => {
      newMembers.add(parseInt(m));
    });

    //update the team
    await updateTeam(
      team_id,
      undefined,
      undefined,
      Array.from(newMembers).join(",")
    );

    //send response
    res.json({ ok: 1 });
  }
);

router.post(
  "/:team_id/remove",
  ValidateSession("body", "administrator"),
  async (req: Request, res: Response, next: NextFunction) => {
    //input data
    const team_id = parseInt(req.params.team_id as string);
    const members = req.body.members as string;

    //null check on members
    if (!members) {
      next(new StatusErrorPreset(ErrorPreset.MissingRequiredFields));
      return;
    }

    //check team exists
    if (!(await checkTeamIdExists(team_id))) {
      next(new StatusError("Team not found", 404));
      return;
    }

    //get data for team
    const team_data = (await getTeam(team_id))[0];

    let newMembers = new Set<number>(); // use a set to ignore duplicates

    //create set from existing members
    if (team_data.members) {
      team_data.members.split(",").forEach((m) => {
        newMembers.add(parseInt(m));
      });
    }

    //remove members
    members.split(",").forEach((m) => {
      newMembers.delete(parseInt(m));
    });

    //update the team
    await updateTeam(
      team_id,
      undefined,
      undefined,
      Array.from(newMembers).join(",")
    );

    res.json({ ok: 1 });
  }
);

module.exports = router;
export default router;
