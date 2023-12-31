const { body } = require('express-validator');
const message = require('../helpers/message');
const util = require('util')

var options={
    username:{
        min: 0,
        max : 800
    },
    password:{
        minLength: 0,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    },
    roles:['admin','user','publisher']
}

module.exports = {
    validator: function () {
        return [
            body('userName', util.format(message.size_string_message,'userName',
            options.username.min, options.username.max)).isLength(options.username),
            body('email', 'email phai dung dinh dang').isEmail(),
            body('password', 'password phai la password manh').isStrongPassword(options.password),
            body('role', 'role không hop le').isIn(options.roles)
        ]
    },
}