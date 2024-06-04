import express from 'express';

import { registerUserSchema } from '../schemas/usersSchemas.js';
import validateBody from '../decorators/validateBody.js';
import usersController from '../controllers/usersController.js';

const usersRouter = express.Router();

usersRouter.post('/register', validateBody(registerUserSchema), usersController.register);

export default usersRouter;
