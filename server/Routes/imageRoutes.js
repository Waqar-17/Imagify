import express from "express";
import { geneateImage } from "../controllers/imageController.js";
import userAuth from "../middleware/auth.js";
const imageRouter = express.Router();

imageRouter.post("/generate-image", userAuth, geneateImage);

export default imageRouter;
