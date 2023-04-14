import express from "express";
import {
  deleteContactCtrl,
  getAllCtrl,
  getByIdCtrl,
  postContactCtrl,
  putContactCtrl,
} from "../../controllers/contacts.js";
import addScheme from "../../schemes/contacts.js";
import contactValidates from "../../middlewares/contactValidate.js";

const contactsRouter = express.Router();

contactsRouter.get("/", getAllCtrl);

contactsRouter.get("/:contactId", getByIdCtrl);

contactsRouter.post("/", contactValidates(addScheme), postContactCtrl);

contactsRouter.delete("/:contactId", deleteContactCtrl);

contactsRouter.put("/:contactId", contactValidates(addScheme), putContactCtrl);

export default contactsRouter;
