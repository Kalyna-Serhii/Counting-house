const express = require('express')
const cors = require('cors')
const swaggerUI = require('swagger-ui-express')
// const swaggerAutogen = require('./swagger/swagger')
// const swaggerDocument = require('./swagger/api.json')
const swaggerDocument = require('./swagger/swagger_autogen.json')
const userRouter = require('./routes/user')
// let swaggerDocument = {};
// const generateSwagger = require('./swagger/swagger');
// generateSwagger();

const app = express()
const corsOptions = {
    origin: 'http://localhost:8080',
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));

// swaggerAutogen

const host = '127.0.0.1'
const port = 3000

app.use(express.json())
app.use('/api', userRouter)
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))

app.listen(port, () => {
    console.log(`Server listens http://${host}:${port}`)
})

