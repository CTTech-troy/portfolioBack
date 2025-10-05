// src/routes/contact.js
import express from "express";
import ContactController from "../controllers/contactController.js";

const router = express.Router();
const contactController = new ContactController();

router.post("/", (req, res) => contactController.handleContact(req, res));

export default router;
