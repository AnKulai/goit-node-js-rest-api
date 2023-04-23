import { Schema, model } from "mongoose";
import { handleMongooseError } from "../helpers/handleMongooseError.js";
import Joi from "joi";

const regExp = /^(d{3}) d{3}-d{4}$/;

const contactScheme = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
      match: regExp,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

export const addScheme = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

export const updateScheme = Joi.object({
  favorite: Joi.boolean().required(),
});

contactScheme.post("save", handleMongooseError);

export const Contacts = model("contacts", contactScheme);
