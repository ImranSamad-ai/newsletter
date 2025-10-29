const subscriber = require("../models/subscriberModel");

exports.createSubscriber = async (req, res) => {
  try {
    const name = await req.body.name;
    const email = await req.body.email;

    const newSubscriber = await subscriber.create({
      name,
      email,
    });
    res.send(newSubscriber);
  } catch (error) {
    res.status(404).send(error);
  }
};
exports.getSubscriber = async (req, res) => {
  try {
    const subscribers = await subscriber.find();
    res.send(subscribers);
  } catch (error) {
    res.send(error);
  }
};
exports.deleteSubscriber = async (req, res) => {
  try {
    const subscribers = await subscriber.delete();
    res.send(subscribers);
  } catch (error) {
    res.send(error.message);
  }
};
