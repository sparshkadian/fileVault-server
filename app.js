import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import authRouter from './routes/authRoutes.js';
import fileRouter from './routes/fileRoutes.js';
import userRouter from './routes/userRoutes.js';
import globalErrorHandler from './controllers/errorController.js';

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: 'https://file-vault-client.vercel.app/',
  })
);
app.use(morgan('dev'));

app.use('/api/auth', authRouter);
app.use('/api/file', fileRouter);
app.use('/api/user', userRouter);

app.use(globalErrorHandler);

export default app;
