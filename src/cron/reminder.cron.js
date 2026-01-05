import cron from "node-cron";
import { initiateCall } from "../utils/call.service";

cron.schedule("* * * * *", async () => {
  console.log("Checking reminders...");

  // TEMP: simulate reminder
  await initiateCall("+2348012345678", "reminder123");
});
