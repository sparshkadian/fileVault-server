import express from 'express';

import { newFile, getAllFiles } from '../controllers/fileController.js';

const Router = express.Router();

Router.route('/:userId').get(getAllFiles).post(newFile);

export default Router;
