import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import mongoose from "mongoose";
import router from "./routers/api.js";

import { DATABASE_URL, MAX_JSON_SIZE, PORT, REQUEST_NUMBER, REQUEST_TIME, URL_ENCODED, WEB_CACHE,} from "./app/configs/configs.js";


const app = new express();

// App use default Middleware
app.use(cors());
app.use(helmet());
app.use(express.json({ limit: MAX_JSON_SIZE }));
app.use(express.urlencoded({ extended: URL_ENCODED }));

// App Use Limiter
const limiter = rateLimit({
  windowMs: REQUEST_TIME,
  max: REQUEST_NUMBER,
});
app.use(limiter);

// Cache
app.set("etag", WEB_CACHE);

// DataBase Connect
mongoose
  .connect(DATABASE_URL, { autoIndex: true })
  .then(() => {
    console.log("Database Connected Successfully.");
  })
  .catch((e) => {
    console.log("Database Connection Failed", e);
  });

app.use("/api", router);
app.listen(PORT, () => {
  console.log("Server running on port: " + PORT);
});
