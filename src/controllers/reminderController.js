const reminderModel = require("../models/Reminder");

exports.createReminder = async (req, res) => {
  try {
    const {
      priority,
      completed,
      remindAt,
      message,
      title,
      channel,
      selectedContact: contact,
    } = await req.body;

    const newReminder = reminderModel.create({
      priority,
      completed,
      remindAt,
      message,
      title,
      channel,
      contact,
    });

    res.status(200).json({ data: newReminder, message: "successful" });
  } catch (error) {
    res.status(401).json({ data: error, message: "failed" });
  }
};
