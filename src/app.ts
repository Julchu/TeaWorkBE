import createError from "http-errors";
import express, {
  json,
  Request,
  Response,
  NextFunction,
  urlencoded,
} from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import { rateLimit } from "express-rate-limit";
import { verifyAccessToken } from "./lib/auth.js";

import indexRouter from "./routes/indexRoute.js";

const __dirname = import.meta.dirname;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  keyGenerator: (req) => {
    if (!req.headers.authorization) return "1";
    return req.ip || "";
  },
});

interface Error {
  message?: string;
  status?: number;
}

import type { AuthRequest } from "./types/index.js";

const authLayer = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.header("Authorization")?.split("Bearer ")[1];
    const auth = await verifyAccessToken(token);
    if (auth?.userId !== undefined) {
      req.userId = auth.userId;
      next();
    } else res.send("Not authorized");
  } catch (error) {
    console.error(error);
    res.send("Entry layer crashed");
  }
};

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(limiter);
app.use("/userInfo", authLayer, indexRouter);

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err: Error, req: Request, res: Response) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

export default app;
