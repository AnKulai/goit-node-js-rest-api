import bcrypt from "bcrypt";
import gravatar from "gravatar";
import jwt from "jsonwebtoken";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import HttpError from "../helpers/httpError.js";
import { User } from "../models/user.js";

export const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email is already registered");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
  });
  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw HttpError(401, "Incorrect email or password");
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) throw HttpError(401, "Invalid password");
  const payload = { id: user.id };
  const { SECRET_KEY } = process.env;
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user.id, { token });
  res.json({
    token,
  });
};

export const logout = async (req, res) => {
  const { id } = req.user;
  await User.findByIdAndUpdate(id, { token: "" });

  res.json({
    message: "Logout successfully",
  });
};

export const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;
  res.json({
    email,
    subscription,
  });
};

export const registerCtrl = ctrlWrapper(register);
export const loginCtrl = ctrlWrapper(login);
export const getCurrentCtrl = ctrlWrapper(getCurrent);
export const logoutCtrl = ctrlWrapper(logout);
