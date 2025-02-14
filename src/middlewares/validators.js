const { body } = require("express-validator");

const Validators = {
    email: body('email').notEmpty().trim().isEmail().withMessage('Invalid email'),
    password: body('password').notEmpty().trim().isStrongPassword({
        minLength: 10,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }).withMessage('Password is too weak'),
}

module.exports = Validators;