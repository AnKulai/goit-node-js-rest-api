import { readFile, writeFile } from "fs/promises";
import { nanoid } from "nanoid";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const contactsPath = path.join(__dirname, "contacts.json");

export const listContacts = async () => {
  const data = await readFile(contactsPath);
  return JSON.parse(data);
};

export const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const selectContact = contacts.find(({ id }) => id === contactId);
  console.log(selectContact);
  return selectContact || null;
};

export const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const removeIndex = contacts.findIndex(({ id }) => id === contactId);
  if (removeIndex === -1) return null;
  const [result] = contacts.splice(removeIndex, 1);
  await writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
};

export const addContact = async (body) => {
  const contacts = await listContacts();
  const { name, email, phone } = body;
  const id = nanoid();
  contacts.push({ id, name, email, phone });
  await writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts;
};

export const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(({ id }) => id === contactId);
  if (index === -1) return null;
  contacts[index] = { id: contactId, ...body };
  await writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
};
