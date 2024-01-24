import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { NotFoundError, currentUser, errorHandler } from '@scmicroecom/common';

// Routers
import { productCreatedRouter } from './routes/new';
import { showProductRouter } from './routes/show';
import { updateProductRouter } from './routes/update';
import { indexProductRouter } from './routes/index';

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

app.use(showProductRouter);
app.use(updateProductRouter);
app.use(productCreatedRouter);
app.use(indexProductRouter);

app.all('*', async () => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };
