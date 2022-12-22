const Pin = require("../models/Pin");
const create = async (req, res) => {
  const pinToPost = new Pin(req.body);

  try {
    const savedPin = await pinToPost.save();
    res.status(200).json(savedPin);
    console.log("\x1b[42m%s\x1b[0m", "[Success] pin added successfully");
  } catch (error) {
    res.status(500).json(error);
    console.log("\x1b[41m%s\x1b[0m", "[Failed] to add pin");
  }
};

const get = async (req, res) => {
  try {
    const pins = await Pin.find();
    console.log("\x1b[42m%s\x1b[0m", "[Success] find all pins");
    res.status(200).json(pins);
  } catch (error) {
    res.status(500).json(error);
    console.log("\x1b[41m%s\x1b[0m", "[Failed] to find all pins");
  }
};
module.exports = {
  create,
  get,
};
