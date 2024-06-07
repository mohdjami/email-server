import express from "express";
import dotenv from "dotenv";
import * as bodyParser from "body-parser";
import email from "./email";
dotenv.config();

const app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send(process.env.JAMI);
});

app.use("/send-mail", email);

export default app;
