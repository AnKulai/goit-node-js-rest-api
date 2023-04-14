import ctrlWrapper from "../helpers/ctrlWrapper.js";
import HttpError from "../helpers/httpError.js";
import {
  addContact,
  getContactById,
  listContacts,
  removeContact,
  updateContact,
} from "../models/contacts.js";

const getAll = async (req, res, next) => {
  const contactList = await listContacts();
  res.json(contactList);
};

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const selectContact = await getContactById(contactId);
  if (!selectContact) throw HttpError(404, "Not Found");
  res.json(selectContact);
};

const postContact = async (req, res, next) => {
  const result = await addContact(req.body);
  res.status(201).json(result);
};

const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;
  const removedContact = await removeContact(contactId);
  if (!removedContact) throw HttpError(404, "Not Found Index");
  res.json(removedContact);
};

const putContact = async (req, res, next) => {
  const { contactId } = req.params;
  const updatedContact = await updateContact(contactId, req.body);
  if (!updatedContact) throw HttpError(404, "Not Found Index");
  res.json(updatedContact);
};

export const getAllCtrl = ctrlWrapper(getAll);
export const getByIdCtrl = ctrlWrapper(getById);
export const postContactCtrl = ctrlWrapper(postContact);
export const deleteContactCtrl = ctrlWrapper(deleteContact);
export const putContactCtrl = ctrlWrapper(putContact);
