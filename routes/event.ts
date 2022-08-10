import express, { Request, Response, NextFunction } from "express";
const router = express.Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("welcome to the event api!");
});

router.post("/create", (req: Request, res: Response, next: NextFunction) => {
  res.send("welcome to the event api!");
});

export default router;
module.exports = router;
