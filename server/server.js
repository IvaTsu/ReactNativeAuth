const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require("./db/mongoose");
const userRoutes = require("./routes/user-routes");
const privateRoute = require("./routes/private-route");

const app = express();

app.use(bodyParser.json());

app.use("/user", userRoutes);
app.use("/private", privateRoute);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
