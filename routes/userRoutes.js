import express from 'express';

import { updateUser, deleteUser } from '../controllers/userController.js';

const Router = express.Router();

Router.route('/:userId').patch(updateUser).delete(deleteUser);

export default Router;
