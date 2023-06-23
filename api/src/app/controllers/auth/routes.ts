import * as bodyParser from 'body-parser';
import * as express from 'express';
import { Request, Response } from 'express';
import register from './register';
import login from './login';


const router = express.Router();

router.get('/status', (req: Request, res: Response) => { res.send({ message: "Auth controller found" }); })
router.post('/login', [bodyParser.json(), bodyParser.urlencoded({ extended: true })], login)
router.post('/register', [bodyParser.json(), bodyParser.urlencoded({ extended: true })], register)

export { router };