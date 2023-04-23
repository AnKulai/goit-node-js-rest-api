import ctrlWrapper from "../helpers/ctrlWrapper.js";
import HttpError from "../helpers/httpError.js";
import { Contacts } from "../models/contacts.js";

const getAll = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 5, favorite } = req.query;
  const skip = (page - 1) * limit;
  const filter = {
    owner,
    ...(favorite ? { favorite } : {}),
  };
  const contactList = await Contacts.find(filter, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "subscription");
  res.json(contactList);
};

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const selectContact = await Contacts.findById(contactId);
  if (!selectContact) throw HttpError(404, "Not Found");
  res.json(selectContact);
};

const postContact = async (req, res, next) => {
  const { _id: owner } = req.user;
  const result = await Contacts.create({ ...req.body, owner });
  res.status(201).json(result);
};

const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;
  const removedContact = await Contacts.findByIdAndRemove(contactId);
  if (!removedContact) throw HttpError(404, "Not Found Index");
  res.json(removedContact);
};

const putContact = async (req, res, next) => {
  const { contactId } = req.params;
  const updatedContact = await Contacts.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!updatedContact) throw HttpError(404, "Not Found Index");
  res.json(updatedContact);
};

const patchFavoriteContact = async (req, res, next) => {
  const { contactId } = req.params;
  const updatedContact = await Contacts.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!updatedContact) throw HttpError(404, "Not Found Index");
  res.json(updatedContact);
};



export const getAllCtrl = ctrlWrapper(getAll);
export const getByIdCtrl = ctrlWrapper(getById);
export const postContactCtrl = ctrlWrapper(postContact);
export const deleteContactCtrl = ctrlWrapper(deleteContact);
export const putContactCtrl = ctrlWrapper(putContact);
export const patchFavoriteContactCtrl = ctrlWrapper(patchFavoriteContact);

