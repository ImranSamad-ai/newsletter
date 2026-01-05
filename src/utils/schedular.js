import cron from "node-cron";

cron.schedule("* * * * *", async () => {
  const now = new Date();

  const reminders = await Reminder.find({
    executeAt: { $lte: now },
    "channels.call": true,
    callStatus: "pending",
  });

  for (const reminder of reminders) {
    await initiateCall(reminder);
  }
});
