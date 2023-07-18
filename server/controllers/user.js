const db = require('../db');
const [
  CreateUserValidation,
  UpdateUserValidation,
] = require('../validations/user');
const bcrypt = require('bcrypt');
class UserController {
  async getUsers(req, res) {
    try {
      const users = await db.query('SELECT * FROM users');
      res.json(users.rows);
    } catch (error) {
      return res
        .status(500)
        .json('Не вдалось виконати запит, спробуйте пізніше');
    }

    // #swagger.tags = ['Users']
    // #swagger.summary = 'Get a list of users'
    // #swagger.description = 'Returns a list of all users'
    /* #swagger.responses[200] = {
        description: 'Successful response',
        schema: {
            type: 'array'
        },
        examples: {
            'application/json': [
                {
                    id: 5,
                    name: 'John',
                    surname: 'Doe',
                    gender: 'man',
                    phone: '0123456789',
                    password: '123456789',
                    email: 'john.doe@example.com',
                    floor: 5,
                    room: 34,
                    role: 'admin',
                    avatar: '',
                },
                {
                    id: 6,
                    name: 'Jane',
                    surname: 'Smith',
                    gender: 'woman',
                    phone: '0987654321',
                    password: '123456789',
                    email: 'jane.smith@example.com',
                    floor: 2,
                    room: 10,
                    role: 'user',
                    avatar: ''
                }
            ]
        }
        } */
  }

