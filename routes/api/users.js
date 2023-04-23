import express from "express";
import { authenticate } from "../../middlewares/authenticate.js";
import { patchSubscriptionUserCtrl } from "../../controllers/users.js";

export const usersRouter = express.Router();

usersRouter.patch(
  "/:userId/subscription",
  authenticate,
  patchSubscriptionUserCtrl
);
