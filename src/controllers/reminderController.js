const reminderModel = require("../models/Reminder");
const userModel = require("../models/user");

exports.createReminder = async (req, res) => {
  try {
    const {
      priority,
      completed,
      remindAt,
      message,
      title,
      channel,
      contact,
      userId,
    } = await req.body;

    const user = await userModel.findById(userId);

    const newReminder = await reminderModel.create({
      priority,
      completed,
      remindAt,
      message,
      title,
      channel,
      contact,
      user,
    });

    res.status(200).json({ data: newReminder, message: "successful" });
  } catch (error) {
    res.status(401).json({ data: error, message: "failed" });
  }
};
