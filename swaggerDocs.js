const swaggerJsDoc = require('swagger-jsdoc');
const path = require('path');

const swaggerOptions = {
  definition: {},
  apis: ['./routes/*.js', path.join(__dirname, '/api-docs.yaml')],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = swaggerDocs;
