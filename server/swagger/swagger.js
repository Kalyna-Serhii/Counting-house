const generateSwagger = require('swagger-autogen')();
const outputFile = './swagger_autogen.json';
const endpointsFiles = ['../routes/user.js'];

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

generateSwagger(outputFile, endpointsFiles, doc)
    .then(() => {
        require('../app');
    })
    .catch((err) => {
        console.error(err);
    });

// module.exports = generateSwagger