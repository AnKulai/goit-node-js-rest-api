import express from "express";
import { authenticate } from "../../middlewares/authenticate.js";
import {
  patchAvatarUserCtrl,
  patchSubscriptionUserCtrl,
  removeTestUserByEmailCtrl,
} from "../../controllers/users.js";
import { upload } from "../../middlewares/upload.js";

export const usersRouter = express.Router();

usersRouter.patch("/subscription", authenticate, patchSubscriptionUserCtrl);

usersRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  patchAvatarUserCtrl
);

usersRouter.delete("/testclear", removeTestUserByEmailCtrl);
