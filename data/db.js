module.exports = () => {
    const mongoose = require('mongoose');
    const dbName = 'wbdv-f19-team18-db-mongo';
    let connectionString = 'mongodb://localhost/';
    connectionString += dbName;
    
    mongoose.connect(connectionString);
};