const dotEnv = require("dotenv");
dotEnv.config();
const express = require("express");
const cors = require("cors");
const db = require("./DB");
const pinsRouter = require("./routes/pins");
const usersRouter = require("./routes/users");
const app = express();
const port = 7800;
app.use(cors());
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use("/api/pins", pinsRouter);
app.use("/api/users", usersRouter);
app.get("/", (req, res) => {
  res.send({ message: "success" });
});

app.listen(port, () => {
  console.log("\x1b[42m%s\x1b[0m", `app is up on port:${port}`);
});
