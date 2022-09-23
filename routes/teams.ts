import express, { Request, Response, NextFunction } from "express";
const router = express.Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("welcome to the teams api!");
});

router.get("/list", (req: Request, res: Response, next: NextFunction) => {
  res.send("welcome to the teams api!");
});

module.exports = router;
export default router;
