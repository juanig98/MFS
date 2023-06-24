import * as bodyParser from 'body-parser';
import * as express from 'express';
import { Request, Response } from 'express';
import register from './register';
import login from './login';


const authController = express.Router();

authController.get('/status', (req: Request, res: Response) => { res.send({ message: "Auth controller found" }); })
authController.post('/login', [bodyParser.json(), bodyParser.urlencoded({ extended: true })], login)
authController.post('/register', [bodyParser.json(), bodyParser.urlencoded({ extended: true })], register)

export { authController };