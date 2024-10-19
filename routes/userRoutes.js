import express from 'express';

import {
  updateUser,
  deleteUser,
  getAllUsers,
} from '../controllers/userController.js';

const Router = express.Router();

Router.route('/:userId').patch(updateUser).delete(deleteUser);

Router.get('/all', getAllUsers);

export default Router;
