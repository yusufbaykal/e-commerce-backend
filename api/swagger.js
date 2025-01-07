const swaggerJsDoc = require('swagger-jsdoc');
const path = require('path');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'E-Commerce API',
      version: '1.0.0',
      description: 'API documentation for E-Commerce application',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
    components: {
      securitySchemes: {
        Bearer: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'JWT Bearer token authentication',
        },
      },
      schemas: {
        Error: {
          type: 'object',
          properties: {
            status: {
              type: 'integer',
              example: 400
            },
            message: {
              type: 'string',
              example: 'Error message'
            }
          }
        },
        Product: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            price: { type: 'number' },
            description: { type: 'string' },
            category: { type: 'string' },
            category_id: { type: 'string' },
            stock: { type: 'integer' },
            seller_id: { type: 'string' }
          }
        },
        Order: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            user_id: { type: 'string' },
            status: {
              type: 'string',
              enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled']
            },
            items: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  product_id: { type: 'string' },
                  quantity: { type: 'integer' },
                  price: { type: 'number' }
                }
              }
            }
          }
        },
        Payment: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            user_id: { type: 'string' },
            order_id: { type: 'string' },
            amount: { type: 'number' },
            currency: {
              type: 'string',
              enum: ['USD', 'EUR', 'TRY']
            },
            status: {
              type: 'string',
              enum: ['pending', 'completed', 'failed', 'refunded']
            },
            payment_method: {
              type: 'string',
              enum: ['credit_card', 'debit_card', 'bank_transfer', 'digital_wallet']
            }
          }
        }
      }
    },
    security: [
      {
        Bearer: [],
      },
    ],
  },
  apis: ['./api/Docs/*.yaml'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = swaggerDocs; 