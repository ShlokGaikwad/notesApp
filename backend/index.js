const express = require("express");
const connection = require("./config/db");
const userRouter = require("./routes/user.route");
const cookieParser = require("cookie-parser");
const noteRouter = require("./routes/notes.route");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json(), cookieParser(), cors());
app.use("/users", userRouter);
app.use("/notes", noteRouter);

app.get("/", (req, res) => {
  res.send({ msg: "Home route" });
});

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log(`server is listening on ${process.env.port} & db is connected`);
  } catch (error) {
    console.log(error);
  }
});
