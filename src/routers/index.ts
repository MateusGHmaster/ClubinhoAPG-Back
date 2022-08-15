import { Router } from 'express';
import authRouter from './authRouter.js';
import kidRouter from './kidRouter.js';

const router = Router();

router.use(authRouter);
router.use(kidRouter);

export default router;