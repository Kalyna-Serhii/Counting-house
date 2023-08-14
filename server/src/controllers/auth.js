const authService = require('../service/auth');
const [UserValidation, UserLoginValidation] = require('../validations/user');
const ApiError = require('../exceptions/api-error');

// ошибка будет обработана в Error-middleware
/* eslint-disable consistent-return */

function validation(body, schema, next) {
  const { error: customError } = schema(body);
  if (customError) {
    const errorMessage = customError.details[0].message;
    throw next(ApiError.BadRequest(errorMessage));
  }
}

const AuthController = {
  async registration(req, res, next) {
    try {
      validation(req.body, UserValidation, next);
      const newUser = await authService.registration(req.body);
      res.cookie('refreshToken', newUser.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
      return res.status(201).json(newUser.user);
    } catch (error) {
      next(error);
    }

    // #swagger.tags = ['Auth']
    // #swagger.summary = 'Registration'
    // #swagger.description = 'New user registration with the provided information'
    /*  #swagger.parameters['obj'] = {
               in: 'body',
               description: 'User object',
               schema: {
                    $name: 'John',
                    surname: 'Doe',
                    $gender: 'man',
                    $phone: '+380123456789',
                    $password: '123456789f',
                    $repeatPassword: '123456789',
                    email: 'john.doe@example.com',
                    $floor: 5,
                    $room: 34,
                    $role: 'admin',
                    avatar: ''
                }
        } */
    /* #swagger.responses[201] = {
            schema: {
                id: 5,
                name: 'John',
                surname: 'Doe',
                gender: 'man',
                phone: '+380123456789',
                password: '$2b$04$g4415yNFT4BGk8aoxufQpuNYX5byukyoJjdzJvGuMnSTf4r2p6lga',
                email: 'john.doe@example.com',
                floor: 5,
                room: 34,
                role: 'admin',
                avatar: ''
            }
    } */
    // #swagger.responses[400]
    // #swagger.responses[500]
  },

  async login(req, res, next) {
    try {
      validation(req.body, UserLoginValidation, next);
      const userData = await authService.login(req.body);
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
      return res.status(200).send();
    } catch (error) {
      next(error);
    }

    // #swagger.tags = ['Auth']
    // #swagger.summary = 'Login'
    // #swagger.description = 'Log in account'
    /*  #swagger.parameters['obj'] = {
               in: 'body',
               description: 'User object',
               schema: {
                    $phoneOrEmail: '+380123456789',
                    $password: '123456789qwe'
                }
        } */
    // #swagger.responses[400]
    // #swagger.responses[500]
  },

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      if (!refreshToken) {
        return next(ApiError.UnauthorizedError());
      }
      await authService.logout(refreshToken);
      res.clearCookie('refreshToken');
      return res.status(204).send();
    } catch (error) {
      next(error);
    }

    // #swagger.tags = ['Auth']
    // #swagger.summary = 'Logout'
    // #swagger.description = 'Log out of account'
    // #swagger.responses[401]
    // #swagger.responses[500]
  },

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      if (!refreshToken) {
        return next(ApiError.UnauthorizedError());
      }
      const userData = await authService.refresh(refreshToken, res);
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
      return res.status(200).send();
    } catch (error) {
      next(error);
    }

    // #swagger.tags = ['Auth']
    // #swagger.summary = 'Refresh'
    // #swagger.description = 'Refresh access token'
    // #swagger.responses[401]
    // #swagger.responses[500]
  },
};

module.exports = AuthController;
