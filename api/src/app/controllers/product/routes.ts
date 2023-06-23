import * as bodyParser from 'body-parser';
import * as express from 'express';
import { Request, Response } from 'express';
import create from './create';
import authenticate from '../../guard/authenticate';
import list from './list';

const router = express.Router();

router.get('/status', (req: Request, res: Response) => { res.send({ message: "Product controller found" }); })

router.get('/', authenticate, list)
router.post('/create', authenticate, [bodyParser.json(), bodyParser.urlencoded({ extended: true })], create)

export { router };