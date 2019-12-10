module.exports = () => {
    const mongoose = require('mongoose');

    // mongoose.connect('mongodb://localhost:27017/wbdv-f19-team18-db-mongo');
    mongoose.connect('mongodb://heroku_4dwgh6wb:aj8jihr203uglpp7ivr8f5f581@ds353358.mlab.com:53358/heroku_4dwgh6wb');
};