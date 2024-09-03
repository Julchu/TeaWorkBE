var express = require("express");
var router = express.Router();

const fetchUser = require("../utils/firebase");

var admin = require("firebase-admin");

var firebaseConfig = require("./../utils/firebase-config.js");

process.env["FIRESTORE_EMULATOR_HOST"] = "192.168.50.229:8080";
process.env["FIREBASE_AUTH_EMULATOR_HOST"] = "192.168.50.229:9099";

admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig),
});

router.post("/", async (req, res) => {
  const token = req.header("Authorization").split("Bearer ")[1];
  console.log("token", token);
  try {
    const user = await fetchUser(token);
    if (user) res.send(user);
    else res.send("nothing");
  } catch (e) {
    res.send("nothing");
  }
});

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

module.exports = router;
