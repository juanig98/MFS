import * as express from 'express';
import { Request, Response } from 'express';
import * as cors from 'cors';
import * as fs from 'fs';
import { server } from './app/config/server';
import router from './app/router';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/assets', express.static('public'))


app.get('/', (req: Request, res: Response) => {
    res.set('Content-Type', 'text/html');


    res.send(Buffer.from(fs.readFileSync(__dirname + '/../public/index.html')));
});

app.use('/api/v1/', router);

app.listen(server.port, () => {
    console.log(`Server found in port ${server.port}`);
});