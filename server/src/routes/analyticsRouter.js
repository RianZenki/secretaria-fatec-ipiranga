import { Router } from "express";

import auth from "../middleware/auth.js";
import {
	receberDados,
} from "../controllers/analyticsController.js";

const router = Router();
// Consultar dados do aluno
router.get("/", auth, receberDados);

export default router;
