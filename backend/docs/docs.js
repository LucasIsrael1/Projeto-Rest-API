const swaggerjsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        servers: [
            {
                url: 'http://localhost:3000/',
            },
        ],
    },
    apis: ['./docs/*.yaml'],
}

const specs = swaggerjsdoc(options);
module.exports = specs;