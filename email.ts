import sendgrid from "@sendgrid/mail";
import dotenv from "dotenv";
import { Router } from "express";
import express, { Request, Response, NextFunction } from "express";
import { Email } from "./types";

const router: Router = express.Router();

// router.post("/", async (req: Request, res: Response, next: NextFunction) => {
//   const { email, subject, text } = await req.body;
//   if (!email || !subject || !text) {
//     return res.status(400).send("Missing required mail data");
//   }
//   try {
//     await sendEmail({ email, subject, text });
//     return res.json({ message: "Email sent" });
//   } catch (error) {
//     next(error); // Pass the error to the next middleware
//   }
// });
dotenv.config();

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  const { email, subject, text, html } = await req.body;
  if (!email || !subject || !text) {
    return res.status(400).send("Missing required mail data");
  }
  try {
    await sendEmail({ email, subject, text, html });
    return res.json({ message: "Email sent" });
  } catch (error) {
    next(error); // Pass the error to the next middleware
  }
});

if (!process.env.SENDGRID_API_KEY) {
  throw new Error("SENDGRID_API_KEY is missing");
}

export const sendEmail = async ({ email, subject, text, html }: Email) => {
  sendgrid.setApiKey(process.env.SENDGRID_API_KEY!);
  if (!email || !subject || !text) {
    throw new Error("Missing required mail data");
  }

  try {
    await sendgrid.send({
      to: email,
      from: process.env.EMAIL!,
      subject: subject!,
      text: text!,
      html: html,
    });
  } catch (error) {
    console.error(error);
  }
};

export default router;
