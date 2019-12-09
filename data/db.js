module.exports = () => {
    const mongoose = require('mongoose');
    const dbName = 'wbdv-f19-team18-db-mongo';
    let connectionString = 'mongodb://localhost:27017/';
    connectionString += dbName;

    mongoose.connect('mongodb://heroku_4dwgh6wb:aj8jihr203uglpp7ivr8f5f581@ds353358.mlab.com:53358/heroku_4dwgh6wb');
};