import express from 'express';

import {
  newFile,
  getAllFiles,
  moveToTrash,
} from '../controllers/fileController.js';

import { verifyUserToken } from '../controllers/authController.js';

const Router = express.Router();

Router.route('/:userId').get(getAllFiles).post(newFile);

Router.delete('/:fileId', verifyUserToken, moveToTrash);

export default Router;
