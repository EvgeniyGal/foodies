import express from 'express';

import { loginUserSchema, registerUserSchema } from '../schemas/usersSchemas.js';
import validateBody from '../decorators/validateBody.js';
import usersController from '../controllers/usersController.js';
import authenticate from '../middleware/authenticate.js';
import { uploadAvatar } from '../middleware/upload.js';

const usersRouter = express.Router();

usersRouter.post('/register', validateBody(registerUserSchema), usersController.register);
usersRouter.post('/login', validateBody(loginUserSchema), usersController.login);
usersRouter.patch('/avatar', authenticate, uploadAvatar, usersController.updateAvatar);
usersRouter.get('/current', authenticate, usersController.getCurrentUser);
usersRouter.post('/logout', authenticate, usersController.logout);

export default usersRouter;
