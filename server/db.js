const Pool = require('pg').Pool
const pool = new Pool({
    user: 'admin',
    password: 'root',
    host: 'localhost',
    port: 5432,
    database: 'postgres'
})

pool.connect(err => {
    if(err) {
        console.error(err)
    }
})

module.exports = pool