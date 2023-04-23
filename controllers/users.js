import ctrlWrapper from "../helpers/ctrlWrapper.js";
import HttpError from "../helpers/httpError.js";
import { User } from "../models/user.js";

const patchSubscriptionUser = async (req, res, next) => {
  console.log("ok");
  const { userId } = req.params;
  const { subscription } = req.body;
  const avaliableSubscription = ["starter", "pro", "business"];
  if (!avaliableSubscription.includes(subscription))
    throw HttpError(400, "Invalid data received for patching the resource");
  const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
    new: true,
  });
  if (!updatedUser) throw HttpError(404, "Not Found Index");
  res.json(updatedUser);
};

export const patchSubscriptionUserCtrl = ctrlWrapper(patchSubscriptionUser);
