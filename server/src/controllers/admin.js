const adminService = require('../service/admin');
const FakeUserValidation = require('../validations/admin');
const validation = require('../validations/validation');

// ошибка будет обработана в Error-middleware
/* eslint-disable consistent-return */

const FakeUserController = {
  async createFakeUser(req, res, next) {
    try {
      validation(req.body, FakeUserValidation, next);
      const newFakeUser = await adminService.createFakeUser(req.body);
      return res.status(201).json(newFakeUser);
    } catch (error) {
      next(error);
    }

    // #swagger.tags = ['Admin']
    // #swagger.summary = 'Create a new fake user'
    // #swagger.description = 'Creates a new fake user with the provided information'
    /*  #swagger.parameters['obj'] = {
               in: 'body',
               description: 'User object',
               schema: {
                    $name: 'John',
                    surname: 'Doe',
                    $gender: 'man',
                    $phone: '0123456789',
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
                phone: '0123456789',
                password: null,
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

  async updateFakeUser(req, res, next) {
    try {
      validation(req.body, FakeUserValidation, next);
      const updatedFakeUser = await adminService.updateFakeUser(req.params, req.body);
      return res.status(200).json(updatedFakeUser);
    } catch (error) {
      next(error);
    }

    // #swagger.tags = ['Admin']
    // #swagger.summary = 'Update a fake user'
    // #swagger.description = 'Updates a fake user by user id with the provided information'
    /*  #swagger.parameters['obj'] = {
                in: 'body',
                description: 'User object',
                schema: {
                    $name: 'John',
                    surname: 'Doe',
                    $gender: 'man',
                    $phone: '0123456789',
                    email: 'john.doe@example.com',
                    $floor: 5,
                    $room: 34,
                    $role: 'admin',
                    avatar: ''
                }
        } */
    /* #swagger.responses[200] = {
            schema: {
                id: 5,
                name: 'John',
                surname: 'Doe',
                gender: 'man',
                phone: '0123456789',
                password: null,
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
};

module.exports = FakeUserController;
