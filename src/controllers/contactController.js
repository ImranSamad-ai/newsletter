const contact = require("../models/Contact");

exports.createContact = async (req, res) => {
  const { name, company, email, phone, notes } = req.body;

  const newContact = await contact.create({
    user: req.user._id,
    name,
    company,
    email,
    phone,
    notes,
  });

  const populated = await newContact.populate("user");
  res.send(populated);
};
exports.getContact = async (req, res) => {
  const contacts = await contact.find();

  res.send(contacts);
};
exports.getAsingleContact = async (req, res) => {
  const id = req.params.id;
  const contac = await contact.findById({ _id: id });

  res.send(contac);
};

exports.updateContact = async (req, res) => {
  const { name, company, email, phone, notes } = req.body;

  const candidatecontact = await contact.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!candidatecontact) {
    res.send({
      status: "erorr",
      message: "contact not found",
    });
  }
  if (name) candidatecontact.name = name;
  if (company) candidatecontact.company = company;
  if (email) candidatecontact.email = email;
  if (phone) candidatecontact.phone = phone;
  if (notes) candidatecontact.notes = notes;

  const updatedContact = await candidatecontact.save();
  res.send(updatedContact);
};

exports.getAllContactsForAUser = async (req, res) => {
  try {
    const user = await req.user._id;
    const usercontacts = await contact.find({ user });
    // console.log(user);
    console.log(usercontacts);
    res.send("done");
  } catch (error) {
    res.send(error);
  }
};
// src/controllers/contactController.js
exports.deleteContact = async (req, res) => {
  try {
    const id = await req.body._id;
    const deletedUser = await contact.findByIdAndDelete({ id });
    res.send({
      status: "successful",
      message: `${deletedUser.name} has been deleted succesfully`,
    });
  } catch (error) {
    res.send(error);
  }
};
