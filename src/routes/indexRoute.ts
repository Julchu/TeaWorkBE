import { Router } from "express";
import { fetchGeo } from "../utils/geo.js";
import { getUserById } from "../modules/user/user.service.js";
import type { AuthRequest } from "../types/index.js";

const router = Router();

router.post("/currentUser", async (req: AuthRequest, res) => {
  const currentUser = await getUserById(req.userId);
  if (currentUser) res.send({ currentUser });
  else res.send("Nothing");
});

router.post("/geo", async (req, res) => {
  const geo = await fetchGeo(req.body["ip"]);
  if (geo) res.send({ geo });
  else res.send("Nothing");
});

export default router;
