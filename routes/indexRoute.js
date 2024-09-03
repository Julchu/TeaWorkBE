import { Router } from "express";
import { fetchUser, authenticateUser } from "../utils/firebase.js";
import { initializeApp, cert } from "firebase-admin/app";
import firebaseConfig from "./../utils/firebase-config.js";

const router = Router();

// Use '192.168.50.229' for Docker
// Use localhost for local
if (process.env.EMULATOR_ENV) {
  process.env["FIRESTORE_EMULATOR_HOST"] = "localhost:8080";
  process.env["FIREBASE_AUTH_EMULATOR_HOST"] = "localhost:9099";
}

initializeApp({
  credential: cert(firebaseConfig),
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

export default router;
