const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger_autogen.json';
const endpointsFiles = ['../routes/user'];

const doc = {
  info: {
    version: '1.0.0',
    title: 'API',
    description: 'API for Counting-house',
  },
};

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require('../../app');
});
