
import * as express from 'express';
import { productController } from './controllers/product/product.controller';
import { testController } from './controllers/test/test.controller';
import { authController } from './controllers/auth/auth.controller';

const router = express.Router()

router.use('/auth', authController)
router.use('/product', productController)
router.use('/test', testController)

export default router;