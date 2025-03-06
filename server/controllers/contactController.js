const res = require("express/lib/response");
const Contact = require("../models/contactModel");
const User = require("../models/userModel");

const getContacts = async (req, res, next) => {
  try {
    const { _id: user_id } = req.user;
    //get user contacts
    const contacts = await Contact.findOne({ user_id });

    if (!contacts) {
      return res.json([]);
    }
    return res.json(contacts.contacts);
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ status: "error", message: "internal server error" });
  }
};

const createContact = async (req, res, next) => {
  try {
    const { _id } = req.user;
    //    check if user already exist in contacts
    const checkUser = await Contact.findOne({ user_id: _id });
    console.log(checkUser);

    if (!checkUser) {
      const newContact = await Contact.create({
        user_id: _id,
        contacts: [{ name: req.body.name, phoneNumber: req.body.phoneNumber }],
      });
      return res.status(201).json(newContact);
    }

    // update contacts
    const { _id: contact_id } = checkUser;

    const { contacts } = await Contact.findByIdAndUpdate(
      contact_id,
      {
        $push: {
          contacts: { ...req.body },
        },
      },
      { new: true }
    );

    return res.json(contacts);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ status: "error", message: error.message });
  }
};

const clearContacts = async (req, res, next) => {
  await Contact.deleteMany();
  console.log("contact cleared");
  return res.json({ message: "contact cleared" });
};

// get contacts
const getContact = async (req, res, next) => {
  try {
    const { _id: user_id } = req.user;
    const { contact_id } = req.params;
    const userContacts = await Contact.findOne({ user_id });
    if (userContacts.contacts && userContacts.contacts.length > 0) {
      const { contacts } = userContacts;
      const foundContact = contacts.find(
        (c) => c._id.toString() === contact_id
      );

      if (!foundContact) {
        return res.json({ status: "error", messaeg: "contact not found" });
      }

      return res.json(foundContact);
    }
  } catch (error) {
    console.log(error.message);
    return res.json({ status: "error", message: error.message });
  }
};

const updateContact = async (req, res, next) => {
  try {
    const { contact_id } = req.params;
    const { _id: user_id } = req.user;

    // fetch data from database
    const userContacts = await Contact.findOne({ user_id });

    if (!userContacts) {
      return res.json({ status: "error", message: "no contacts found" });
    }
    const { contacts } = userContacts;
    const foundContact = contacts.find((c) => c._id.toString() === contact_id);

    if (!foundContact) {
      return res.json({ status: "error", message: "contact not found" });
    }

    Object.assign(foundContact, req.body);
    const updatedContact = await Contact.findOneAndUpdate(
      { user_id, "contacts._id": contact_id },
      { $set: { "contacts.$": foundContact } },
      { new: true }
    );

    // get contact and return to client
    const { contacts: newUpdates } = updatedContact;
    const newUpdate = newUpdates.find((u) => u._id.toString() === contact_id);
    return res.json(newUpdate);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ status: "error", message: error.message });
  }
};

const deleteContact = async (req, res, next) => {
  const { contact_id } = req.params;
  const { _id: user_id } = req.user;
  const deletedContact = await Contact.findOneAndUpdate(
    { user_id, "contacts._id": contact_id },
    { $pull: { contacts: { _id: contact_id } } },
    { new: true }
  );

  return res.json({ id: contact_id });
};

module.exports = {
  getContacts,
  createContact,
  clearContacts,
  getContact,
  updateContact,
  deleteContact,
};
