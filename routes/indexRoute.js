import { Router } from "express";
import fetchUser from "../utils/firebase.js";
import { initializeApp, cert } from "firebase-admin/app";
import firebaseConfig from "./../utils/firebase-config.js";

const router = Router();

// Use '192.168.50.229' for Docker
// Use localhost for local
// process.env["FIRESTORE_EMULATOR_HOST"] = "192.168.50.229:8080";
// process.env["FIREBASE_AUTH_EMULATOR_HOST"] = "192.168.50.229:9099";

console.log(firebaseConfig);

initializeApp({
  credential: cert(firebaseConfig),
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

export default router;
