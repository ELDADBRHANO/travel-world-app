const mongoose = require("mongoose");

const connectionToDb = process.env.CONNECTION_STRING;
mongoose
  .connect(connectionToDb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("\x1b[42m%s\x1b[0m", "Connection to MongoDB success.");
  })
  .catch((err) => {
    console.error("\x1b[41m%s\x1b[0m", "connection failed:", err.message);
  });

module.exports = mongoose.connection;
