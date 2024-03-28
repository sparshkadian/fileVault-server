import express from 'express';

import {
  newFile,
  getNonTrashFiles,
  getTrashFiles,
  moveToTrash,
  moveOutOfTrash,
  deleteFile,
  emptyTrash,
} from '../controllers/fileController.js';

import { verifyUserToken } from '../controllers/authController.js';

const Router = express.Router();

Router.route('/:userId').get(getNonTrashFiles).post(newFile);
Router.get('/trashFiles/:userId', getTrashFiles);

Router.delete('/:fileId', verifyUserToken, moveToTrash);
Router.patch('/moveOutOfTrash/:fileId', verifyUserToken, moveOutOfTrash);
Router.delete('/permanent/:fileId', verifyUserToken, deleteFile);
Router.delete('/emptyTrash/:fileIds', verifyUserToken, emptyTrash);

export default Router;
