import express from 'express';

const Router = express.Router();

import {
  signup,
  login,
  google,
  signOut,
} from '../controllers/authController.js';

Router.post('/signup', signup);
Router.post('/login', login);
Router.post('/google', google);
Router.get('/signout', signOut);

export default Router;
