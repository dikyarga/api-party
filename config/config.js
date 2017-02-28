const dotenv = require('dotenv').config();

module.exports = {
    "development": {
        "username": process.env.DB_USERNAME,
        "password": "dikyarga",
        "database": "auth",
        "host": "127.0.0.1",
        "dialect": "postgres"
    }
}
