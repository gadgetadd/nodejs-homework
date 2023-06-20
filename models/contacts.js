const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, 'contacts.json');


async function listContacts() {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
}

async function getById(contactId) {
  const contacts = await listContacts();
  const requiredContact = contacts.find(contact => contact.id === contactId);
  return requiredContact ?? null;
}

async function addContact(body) {
  const contacts = await listContacts();
  const newContact = { id: nanoid(), ...body };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const idx = contacts.findIndex(contact => contact.id === contactId);
  if (idx === -1) {
    return null
  };
  const [deletedContact] = contacts.splice(idx, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return deletedContact;
}

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex(contact => contact.id === contactId);
  if (idx === -1) {
    return null
  };
  contacts[idx] = { contactId, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contacts[idx];
}

module.exports = {
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContact,
}
