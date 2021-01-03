import { Router } from "express";
import { HomeController } from "../controller/home.controller";

const router = Router();
router.get("/", HomeController.Index);

export default router;