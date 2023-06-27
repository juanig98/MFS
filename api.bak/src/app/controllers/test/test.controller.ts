import * as bodyParser from 'body-parser';
import * as express from 'express';
import { Request, Response } from 'express';
import authenticate from 'src/app/guard/authenticate';
import test1 from './test1';

const testController = express.Router();

testController.get('/status', (req: Request, res: Response) => { res.send({ message: "Test controller found" }); })

testController.get('/1', authenticate, [bodyParser.json(), bodyParser.urlencoded({ extended: true })], test1)

export { testController };