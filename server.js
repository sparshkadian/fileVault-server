import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import app from './app.js';

const port = process.env.PORT || 4100;

app.listen(port, () => {
  console.log(`server is running on port:${port}`);
});

mongoose
  .connect(process.env.MONGODB)
  .then(() => {
    console.log('DB connection successfull 🎉');
  })
  .catch((err) => {
    console.log('Error connecting to DB', err);
  });
