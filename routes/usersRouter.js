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
  // #swagger.tags = ['Users']
  /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/userRegisterBody"
                    }  
                }
            }
        } 
    */
  /* #swagger.responses[201] = {
            description: "User successfully created",
            content: {
                "application/json": {
                    schema:{
                        $ref: "#/components/schemas/userRegisterResponse"
                    }
                }           
            }
        }   
    */
  /* #swagger.responses[404] = {
            description: "Bad request",
            schema: { $ref: '#/components/schemas/errorMessage' }
        }   
    */
  /* #swagger.responses[409] = {
            description: "Email in use",
            schema: { $ref: '#/components/schemas/errorMessage' }
        }   
    */
);
usersRouter.post(
  '/login',
  validateBody(loginUserSchema),
  usersController.login
  // #swagger.tags = ['Users']
  /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/userLoginBody"
                    }  
                }
            }
        } 
    */
  /* #swagger.responses[200] = {
            description: "User successfully created",
            content: {
                "application/json": {
                    schema:{
                        $ref: "#/components/schemas/userLoginResponse"
                    }
                }           
            }
        }   
    */
  /* #swagger.responses[401] = {
            description: "Email or password is wrong",
            schema: { $ref: '#/components/schemas/errorMessage' }
        }   
    */
  /* #swagger.responses[404] = {
            description: "Bad request",
            schema: { $ref: '#/components/schemas/errorMessage' }
        }   
    */
);
usersRouter.post(
  '/reset-password',
  validateBody(resetPasswordEmailSchema),
  usersController.sendResetEmail
  // #swagger.tags = ['Users']
  /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/userResetPassEmailBody"
                    }  
                }
            }
        } 
    */
  /* #swagger.responses[204] = {
            description: "No Content",
        }   
    */
  /* #swagger.responses[404] = {
            description: "Bad request",
            schema: { $ref: '#/components/schemas/errorMessage' }
        }   
    */
);
usersRouter.post(
  '/reset-password/:resetToken',
  validateBody(resetPasswordSchema),
  usersController.resetPassword
  // #swagger.tags = ['Users']
  /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/userNewPassBody"
                    }  
                }
            }
        } 
    */
  /* #swagger.responses[302] = {
            description: "Redirect to login page",
        }   
    */
  /* #swagger.responses[404] = {
            description: "Bad request",
            schema: { $ref: '#/components/schemas/errorMessage' }
        }   
    */
);

// Private routes
usersRouter.use(authenticate);
usersRouter.get('/followings', usersController.getFollowing);
usersRouter.get('/followers', usersController.getFollowers);
usersRouter.get('/current', usersController.getCurrentUser);
usersRouter.get('/:id', isValidId, usersController.getUserProfile);
usersRouter.patch('/avatar', uploadAvatar, usersController.updateAvatar);
usersRouter.patch('/followings/:id', isValidId, usersController.followUser);
usersRouter.delete('/followings/:id', isValidId, usersController.unfollowUser);
usersRouter.post('/logout', usersController.logout);

usersRouter.get('/recipes/favorite', usersController.getFavoriteRecipes);
usersRouter.patch(
  '/recipes/favorite/:id',
  isValidId,
  usersController.likeRecipe
);
usersRouter.delete(
  '/recipes/favorite/:id',
  isValidId,
  usersController.unlikeRecipe
);

export default usersRouter;
