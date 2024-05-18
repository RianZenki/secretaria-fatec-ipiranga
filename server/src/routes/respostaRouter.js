import { Router } from "express";
import multer from "multer";

import auth from "../middleware/auth.js";
import { multerConfig } from "../config/multer.js";
import { novaResposta } from "../controllers/respostaController.js";

const router = Router();
// Criar nova respsota
router.post("/", auth, multer(multerConfig).array("file"), novaResposta);

export default router;
