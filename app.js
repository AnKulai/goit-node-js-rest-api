import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import logger from "morgan";
import { authRouter } from "./routes/api/auth.js";
import contactsRouter from "./routes/api/contacts.js";
import { usersRouter } from "./routes/api/users.js";

dotenv.config();

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(
  cors({
    origin: "*",
    methods: "*",
  })
);
app.use(express.json());
app.use(express.static("public"));

app.use("/api/contacts", contactsRouter);
app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

export default app;
