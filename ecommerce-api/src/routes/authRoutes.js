import express from 'express';
import { registre, login } from '../controllers/authController.js';

const router = express.Router();

router.post('/registre', registre);
router.post('/login', login);

export default router;