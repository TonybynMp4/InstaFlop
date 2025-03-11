import { Router } from 'express';

const router = Router();
router.use('/user', (await import('./userRouter.js')).default);
router.use('/post', (await import('./postRouter.js')).default);

export default router;