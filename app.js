import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import authRouter from './routes/authRoutes.js';
import fileRouter from './routes/fileRoutes.js';
import userRouter from './routes/userRoutes.js';
import globalErrorHandler from './controllers/errorController.js';

const app = express();
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.use('/api/auth', authRouter);
app.use('/api/file', fileRouter);
app.use('/api/user', userRouter);

app.use(globalErrorHandler);

export default app;
