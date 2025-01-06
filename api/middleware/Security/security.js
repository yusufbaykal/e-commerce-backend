const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');


const limiter = rateLimit({
    max: 100, 
    windowMs: 15 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in 15 minutes!'
});


const corsOptions = {
    origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Range', 'X-Content-Range'],
    credentials: true,
    maxAge: 3600
};

const setupSecurity = (app) => {

    app.use(helmet());


    app.use(cors(corsOptions));


    app.use('/api/', limiter);


    app.use(mongoSanitize());


    app.use(xss());


    app.use(helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", 'data:', 'https:'],
        },
    }));


    app.use(helmet.frameguard({ action: 'deny' }));

    app.use(helmet.hsts({
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true
    }));
};

module.exports = setupSecurity; 