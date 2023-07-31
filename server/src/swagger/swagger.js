const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swaggerAutogen.json';
const endpointsFiles = ['../routes/*'];

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
