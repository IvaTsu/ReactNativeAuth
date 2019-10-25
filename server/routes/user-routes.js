const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../db/models/User");
const { secret } = require("../config");

router.post("/register", (req, res) => {
  const { email, password, username } = req.body;

  let newUser = new User({
    email,
    password,
    username
  });

  newUser
    .save()
    .then(user => {
      if (!user) {
        return res.status(400).send();
      }
      return res.status(201).send(user);
    })
    .catch(error => {
      if (error) {
        return res.status(400).send(error);
      }
      return res.status(400).send();
    });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username })
    .then(user => {
      if (!user) {
        return res.status(404).send();
      }
      bcrypt
        .compare(password, user.password)
        .then(match => {
          if (!match) {
            return res.status(401).send();
          }
          let token = jwt.sign({ _id: user._id }, secret);
          return res
            .status(201)
            .header("x-auth", token)
            .send();
        })
        .catch(error => {
          if (error) {
            return res.status(401).send(error);
          }
          return res.status(401).send();
        });
    })
    .catch(error => {
      if (error) {
        return res.status(401).send();
      }
      return res.status(401).send();
    });
});

module.exports = router;
