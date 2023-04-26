import bcrypt from "bcrypt";
import gravatar from "gravatar";
import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import HttpError from "../helpers/httpError.js";
import { sendVerifyMessage } from "../helpers/nodemailder.js";
import { User } from "../models/user.js";

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email is already registered");
  }
  const verificationCode = nanoid(6);
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationCode,
  });
  sendVerifyMessage(email, verificationCode);
  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
  });
};

const userVerify = async (req, res) => {
  const { verificationCode } = req.params;
  const user = await User.findOne({ verificationCode });
  if (!user) throw HttpError(401, "Unknow verification code");
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationCode: "",
  });
  res.json({
    message: "Verify is success",
  });
};

const resendVerify = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw HttpError(401, "Email is not found");
  if (user.verify) throw HttpError(401, "User is already verified");
  const newVerificationCode = nanoid(6);
  await User.findByIdAndUpdate(user._id, { newVerificationCode });
  sendVerifyMessage(email, newVerificationCode);
  res.json({
    message: "Verification email was sended again",
  });
};

const login = async (req, res) => {
  const { email, password, verify } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw HttpError(401, "Incorrect email or password");
  if (!verify) throw HttpError(401, "Incorrect verification code");
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

const logout = async (req, res) => {
  const { id } = req.user;
  await User.findByIdAndUpdate(id, { token: "" });
  res.json({
    message: "Logout successfully",
  });
};

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;
  res.json({
    email,
    subscription,
  });
};

export const registerCtrl = ctrlWrapper(register);
export const loginCtrl = ctrlWrapper(login);
export const userVerifyCtrl = ctrlWrapper(userVerify);
export const resendVerifyCtrl = ctrlWrapper(resendVerify);
export const getCurrentCtrl = ctrlWrapper(getCurrent);
export const logoutCtrl = ctrlWrapper(logout);
