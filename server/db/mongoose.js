const mongoose = require("mongoose");
const { dbUsername, dbPassword } = require("../config");
mongoose.Promise = global.Promise;

mongoose
  .connect(
    `mongodb://${dbUsername}:${dbPassword}@ds357955.mlab.com:57955/react-native-auth`
  )
  .then(() => console.log("DB connected"))
  .catch(error => console.log(error));

module.exports = mongoose;
