import express from 'express';

import {
  newFile,
  getNonTrashFiles,
  getTrashFiles,
  moveToTrash,
  moveOutOfTrash,
  deleteFile,
} from '../controllers/fileController.js';

import { verifyUserToken } from '../controllers/authController.js';

const Router = express.Router();

Router.route('/:userId').get(getNonTrashFiles).post(newFile);
Router.get('/trashFiles/:userId', getTrashFiles);
Router.patch('/moveOutOfTrash/:fileId', moveOutOfTrash);

Router.delete('/permanent/:fileId', verifyUserToken, deleteFile);
Router.delete('/:fileId', verifyUserToken, moveToTrash);

export default Router;
