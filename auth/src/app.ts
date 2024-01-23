import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { NotFoundError, errorHandler } from '@scmicroecom/common';

import { currentUserRouter } from './routes/current-user';
import { signupRouter } from './routes/signup';
import { singinRouter } from './routes/signin';
import { signoutRouter } from './routes/singout';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
    cookieSession({
        signed: false,
        secure: process.env.NODE_ENV !== 'test',
    })
);

app.get('/api/test', (req, res) => {
    res.send('working');
});

app.use(currentUserRouter);
app.use(signupRouter);
app.use(singinRouter);
app.use(signoutRouter);

app.all('*', async () => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };
