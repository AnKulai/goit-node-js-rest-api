import express from "express";
import {
  deleteContactCtrl,
  getAllCtrl,
  getByIdCtrl,
  patchFavoriteContactCtrl,
  postContactCtrl,
  putContactCtrl,
} from "../../controllers/contacts.js";

import contactValidates from "../../middlewares/contactValidate.js";
import { addScheme, updateScheme } from "../../models/contacts.js";
import { isValidId } from "../../middlewares/isValid.js";

const contactsRouter = express.Router();

contactsRouter.get("/", getAllCtrl);

contactsRouter.get("/:contactId", isValidId, getByIdCtrl);

contactsRouter.post("/", contactValidates(addScheme), postContactCtrl);

contactsRouter.put(
  "/:contactId",
  isValidId,
  contactValidates(addScheme),
  putContactCtrl
);

contactsRouter.patch(
  "/:contactId/favorite",
  isValidId,
  contactValidates(updateScheme),
  patchFavoriteContactCtrl
);

contactsRouter.delete("/:contactId", isValidId, deleteContactCtrl);

export default contactsRouter;
