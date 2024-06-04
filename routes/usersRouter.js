import express from 'express';

import { loginUserSchema, registerUserSchema } from '../schemas/usersSchemas.js';
import validateBody from '../decorators/validateBody.js';
import usersController from '../controllers/usersController.js';

const usersRouter = express.Router();

usersRouter.post('/register', validateBody(registerUserSchema), usersController.register);
usersRouter.post('/login', validateBody(loginUserSchema), usersController.login);

export default usersRouter;
