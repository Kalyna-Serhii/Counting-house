import authService from '../service/auth-service';
import ApiError from '../exceptions/api-error';
import { UserLoginValidation, UserRegisterValidation } from '../validations/schemes/auth-scheme';
import validation from '../validations/validation';

// ошибка будет обработана в Error-middleware
/* eslint-disable consistent-return */

const AuthController = {
  async registration(req, res, next) {
    try {
      validation(req.body, UserRegisterValidation, next);
      const newUser = await authService.registration(req.body);
      return res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }

    // #swagger.tags = ['Auth']
    // #swagger.summary = 'Registration'
    // #swagger.description = 'New user registration with the provided information'
    /*  #swagger.parameters['obj'] = {
               in: 'body',
               description: 'UserModel object',
               schema: {
                    $name: "John",
                    surname: "Doe",
                    $gender: "man",
                    $phone: "+380123456789",
                    $password: "123456789f",
                    $repeatPassword: "123456789",
                    email: "john.doe@example.com",
                    $floor: 5,
                    $room: 34,
                    $role: "admin",
                    avatar: ""
                }
        } */
    /* #swagger.responses[201] = {
            schema: {
                "accessToken": "string",
                "refreshToken": "string",
                "user": {
                  "id": 2,
                  "name": "Jane",
                  "surname": "Do",
                  "gender": "man",
                  "phone": "+380123456789",
                  "password": "$2b$04$vkG7JZ.zBTgdL9cvswWFOunT2N39w.0foE/gISAMIEAjtUrJyrJ2i",
                  "email": "3o3@exam3le.com",
                  "floor": 1,
                  "room": 1,
                  "role": "user",
                  "avatar": ""
            }
        }
    } */
    // #swagger.responses[400]
    // #swagger.responses[500]
  },

  async login(req, res, next) {
    try {
      validation(req.body, UserLoginValidation, next);
      const user = await authService.login(req.body);
      return res.status(200).json({
        accessToken: user.accessToken,
        refreshToken: user.refreshToken,
      });
    } catch (error) {
      next(error);
    }

    // #swagger.tags = ['Auth']
    // #swagger.summary = 'Login'
    // #swagger.description = 'Log in account'
    /*  #swagger.parameters['obj'] = {
               in: 'body',
               description: 'UserModel object',
               schema: {
                    $phoneOrEmail: "+380123456789",
                    $password: "123456789qwe"
                }
        }
    */
    /* #swagger.responses[200] = {
            schema: {
                "accessToken": "string",
                "refreshToken": "string"
            }
       } */
    // #swagger.responses[400]
    // #swagger.responses[500]
  },

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) {
        return next(ApiError.UnauthorizedError());
      }
      await authService.logout(refreshToken);
      return res.status(204).send();
    } catch (error) {
      next(error);
    }

    // #swagger.tags = ['Auth']
    // #swagger.summary = 'Logout'
    // #swagger.description = 'Log out of account'
    /*  #swagger.parameters['obj'] = {
               in: 'body',
               description: 'Refresh token',
               schema: {
                    $refreshToken: "string"
                }
     } */
    // #swagger.responses[204]
    // #swagger.responses[401]
    // #swagger.responses[500]
  },

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) {
        return next(ApiError.UnauthorizedError());
      }
      const user = await authService.refresh(refreshToken, res);
      return res.status(200).json({
        accessToken: user.accessToken,
        refreshToken: user.refreshToken,
      });
    } catch (error) {
      next(error);
    }

    // #swagger.tags = ['Auth']
    // #swagger.summary = 'Refresh'
    // #swagger.description = 'Refresh tokens'
    /*  #swagger.parameters['obj'] = {
               in: 'body',
               description: 'Refresh token',
               schema: {
                    $refreshToken: "string"
                }
        } */
    /* #swagger.responses[200] = {
            schema: {
                accessToken: "string",
                refreshToken: "string"
            }
       } */
    // #swagger.responses[401]
    // #swagger.responses[500]
  },
};

export default AuthController;
