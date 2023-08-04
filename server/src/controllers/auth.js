const bcrypt = require('bcrypt');
const User = require('../models/user');
const RegistrationUserValidation = require('../validations/user');

class AuthController {
  // eslint-disable-next-line class-methods-use-this
  async registration(req, res) {
    const { error: customError } = RegistrationUserValidation(req.body);
    if (customError) {
      const errorMessage = customError.details[0].message;
      return res.status(400).json({ error: errorMessage });
    }
    try {
      const {
        name, surname, email, floor, room, avatar,
      } = req.body;

      let {
        password, phone, gender, role,
      } = req.body;
      password = await bcrypt.hash(password, 3);
      if (phone.startsWith('0')) {
        phone = `+38${phone}`;
      } else if (phone.startsWith('380')) {
        phone = `+${phone}`;
      }

      const phoneAlreadyExists = await User.findOne({
        where: {
          phone,
        },
      });
      if (phoneAlreadyExists) {
        return res.status(409).json('Користувач з таким номером телефону вже існує');
      }
      if (email) {
        const emailAlreadyExists = await User.findOne({
          where: {
            email,
          },
        });
        if (emailAlreadyExists) {
          return res.status(409).json('Користувач з таким email вже існує');
        }
      }
      if (!gender) {
        gender = 'man';
      }
      if (!role) {
        role = 'user';
      }
      const newUser = await User.create({
        name,
        surname,
        gender,
        phone,
        password,
        email,
        floor,
        room,
        role,
        avatar,
      });
      return res.status(201).json(newUser);
    } catch (error) {
      return res.status(500).json(error.message);
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
                    gender: 'man',
                    $phone: '+380123456789',
                    $password: '123456789f',
                    $repeatPassword: '123456789',
                    email: 'john.doe@example.com',
                    $floor: 5,
                    $room: 34,
                    role: 'admin',
                    avatar: ''
                }
        } */
    /* #swagger.responses[200] = {
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
}

module.exports = new AuthController();
