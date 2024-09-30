import { Router } from "express";
import { fetchUser, fetchGeo } from "../utils/firebase.js";
import { initializeApp, cert } from "firebase-admin/app";
import getFirebaseConfig from "../utils/firebase-config.js";
import { AuthRequest } from "@/app.ts";

const router = Router();

if (process.env.EMULATOR_URL) {
  process.env["FIRESTORE_EMULATOR_HOST"] = `${process.env.EMULATOR_URL}:8080`;
  process.env[
    "FIREBASE_AUTH_EMULATOR_HOST"
  ] = `${process.env.EMULATOR_URL}:9099`;
}

/* 

 projectId: "<PROJECT_ID>",
    clientEmail: "foo@<PROJECT_ID>.iam.gserviceaccount.com",
    privateKey:
    */
try {
  const firebaseConfig = getFirebaseConfig;
  if (firebaseConfig)
    initializeApp({
      credential: cert(firebaseConfig),
    });
} catch (error) {
  console.error("Invalid Firebase config", error);
}

router.post("/currentUser", async (req: AuthRequest, res) => {
  const userId = req["userId"];
  const currentUser = await fetchUser(userId);
  if (currentUser) res.send({ currentUser });
  else res.send("Nothing");
});

router.post("/geo", async (req, res) => {
  const geo = await fetchGeo(req.body["ip"]);
  if (geo) res.send({ geo });
  else res.send("Nothing");
});

export default router;
