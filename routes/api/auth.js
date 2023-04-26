import express from "express";
import validateBody from "../../middlewares/validateBody.js";
import { emailScheme, registerScheme } from "../../models/user.js";
import {
  getCurrentCtrl,
  loginCtrl,
  logoutCtrl,
  registerCtrl,
  resendVerifyCtrl,
  userVerifyCtrl,
} from "../../controllers/auth.js";
import { authenticate } from "../../middlewares/authenticate.js";

export const authRouter = express.Router();

authRouter.post("/register", validateBody(registerScheme), registerCtrl);
authRouter.post("/login", validateBody(registerScheme), loginCtrl);
authRouter.post("/logout", authenticate, logoutCtrl);
authRouter.get("/current", authenticate, getCurrentCtrl);
authRouter.get("/verify/repeat", validateBody(emailScheme), resendVerifyCtrl);
authRouter.get("/verify/:verificationCode", userVerifyCtrl);
