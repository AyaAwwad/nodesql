const { createLogger, format, transports } = require('winston');

const login = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp(),
        format.json()
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'combined.log' }),
        new transports.File({ filename: 'error.log', level: 'error' })
    ]
});

module.exports = login;
