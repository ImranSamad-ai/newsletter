import twilio from "twilio";

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

export async function initiateCall(phone, reminderId) {
  await client.calls.create({
    to: phone,
    from: process.env.TWILIO_PHONE,
    url: `${process.env.BASE_URL}/twilio/voice?rid=${reminderId}`,
  });
}
