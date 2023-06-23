
import * as express from 'express';
import { router as authRouter } from './controllers/auth/routes';
import { router as productRouter } from './controllers/product/routes';

const router = express.Router()

router.use('/auth', authRouter)
router.use('/product', productRouter)
router.use('/test', authRouter)

export default router;