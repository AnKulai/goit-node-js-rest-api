import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import HttpError from "../helpers/httpError.js";
import { User } from "../models/user.js";

import Jimp from "jimp";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const avatarsDir = path.join(__dirname, "../", "public", "avatars");

const patchSubscriptionUser = async (req, res, next) => {
  const { _id } = req.user;
  const { subscription } = req.body;
  const avaliableSubscription = ["starter", "pro", "business"];
  if (!avaliableSubscription.includes(subscription))
    throw HttpError(400, "Invalid data received for patching the resource");
  const updatedUser = await User.findByIdAndUpdate(_id, req.body, {
    new: true,
  });
  if (!updatedUser) throw HttpError(404, "Not Found Index");
  res.json(updatedUser);
};

const patchAvatarUser = async (req, res, next) => {
  const { _id } = req.user;
  const { path: tempPath, originalname } = req.file;
  const currentPath = path.join(avatarsDir, originalname);
  const image = await Jimp.read(tempPath);
  image.resize(250, 250);
  await image.writeAsync(currentPath);
  await fs.unlink(tempPath);
  const avatarURL = path.join("avatars", originalname);
  await User.findByIdAndUpdate(_id, { avatarURL });
  res.json({ avatarURL });
};

const removeTestUserByEmail = async (req, res, next) => {
  const { email } = req.body;
  if (!email) throw HttpError(404);
  if (!email.includes("test")) throw HttpError(403);
  const user = await User.findOne({ email });
  if (!user) throw HttpError(404);
  await User.deleteOne({ email });
  res.set("X-Status-Message", "test user removed successfully"); 
  res.status(204).send();
};

export const patchSubscriptionUserCtrl = ctrlWrapper(patchSubscriptionUser);
export const patchAvatarUserCtrl = ctrlWrapper(patchAvatarUser);
export const removeTestUserByEmailCtrl = ctrlWrapper(removeTestUserByEmail);
