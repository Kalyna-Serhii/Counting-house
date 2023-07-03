const db = require('../db')
class UserController {
    async createUser(req, res) {
        const {name, surname, phone, password, email, floor, room, role} = req.body
        const newUser = await db.query(`INSERT INTO users
        (name, surname, phone, password, email, floor, room, role) values ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
            [name, surname, phone, password, email, floor, room, role])
        res.json(newUser.rows[0])
    }

    async getUsers(req, res) {
        const users = await db.query('SELECT * FROM users')
        res.json(users.rows)
    }

    async getUserById(req, res) {
        const id = req.params.id
        const user = await db.query('SELECT * FROM users WHERE id = $1', [id])
        res.json(user.rows[0])
    }

    async updateUser(req, res) {
        const {id, name, surname, phone, password, email, floor, room, role} = req.body
        const user = await db.query('UPDATE users set name = $2, surname = $3, phone = $4, password = $5, email = $6,' +
            'floor = $7, room = $8, role = $9 WHERE id = $1 RETURNING *',
            [id, name, surname, phone, password, email, floor, room, role])
        res.json(user.rows[0])
    }

    async deleteUser(req, res) {
        const id = req.params.id
        const user = await db.query('DELETE FROM users WHERE id = $1', [id])
        res.json(user.rows[0])
    }
}

module.exports = new UserController()
