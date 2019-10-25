const router = require("express").Router();
const auth = require("../middleware/auth");

router.get("/private", auth, (req, res) => {
  let obj = {
    _id: req._id,
    message: "This is aprivate route",
    secret: "YOU MAY PASS"
  };

  res.status(200).send(obj);
});

module.exports = router;
