const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const db = require("./connection.js");
const TodoRouter = require("./Routes/todorouter.js");
const UserRouter = require("./Routes/userRouter.js");
const cookieParser = require("cookie-parser");

const port = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api", TodoRouter);

app.use("/user", UserRouter);

app.get("/", (req, res) => {
  res.send("Authentication Page");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
