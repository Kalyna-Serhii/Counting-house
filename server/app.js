const express = require('express')
const cors = require('cors')
const swaggerUI = require('swagger-ui-express')
// const swaggerAutogen = require('./swagger/swagger')
// const swaggerDocument = require('./swagger/api.json')

const userRouter = require('./routes/user')


require('./swagger/swagger');


const app = express()
const corsOptions = {
    origin: 'http://localhost:8080',
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));


const host = '127.0.0.1'
const port = 3000
const swaggerDocument = require('./swagger/swagger_autogen.json')
app.use(express.json())
app.use('/api', userRouter)
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))

app.listen(port, () => {
    console.log(`Server listens http://${host}:${port}`)
})

// const outputFile = require('./swagger/swagger')
// const endpointsFiles = require('./swagger/swagger')
// const doc = require('./swagger/swagger')

// generateSwagger(outputFile, endpointsFiles, doc);


// const swaggerDocument = require('./swagger/swagger_autogen.json')


