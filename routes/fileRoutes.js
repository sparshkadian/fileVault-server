import express from 'express';

import {
  newFile,
  getNonTrashFiles,
  getTrashFiles,
  moveToTrash,
} from '../controllers/fileController.js';

import { verifyUserToken } from '../controllers/authController.js';

const Router = express.Router();

Router.route('/:userId').get(getNonTrashFiles).post(newFile).delete();
Router.route('/trashFiles/:userId').get(getTrashFiles);

Router.delete('/:fileId', verifyUserToken, moveToTrash);

export default Router;
