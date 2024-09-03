var express = require("express");
var router = express.Router();

const { authenticateUser, fetchUser } = require("../utils/firebase");

var admin = require("firebase-admin");

var firebaseConfig = require("./../utils/firebase-config.js");

process.env["FIRESTORE_EMULATOR_HOST"] = "127.0.0.1:8080";
process.env["FIREBASE_AUTH_EMULATOR_HOST"] = "127.0.0.1:9099";

admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig),
});

router.post("/", async (req, res) => {
  const token = req.header("Authorization").split("Bearer ")[1];
  try {
    const auth = await authenticateUser(token);
    const user = await fetchUser(auth);
    res.send(user);
  } catch (e) {
    res.send("nothing");
  }
});

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

module.exports = router;
