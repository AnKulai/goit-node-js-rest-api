import Joi from "joi";
import { Schema, model } from "mongoose";
import { handleMongooseError } from "../helpers/handleMongooseError.js";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const userSchema = new Schema({
  password: {
    type: String,
    minlength: 6,
    required: [true, "Password is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    match: emailRegex,
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  token: {
    type: String,
    default: "",
  },
  avatarURL: {
    type: String,
    required: true,
  },
  verify: {
    type: Boolean,
    default: false,
  },
  verificationCode: {
    type: String,
    default: "",
  },
});

export const registerScheme = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().pattern(emailRegex).required(),
  subscription: Joi.string().valid("starter", "pro", "business"),
});

export const loginScheme = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().pattern(emailRegex).required(),
});

export const emailScheme = Joi.object({
  email: Joi.string().pattern(emailRegex).required(),
});

export const updateSubscriptionScheme = Joi.object({
  favorite: Joi.string().valid("starter", "pro", "business").required(),
});

userSchema.post("save", handleMongooseError);

export const User = model("user", userSchema);
