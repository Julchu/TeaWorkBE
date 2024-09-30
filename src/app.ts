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
import { authenticateUser } from "./utils/firebase.js";

import indexRouter from "./routes/indexRoute.js";

const __dirname = import.meta.dirname;

// TODO: test/optimize rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  keyGenerator: (req) => {
    if (!req.headers.authorization) return "1";
    return req.ip || "";
  },
});

interface Error {
  message?: string;
  status?: number;
}

export interface AuthRequest extends Request {
  userId?: string;
}

// Can pass values to req; ex: req.userId = "userId"; console.log(req['userId])
const authLayer = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("Authorization")?.split("Bearer ")[1];
    const auth = await authenticateUser(token);
    if (auth) {
      req.userId = auth.user_id;
      next();
    } else res.send("Not authorized");
  } catch (error) {
    console.error(error);
    res.send("Entry layer crashed");
  }
};

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Apply the rate limiting middleware to all requests.
app.use(limiter);
// Auth layer
app.use("/userInfo", authLayer, indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err: Error, req: Request, res: Response) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

export default app;
