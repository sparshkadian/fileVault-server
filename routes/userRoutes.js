import express from 'express';

import { updateUser } from '../controllers/userController.js';

const Router = express.Router();

Router.patch('/:userId', updateUser);

export default Router;