  async createUser(req, res) {
    const { error } = CreateUserValidation(req.body);
    if (error) {
      const errorMessage = error.details[0].message;
      return res.status(400).json({ error: errorMessage });
    }
    try {
      let {
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
      } = req.body;
      password = await bcrypt.hash(password, 3);
      const phoneAlreadyExists = await db.query(
        'SELECT * FROM users WHERE phone = $1',
        [phone]
      );
      if (phoneAlreadyExists.rows[0]) {
        return res
          .status(409)
          .json('Користувач з таким номером телефону вже існує');
      }
      const emailAlreadyExists = await db.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
      );
      if (emailAlreadyExists.rows[0]) {
        return res.status(409).json('Користувач з таким email вже існує');
      }
      if (!gender) {
        gender = 'man';
      }
      if (!role) {
        role = 'user';
      }
      const newUser = await db.query(
        `INSERT INTO users
        (name, surname, gender, phone, password, email, floor, room, role, avatar) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
        [
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
        ]
      );
      res.json(newUser.rows[0]);
    } catch (error) {
      return res
        .status(500)
        .json('Не вдалось виконати запит, спробуйте пізніше');
    }

    // #swagger.tags = ['Users']
    // #swagger.summary = 'Create a new user'
    // #swagger.description = 'Creates a new user with the provided information'
    /*  #swagger.parameters['obj'] = {
               in: 'body',
               description: 'User object',
               schema: {
                    $name: 'John',
                    surname: 'Doe',
                    gender: 'man',
                    $phone: '0123456789',
                    $password: '123456789',
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
                phone: '0123456789',
                password: '$2b$04$g4415yNFT4BGk8aoxufQpuNYX5byukyoJjdzJvGuMnSTf4r2p6lga',
                email: 'john.doe@example.com',
                floor: 5,
                room: 34,
                role: 'admin',
                avatar: ''
            }
        } */
  }

  async getUserById(req, res) {
    try {
      const id = req.params.id;
      const user = await db.query('SELECT * FROM users WHERE id = $1', [id]);
      if (user.rows[0]) {
        res.json(user.rows[0]);
      } else {
        return res.status(400).json('Такого користувача не існує');
      }
    } catch (error) {
      return res
        .status(500)
        .json('Не вдалось виконати запит, спробуйте пізніше');
    }

    // #swagger.tags = ['Users']
    // #swagger.summary = 'Get a user'
    // #swagger.description = 'Returns a user by user id'
    // #swagger.parameters['id'] = { description: 'User id' }
    /* #swagger.responses[200] = {
            description: 'Successful response',
            schema: {
                id: 5,
                name: 'John',
                surname: 'Doe',
                gender: 'man',
                phone: '0123456789',
                password: '123456789',
                email: 'john.doe@example.com',
                floor: 5,
                room: 34,
                role: 'admin',
                avatar: ''
            }
        } */
  }

  async updateUser(req, res) {
    const { error } = UpdateUserValidation(req.body);
    if (error) {
      const errorMessage = error.details[0].message;
      return res.status(400).json({ error: errorMessage });
    }
    try {
      let {
        id,
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
      } = req.body;

      let updateFields = {};
      if (name) {
        updateFields.name = name;
      }
      if (surname) {
        updateFields.surname = surname;
      }
      if (gender) {
        updateFields.gender = gender;
      }
      if (phone) {
        updateFields.phone = phone;
      }
      if (password) {
        updateFields.password = await bcrypt.hash(password, 3);
      }
      if (email) {
        updateFields.email = email;
      }
      if (floor) {
        updateFields.floor = floor;
      }
      if (room) {
        updateFields.room = room;
      }
      if (role) {
        updateFields.role = role;
      }
      if (avatar) {
        updateFields.avatar = avatar;
      }
      const phoneAlreadyExists = await db.query(
        'SELECT * FROM users WHERE phone = $1',
        [phone]
      );
      if (phoneAlreadyExists.rows[0]) {
        if (phoneAlreadyExists.rows[0].id != id) {
          return res
            .status(409)
            .json('Користувач з таким номером телефону вже існує');
        }
      }
      const emailAlreadyExists = await db.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
      );
      if (emailAlreadyExists.rows[0]) {
        if (emailAlreadyExists.rows[0].id != id) {
          return res.status(409).json('Користувач з таким email вже існує');
        }
      }
      if (Object.keys(updateFields).length === 0) {
        return res.status(400).json('Не вказано жодного поля для оновлення');
      }
      const updateUserQuery = {
        text: `
        UPDATE users
        SET ${Object.keys(updateFields)
          .map((key, index) => `${key} = $${index + 2}`)
          .join(', ')}
        WHERE id = $1
        RETURNING *
      `,
        values: [id, ...Object.values(updateFields)],
      };
      const UpdateUser = await db.query(updateUserQuery);
      if (!UpdateUser.rows[0]) {
        return res.status(400).json('Такого користувача не існує');
      } else {
        res.json(UpdateUser.rows[0]);
      }
    } catch (error) {
      return res
        .status(500)
        .json('Не вдалось виконати запит, спробуйте пізніше');
    }

    // #swagger.tags = ['Users']
    // #swagger.summary = 'Update a user'
    // #swagger.description = 'Updates a user by user id with the provided information'
    /*  #swagger.parameters['obj'] = {
                in: 'body',
                description: 'User object',
                schema: {
                    $id: 5,
                    $name: 'John',
                    surname: 'Doe',
                    gender: 'man',
                    $phone: '0123456789',
                    $password: '123456789',
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
                name: 'Jane',
                surname: 'Smith',
                gender: 'man',
                phone: '0987654321',
                password: '$2b$04$g4415yNFT4BGk8aoxufQpuNYX5byukyoJjdzJvGuMnSTf4r2p6lga',
                email: 'jane.smith@example.com',
                floor: 2,
                room: 10,
                role: 'user',
                avatar: ''
            }
          } */
  }

  async deleteUser(req, res) {
    try {
      const id = req.params.id;
      const user = await db.query('SELECT * FROM users WHERE id = $1', [id]);
      if (user.rows[0]) {
        await db.query('DELETE FROM users WHERE id = $1', [id]);
        return res.status(200).json('Видалено');
      } else {
        return res.status(400).json('Такого користувача не існує');
      }
    } catch (error) {
      return res
        .status(500)
        .json('Не вдалось виконати запит, спробуйте пізніше');
    }

    // #swagger.tags = ['Users']
    // #swagger.summary = 'Delete a user'
    // #swagger.description = 'Deletes a user by user id'
    // #swagger.parameters['id'] = { description: 'User id' }
    // #swagger.responses[200] = { description: 'Successful response' }
  }
}

module.exports = new UserController();
