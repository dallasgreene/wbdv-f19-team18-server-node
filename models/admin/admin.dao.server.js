const adminSchema = require('./admin.schema.server');
const userModel = require('../user/user.dao.server');
const adminModel = userModel.discriminator('AdminModel', adminSchema);

module.exports = adminModel;