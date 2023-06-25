const bcrypt = require('bcrypt');
const { User } = require('../../models/user');
const { createError } = require('../../helpers');

const register = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) next(createError(409, "Email in use"));
        const hash = await bcrypt.hash(password, 10)
        const registeredUser = await User.create({ ...req.body, password: hash });
        res.status(201).json(registeredUser)
    } catch (error) {
        next(error)
    }
};

module.exports = register;

