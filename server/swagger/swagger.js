const swagger_autogen = require('swagger-autogen')();
const outputFile = './swagger/swagger_autogen.json';
const endpointsFiles = ['./routes/user.js'];

const doc = {
    info: {
        version: '1.0.0',
        title: 'API',
        description: 'API for Counting-house',
    },
    host: 'localhost:3000',
    basePath: '/',
    schemes: ['http'],
};


swagger_autogen(outputFile, endpointsFiles, doc)

module.exports = swagger_autogen;