import express, { Request, Response, NextFunction } from "express";
import { StatusError } from "../Classes/StatusError";
const router = express.Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("welcome to the billing api");
});

//checks whether billing details exists
router.post("/verify", (req: Request, res: Response, next: NextFunction) => {
  let email = req.body.email;
  if (!email) {
    next(new StatusError("missing 1 or more required fields", 403));
    return;
  }
});

module.exports = router;
export default router;
