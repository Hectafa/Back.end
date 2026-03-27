import express from 'express';
import cartRoutes from './cartRoutes.js';

const router = express.Router();

router.use(cartRoutes);

export default router;