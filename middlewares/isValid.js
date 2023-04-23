import { isValidObjectId } from "mongoose";
import HttpError from "../helpers/httpError.js";

export const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  console.log(contactId);
  if (!isValidObjectId(contactId)) {
    next(HttpError(400, `${contactId} is not a valid`));
  }
  next();
};
