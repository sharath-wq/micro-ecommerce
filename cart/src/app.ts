import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { NotFoundError, currentUser, errorHandler } from '@scmicroecom/common';
import { indexCartRouter } from './routes';
import { addCartRouter } from './routes/add';
import { removeCartRouter } from './routes/remove';

// Routers

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
    cookieSession({
        signed: false,
        secure: process.env.NODE_ENV !== 'test',
    })
);

app.use(currentUser);

app.use(indexCartRouter);
app.use(addCartRouter);
app.use(removeCartRouter);

app.all('*', async () => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };
