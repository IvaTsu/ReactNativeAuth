const jwt = require("jsonwebtoken");
const User = require("../db/models/User");
const { secret } = require("../config");

module.exports = (req, res, next) => {
  let token = req.header("x-auth");
  try {
    let payload = jwt.verify(token, secret);
    User.findById(payload._id)
      .then(user => {
        if (!user) {
          return res.status(404).send();
        }
        req._id = payload._id;
        next();
      })
      .catch(error => {
        if (error) {
          return res.status(401).send(error);
        }
        return res.status(401).send();
      });
  } catch (error) {
    return res.status(401).send(error);
  }
};
