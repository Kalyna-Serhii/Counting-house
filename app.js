const express = require('express')
const path = require('path')
const app = express()
const YAML = require('yamljs')
const swaggerUI = require('swagger-ui-express')
const host = '127.0.0.1'
const port = 3000
const swaggerDocument = YAML.load('swagger/api.yaml')

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))

app.listen(port, () => {
    console.log(`Server listens http://${host}:${port}`)
})

// const User = require("./user")
