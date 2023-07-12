const db = require('../db');
const userValidation = require('../validations/user');
class UserController {
  async getUsers(req, res) {
    const users = await db.query('SELECT * FROM users');
    res.json(users.rows);
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
                    phone: '+380123456789',
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
                    phone: '+380987654321',
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
    const { error } = userValidation(req.body);
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
      return res.status(400).json({ error: error.message });
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
                    $gender: 'man',
                    $phone: '+380123456789',
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
                phone: '+380123456789',
                password: '123456789',
                email: 'john.doe@example.com',
                floor: 5,
                room: 34,
                role: 'admin',
                avatar: ''
            }
        } */
  }

  async getUserById(req, res) {
    const id = req.params.id;
    const user = await db.query('SELECT * FROM users WHERE id = $1', [id]);
    res.json(user.rows[0]);
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
                phone: '+380123456789',
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
    const { error } = userValidation(req.body);
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
      if (!role) {
        role = 'user';
      }
      const user = await db.query(
        'UPDATE users set name = $2, surname = $3, gender=$4, phone = $5, password = $6,' +
          'email = $7, floor = $8, room = $9, role = $10, avatar = $11 WHERE id = $1 RETURNING *',
        [
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
        ]
      );
      res.json(user.rows[0]);
    } catch (error) {
      console.log(error.message);
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
                    $gender: 'man',
                    $phone: '+380123456789',
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
                phone: '+380987654321',
                password: '123456789',
                email: 'jane.smith@example.com',
                floor: 2,
                room: 10,
                role: 'user',
                avatar: ''
            }
          } */
  }

  async deleteUser(req, res) {
    const id = req.params.id;
    const user = await db.query('DELETE FROM users WHERE id = $1', [id]);
    res.json(user.rows[0]);
    // #swagger.tags = ['Users']
    // #swagger.summary = 'Delete a user'
    // #swagger.description = 'Deletes a user by user id'
    // #swagger.parameters['id'] = { description: 'User id' }
    // #swagger.responses[200] = { description: 'Successful response' }
  }
}

module.exports = new UserController();
