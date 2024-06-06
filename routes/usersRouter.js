import express from 'express';

import { loginUserSchema, registerUserSchema } from '../schemas/usersSchemas.js';
import validateBody from '../decorators/validateBody.js';
import usersController from '../controllers/usersController.js';
import authenticate from '../middleware/authenticate.js';
import { uploadAvatar } from '../middleware/upload.js';
import { isValidId } from '../middleware/isValidId.js';

const usersRouter = express.Router();

// Public routes
usersRouter.post('/register', validateBody(registerUserSchema), usersController.register);
usersRouter.post('/login', validateBody(loginUserSchema), usersController.login);

// Private routes
usersRouter.use(authenticate);
usersRouter.patch('/avatar', uploadAvatar, usersController.updateAvatar);
usersRouter.patch('/followings/:id', isValidId, usersController.addToFollowing);
usersRouter.delete('/followings/:id', isValidId, usersController.removeFromFollowing);
usersRouter.get('/followings', usersController.getFollowing);
usersRouter.get('/followers', usersController.getFollowers);
usersRouter.get('/current', usersController.getCurrentUser);
usersRouter.post('/logout', usersController.logout);

export default usersRouter;
