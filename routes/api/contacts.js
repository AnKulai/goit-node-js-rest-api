import express from "express";
import {
  deleteContactCtrl,
  getAllCtrl,
  getByIdCtrl,
  patchFavoriteContactCtrl,
  postContactCtrl,
  putContactCtrl,
} from "../../controllers/contacts.js";

import { authenticate } from "../../middlewares/authenticate.js";
import { isValidId } from "../../middlewares/isValid.js";
import validateBody from "../../middlewares/validateBody.js";
import { addScheme, updateScheme } from "../../models/contacts.js";

const contactsRouter = express.Router();

contactsRouter.get("/", authenticate, getAllCtrl);

contactsRouter.get("/:contactId", authenticate, isValidId, getByIdCtrl);

contactsRouter.post(
  "/",
  authenticate,
  validateBody(addScheme),
  postContactCtrl
);

contactsRouter.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(addScheme),
  putContactCtrl
);

contactsRouter.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateBody(updateScheme),
  patchFavoriteContactCtrl
);

contactsRouter.delete(
  "/:contactId",
  authenticate,
  isValidId,
  deleteContactCtrl
);

export default contactsRouter;
