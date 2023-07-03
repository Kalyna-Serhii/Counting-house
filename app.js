const host = '127.0.0.1'
const port = 3000
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const YAML = require('yamljs')
const swaggerUI = require('swagger-ui-express')
const swaggerDocument = YAML.load('swagger/api.yaml')
const userRouter = require('./routes/user')
const authRoutes = require('./routes/auth')


app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))
app.use('/api', authRoutes)
app.use('/api', userRouter)


app.listen(port, () => {
    console.log(`Server listens http://${host}:${port}`)})
