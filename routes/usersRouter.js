import express from 'express';

import {
  loginUserSchema,
  registerUserSchema,
  resetPasswordEmailSchema,
  resetPasswordSchema,
} from '../schemas/usersSchemas.js';
import validateBody from '../decorators/validateBody.js';
import usersController from '../controllers/usersController.js';
import authenticate from '../middleware/authenticate.js';
import { uploadAvatar } from '../middleware/upload.js';
import { isValidId } from '../middleware/isValidId.js';

const usersRouter = express.Router();

// Public routes
usersRouter.post(
  '/register',
  validateBody(registerUserSchema),
  usersController.register
);
usersRouter.post(
  '/login',
  validateBody(loginUserSchema),
  usersController.login
);
usersRouter.post(
  '/reset-password',
  validateBody(resetPasswordEmailSchema),
  usersController.sendResetEmail
);
usersRouter.post(
  '/reset-password/:resetToken',
  validateBody(resetPasswordSchema),
  usersController.resetPassword
);

// Private routes
usersRouter.use(authenticate);
usersRouter.get('/followings', usersController.getFollowing);
usersRouter.get('/followers', usersController.getFollowers);
usersRouter.get('/current', usersController.getCurrentUser);
usersRouter.get('/:id', isValidId, usersController.getUserProfile);
usersRouter.patch('/avatar', uploadAvatar, usersController.updateAvatar);
usersRouter.patch('/followings/:id', isValidId, usersController.addToFollowing);
usersRouter.delete('/followings/:id', isValidId, usersController.removeFromFollowing);
usersRouter.post('/logout', usersController.logout);

usersRouter.get('/recipes/favorite', isValidId, usersController.getFavoriteRecipes);
usersRouter.patch('/recipes/favorite/:id', isValidId, usersController.likeRecipe);
usersRouter.delete('/recipes/favorite/:id', isValidId, usersController.unlikeRecipe);

export default usersRouter;
