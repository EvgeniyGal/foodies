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
                        $ref: "#/components/schemas/userRegisterReq"
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
                        $ref: "#/components/schemas/userRegisterRes"
                    }
                }
            }
        }
    */
  /* #swagger.responses[404] = {
            description: "Bad request",
            schema: { $ref: '#/components/schemas/errorMessageRes' }
        }
    */
  /* #swagger.responses[409] = {
            description: "Email in use",
            schema: { $ref: '#/components/schemas/errorMessageRes' }
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
                        $ref: "#/components/schemas/userLoginReq"
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
                        $ref: "#/components/schemas/userLoginRes"
                    }
                }
            }
        }
    */
  /* #swagger.responses[401] = {
            description: "Email or password is wrong",
            schema: { $ref: '#/components/schemas/errorMessageRes' }
        }
    */
  /* #swagger.responses[404] = {
            description: "Bad request",
            schema: { $ref: '#/components/schemas/errorMessageRes' }
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
                        $ref: "#/components/schemas/userResetPasswordReq"
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
            schema: { $ref: '#/components/schemas/errorMessageRes' }
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
                        $ref: "#/components/schemas/userResetPasswordNewReq"
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
            schema: { $ref: '#/components/schemas/errorMessageRes' }
        }
    */
);

// Private routes
usersRouter.use(authenticate);
usersRouter.get(
  '/followings',
  usersController.getFollowing
  // #swagger.tags = ['Users']
  // #swagger.description = 'Authenticated user route'
  /* #swagger.security = [{
            "bearerAuth": []
    }] */
  /* #swagger.responses[200] = {
            description: "OK",
            schema: { $ref: '#/components/schemas/userFollowingsRes' }
        }
    */
  /* #swagger.responses[401] = {
            description: "Unauthorized",
            schema: { $ref: '#/components/schemas/unauthorizedRes' }
        }
    */
  /* #swagger.responses[404] = {
            description: "Bad request",
            schema: { $ref: '#/components/schemas/errorMessageRes' }
        }
    */
);
usersRouter.get(
  '/:id/followers',
  isValidId,
  usersController.getFollowers
  // #swagger.tags = ['Users']
  // #swagger.description = 'Authenticated user route'
  /* #swagger.security = [{
            "bearerAuth": []
    }] */
  /* #swagger.responses[200] = {
            description: "OK",
            schema: { $ref: '#/components/schemas/userFollowersRes' }
        }
    */
  /* #swagger.responses[401] = {
            description: "Unauthorized",
            schema: { $ref: '#/components/schemas/unauthorizedRes' }
        }
    */
  /* #swagger.responses[404] = {
            description: "Bad request",
            schema: { $ref: '#/components/schemas/errorMessageRes' }
        }
    */
);
usersRouter.get(
  '/current',
  usersController.getCurrentUser
  // #swagger.tags = ['Users']
  // #swagger.description = 'Authenticated user route'
  /* #swagger.security = [{
            "bearerAuth": []
    }] */
  /* #swagger.responses[200] = {
            description: "OK",
            schema: { $ref: '#/components/schemas/userCurrentRes' }
        }
    */
  /* #swagger.responses[401] = {
            description: "Unauthorized",
            schema: { $ref: '#/components/schemas/unauthorizedRes' }
        }
    */
  /* #swagger.responses[404] = {
            description: "Bad request",
            schema: { $ref: '#/components/schemas/errorMessageRes' }
        }
    */
);
usersRouter.get(
  '/:id',
  isValidId,
  usersController.getUserProfile
  // #swagger.tags = ['Users']
  // #swagger.description = 'Authenticated user route'
  /* #swagger.security = [{
            "bearerAuth": []
    }] */
  /* #swagger.responses[200] = {
            description: "OK",
            schema: { $ref: '#/components/schemas/userByIdRes' }
        }
    */
  /* #swagger.responses[401] = {
            description: "Unauthorized",
            schema: { $ref: '#/components/schemas/unauthorizedRes' }
        }
    */
  /* #swagger.responses[404] = {
            description: "Bad request",
            schema: { $ref: '#/components/schemas/errorMessageRes' }
        }
    */
);
usersRouter.patch(
  '/avatar',
  uploadAvatar,
  usersController.updateAvatar
  // #swagger.tags = ['Users']
  // #swagger.description = 'Authenticated user route'
  /* #swagger.security = [{
            "bearerAuth": []
    }] */
  /*  #swagger.requestBody = {
            required: true,
            content: {
                "multipart/form-data": {
                    schema: {
                        type: "object",
                        properties: {
                            avatar: {
                                type: "string",
                                format: "binary",
                            }
                        }
                    }
                }
            }
        }
    }
    */
  /* #swagger.responses[200] = {
            description: "OK",
            schema: { $ref: '#/components/schemas/userAvatarRes' }
        }
    */
  /* #swagger.responses[401] = {
            description: "Unauthorized",
            schema: { $ref: '#/components/schemas/unauthorizedRes' }
        }
    */
  /* #swagger.responses[404] = {
            description: "Bad request",
            schema: { $ref: '#/components/schemas/errorMessageRes' }
        }
    */
);
usersRouter.patch(
  '/followings/:id',
  isValidId,
  usersController.followUser
  // #swagger.tags = ['Users']
  // #swagger.description = 'Authenticated user route'
  /* #swagger.security = [{
            "bearerAuth": []
    }] */
  /* #swagger.responses[200] = {
            description: "OK",
            schema: { $ref: '#/components/schemas/userFollowingsRes' }
        }
    */
  /* #swagger.responses[401] = {
            description: "Unauthorized",
            schema: { $ref: '#/components/schemas/unauthorizedRes' }
        }
    */
  /* #swagger.responses[404] = {
            description: "Bad request",
            schema: { $ref: '#/components/schemas/errorMessageRes' }
        }
    */
);
usersRouter.delete(
  '/followings/:id',
  isValidId,
  usersController.unfollowUser
  // #swagger.tags = ['Users']
  // #swagger.description = 'Authenticated user route'
  /* #swagger.security = [{
            "bearerAuth": []
    }] */
  /* #swagger.responses[200] = {
            description: "OK",
            schema: { $ref: '#/components/schemas/userFollowingsRes' }
        }
    */
  /* #swagger.responses[401] = {
            description: "Unauthorized",
            schema: { $ref: '#/components/schemas/unauthorizedRes' }
        }
    */
  /* #swagger.responses[404] = {
            description: "Bad request",
            schema: { $ref: '#/components/schemas/errorMessageRes' }
        }
    */
);
usersRouter.post(
  '/logout',
  usersController.logout
  // #swagger.tags = ['Users']
  // #swagger.description = 'Authenticated user route'
  /* #swagger.security = [{
            "bearerAuth": []
    }] */
  /* #swagger.responses[204] = {
            description: "No Content",
        }
    */
  /* #swagger.responses[401] = {
            description: "Unauthorized",
            schema: { $ref: '#/components/schemas/unauthorizedRes' }
        }
    */
  /* #swagger.responses[404] = {
            description: "Bad request",
            schema: { $ref: '#/components/schemas/errorMessageRes' }
        }
    */
);
usersRouter.get(
  '/recipes/favorite',
  usersController.getFavoriteRecipes
  // #swagger.tags = ['Users']
  // #swagger.description = 'Authenticated user route'
  /* #swagger.security = [{
            "bearerAuth": []
    }] */
  /* #swagger.responses[200] = {
            description: "OK",
            schema: { $ref: '#/components/schemas/userRecipesFavoriteRes' }
        }
    */
  /* #swagger.responses[401] = {
            description: "Unauthorized",
            schema: { $ref: '#/components/schemas/unauthorizedRes' }
        }
    */
  /* #swagger.responses[404] = {
            description: "Bad request",
            schema: { $ref: '#/components/schemas/errorMessageRes' }
        }
    */
);
usersRouter.patch(
  '/recipes/favorite/:id',
  isValidId,
  usersController.likeRecipe
  // #swagger.tags = ['Users']
  // #swagger.description = 'Authenticated user route'
  /* #swagger.security = [{
            "bearerAuth": []
    }] */
  /* #swagger.responses[200] = {
            description: "OK",
            schema: { $ref: '#/components/schemas/userRecipesFavoriteRes' }
        }
    */
  /* #swagger.responses[401] = {
            description: "Unauthorized",
            schema: { $ref: '#/components/schemas/unauthorizedRes' }
        }
    */
  /* #swagger.responses[404] = {
            description: "Bad request",
            schema: { $ref: '#/components/schemas/errorMessageRes' }
        }
    */
);
usersRouter.delete(
  '/recipes/favorite/:id',
  isValidId,
  usersController.unlikeRecipe
  // #swagger.tags = ['Users']
  // #swagger.description = 'Authenticated user route'
  /* #swagger.security = [{
            "bearerAuth": []
    }] */
  /* #swagger.responses[200] = {
            description: "OK",
            schema: { $ref: '#/components/schemas/userRecipesFavoriteRes' }
        }
    */
  /* #swagger.responses[401] = {
            description: "Unauthorized",
            schema: { $ref: '#/components/schemas/unauthorizedRes' }
        }
    */
  /* #swagger.responses[404] = {
            description: "Bad request",
            schema: { $ref: '#/components/schemas/errorMessageRes' }
        }
    */
);

export default usersRouter;
