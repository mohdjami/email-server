import express from "express";
import dotenv from "dotenv";
import { sendEmail } from "./email";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import email from "./email";
dotenv.config();

const app = express();
const port = 8000;
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send(process.env.JAMI);
});

app.post("/send-mail", email);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});
