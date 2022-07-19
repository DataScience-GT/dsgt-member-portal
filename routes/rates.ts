import express, { Request, Response, NextFunction } from "express";
const router = express.Router();

import { getApiRequests } from "../model";

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("welcome to the rates api!");
});

router.get("/get", async (req: Request, res: Response, next: NextFunction) => {
  let rates = await getApiRequests();
  res.json(rates);
});

module.exports = router;
export default router;
