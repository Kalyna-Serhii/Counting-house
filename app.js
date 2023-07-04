const host = '127.0.0.1'
const port = 3000
const express = require('express')
const app = express()
const YAML = require('yamljs')
const swaggerUI = require('swagger-ui-express')
const swaggerDocument = YAML.load('swagger/api.yaml')
const userRouter = require('./routes/user')


app.use(express.json())

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))
app.use('/api', userRouter)


app.listen(port, () => {
    console.log(`Server listens http://${host}:${port}`)})
