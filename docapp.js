const docapp = require('express')();
var swaggerJSDoc = require('swagger-jsdoc');
var swaggerUi = require('swagger-ui-express');
//var swaggerDocument = require('./docs/swagger.json');

const swaggerDefinition = {
    info: {
      title: 'C-Lightning-REST',
      version: '0.1.1',
      description: 'REST API suite for C-Lightning',
    },
    host: 'localhost:4001',
    basePath: '/v1',
    securityDefinitions: {
      bearerAuth: {
        type: 'apiKey',
        name: 'Authorization',
        scheme: 'bearer',
        in: 'header',
      },
    },
  };

const options = {
    swaggerDefinition,
    apis: ['./controllers/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

docapp.get('/swagger.json', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});

//Route for swagger documentation
docapp.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = docapp;