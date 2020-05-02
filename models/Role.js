const {Schema, model} = require('mongoose');

const RoleSchema = Schema({
    guild: String,
    role: String
});

module.exports = model('Role', RoleSchema);