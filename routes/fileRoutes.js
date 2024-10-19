import express from 'express';

import {
  newFile,
  getNonTrashFiles,
  getTrashFiles,
  getStarredFiles,
  moveToTrash,
  moveOutOfTrash,
  deleteFile,
  emptyTrash,
  addToStarred,
  removeFromStarred,
  updateFile,
  addAllToTrash,
} from '../controllers/fileController.js';

import { verifyUserToken } from '../controllers/authController.js';

const Router = express.Router();

// Getting normal, trash & starred files and creating new file
Router.route('/:userId').get(getNonTrashFiles).post(newFile);
Router.patch('/:fileId', updateFile);
Router.get('/trashFiles/:userId', getTrashFiles);
Router.get('/starredFiles/:userId', getStarredFiles);

// Trash Routes
Router.delete('/:fileId', verifyUserToken, moveToTrash);
Router.patch('/moveOutOfTrash/:fileId', verifyUserToken, moveOutOfTrash);
Router.delete('/permanent/:fileId', verifyUserToken, deleteFile);
Router.delete('/emptyTrash/:fileIds', verifyUserToken, emptyTrash);
Router.delete('/addAllToTrash/:fileIds', verifyUserToken, addAllToTrash);

// Starred Routes
Router.patch('/addToStarred/:fileId', addToStarred);
Router.patch('/removeFromStarred/:fileId', removeFromStarred);

export default Router;
