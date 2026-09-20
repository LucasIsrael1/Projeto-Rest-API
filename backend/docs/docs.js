const swaggerjsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        servers: [
            {
                url: 'https://projeto-rest-api.onrender.com/',
            },
        ],
    },
    apis: ['./docs/*.yaml'],
}

const specs = swaggerjsdoc(options);
module.exports = specs;