const authService = require('../service/auth');

class AuthController {
  // eslint-disable-next-line class-methods-use-this,consistent-return
  async registration(req, res) {
    try {
      const newUser = await authService.registration(req, res);
      res.cookie('refreshToken', newUser.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
      return res.status(201).json(newUser.user);
    } catch (error) {
      /* empty */
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
            description: 'Successful response',
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
  }

  // eslint-disable-next-line class-methods-use-this,consistent-return
  async login(req, res) {
    try {
      const userData = await authService.login(req, res);
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
      return res.status(200).send();
    } catch (error) {
      /* empty */
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
    /* #swagger.responses[200] = { description: 'Successful response' } */
  }

  // eslint-disable-next-line class-methods-use-this,consistent-return
  async logout(req, res) {
    try {
      const { refreshToken } = req.cookies;
      await authService.logout(refreshToken);
      res.clearCookie('refreshToken');
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json(error);
    }

    // #swagger.tags = ['Auth']
    // #swagger.summary = 'Logout'
    // #swagger.description = 'Log out of account'
    // #swagger.responses[204] = { description: 'Successful response' }
  }

  // eslint-disable-next-line class-methods-use-this
  async refresh(req, res) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await authService.refresh(refreshToken, res);
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
      return res.status(200).send();
    } catch (error) {
      return res.status(500).json(error);
    }

    // #swagger.tags = ['Auth']
    // #swagger.summary = 'Refresh'
    // #swagger.description = 'Refresh access token'
    // #swagger.responses[200] = { description: 'Successful response' }
  }
}

module.exports = new AuthController();
