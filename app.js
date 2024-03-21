import express from 'express';
import morgan from 'morgan';

import authRouter from './routes/authRoutes.js';
import globalErrorHandler from './controllers/errorController.js';

const app = express();
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/auth', authRouter);

app.use(globalErrorHandler);

export default app;
