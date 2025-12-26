const contact = require("../models/Contact");
const multer = require("multer");
const AppError = require("../utils/AppError");

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/img/contacts");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image please upload only images!", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.UploadContactPhoto = upload.single("photo");

exports.createContact = async (req, res) => {
  let notes = [];
  const { fullName, company, email, phone, note, role } = req.body;
  notes.push(note);
  const newContact = await contact.create({
    user: req.user._id,
    fullName,
    company,
    email,
    phone,
    notes: notes,
  });

  const populated = await newContact.populate("user");
  if (req.file) {
    populated.photo = req.file.filename;
  }
  res.send(populated);
};
exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await contact.find();
    res.status(200).json({
      status: 200,
      message: "succesfully created",
      contacts,
    });
  } catch (error) {
    throw new Error("couldnt create contact");
  }
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
    res.status(200).json({
      data: usercontacts,
      message: "These are the user contacts fam",
    });
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
