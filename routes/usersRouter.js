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
usersRouter.get(
  '/followings',
  usersController.getFollowing
  // #swagger.tags = ['Users']
  // #swagger.description = 'Authenticated user route'
  /* #swagger.responses[200] = {
            description: "OK",
            schema: { $ref: '#/components/schemas/userFollowingsResponse' }
        }   
    */
  /* #swagger.responses[404] = {
            description: "Bad request",
            schema: { $ref: '#/components/schemas/errorMessage' }
        }   
    */
);
usersRouter.get(
  '/followers',
  usersController.getFollowers
  // #swagger.tags = ['Users']
  // #swagger.description = 'Authenticated user route'
  /* #swagger.responses[200] = {
            description: "OK",
            schema: { $ref: '#/components/schemas/userFollowersResponse' }
        }   
    */
  /* #swagger.responses[404] = {
            description: "Bad request",
            schema: { $ref: '#/components/schemas/errorMessage' }
        }   
    */
);
usersRouter.get(
  '/current',
  usersController.getCurrentUser
  // #swagger.tags = ['Users']
  // #swagger.description = 'Authenticated user route'
  /* #swagger.responses[200] = {
            description: "OK",
            schema: { $ref: '#/components/schemas/userCurrentResponse' }
        }   
    */
  /* #swagger.responses[404] = {
            description: "Bad request",
            schema: { $ref: '#/components/schemas/errorMessage' }
        }   
    */
);
usersRouter.get(
  '/:id',
  isValidId,
  usersController.getUserProfile
  // #swagger.tags = ['Users']
  // #swagger.description = 'Authenticated user route'
  /* #swagger.responses[200] = {
            description: "OK",
            schema: { $ref: '#/components/schemas/userByIdResponse' }
        }   
    */
  /* #swagger.responses[404] = {
            description: "Bad request",
            schema: { $ref: '#/components/schemas/errorMessage' }
        }   
    */
);
usersRouter.patch(
  '/avatar',
  uploadAvatar,
  usersController.updateAvatar
  // #swagger.tags = ['Users']
  // #swagger.description = 'Authenticated user route'
  /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/userPatchAvatarBody"
                    }  
                }
            }
        } 
    */
  /* #swagger.responses[200] = {
            description: "OK",
            schema: { $ref: '#/components/schemas/userPatchAvatarResponse' }
        }   
    */
  /* #swagger.responses[404] = {
            description: "Bad request",
            schema: { $ref: '#/components/schemas/errorMessage' }
        }   
    */
);
usersRouter.patch(
  '/followings/:id',
  isValidId,
  usersController.followUser
  // #swagger.tags = ['Users']
  // #swagger.description = 'Authenticated user route'
  /* #swagger.responses[200] = {
            description: "OK",
            schema: { $ref: '#/components/schemas/userFollowingsResponse' }
        }   
    */
  /* #swagger.responses[404] = {
            description: "Bad request",
            schema: { $ref: '#/components/schemas/errorMessage' }
        }   
    */
);
usersRouter.delete(
  '/followings/:id',
  isValidId,
  usersController.unfollowUser
  // #swagger.tags = ['Users']
  // #swagger.description = 'Authenticated user route'
  /* #swagger.responses[200] = {
            description: "OK",
            schema: { $ref: '#/components/schemas/userFollowingsResponse' }
        }   
    */
  /* #swagger.responses[404] = {
            description: "Bad request",
            schema: { $ref: '#/components/schemas/errorMessage' }
        }   
    */
);
usersRouter.post(
  '/logout',
  usersController.logout
  // #swagger.tags = ['Users']
  // #swagger.description = 'Authenticated user route'
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
usersRouter.get(
  '/recipes/favorite',
  usersController.getFavoriteRecipes
  // #swagger.tags = ['Users']
  // #swagger.description = 'Authenticated user route'
  /* #swagger.responses[200] = {
            description: "OK",
            schema: { $ref: '#/components/schemas/userRecipesResponse' }
        }   
    */
  /* #swagger.responses[404] = {
            description: "Bad request",
            schema: { $ref: '#/components/schemas/errorMessage' }
        }   
    */
);
usersRouter.patch(
  '/recipes/favorite/:id',
  isValidId,
  usersController.likeRecipe
  // #swagger.tags = ['Users']
  // #swagger.description = 'Authenticated user route'
  /* #swagger.responses[200] = {
            description: "OK",
            schema: { $ref: '#/components/schemas/userRecipesResponse' }
        }   
    */
  /* #swagger.responses[404] = {
            description: "Bad request",
            schema: { $ref: '#/components/schemas/errorMessage' }
        }   
    */
);
usersRouter.delete(
  '/recipes/favorite/:id',
  isValidId,
  usersController.unlikeRecipe
  // #swagger.tags = ['Users']
  // #swagger.description = 'Authenticated user route'
  /* #swagger.responses[200] = {
            description: "OK",
            schema: { $ref: '#/components/schemas/userRecipesResponse' }
        }   
    */
  /* #swagger.responses[404] = {
            description: "Bad request",
            schema: { $ref: '#/components/schemas/errorMessage' }
        }   
    */
);

export default usersRouter;
