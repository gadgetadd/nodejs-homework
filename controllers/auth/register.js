const { User } = require('../../models/user');
const { createError } = require('../../helpers');

const register = async (req, res, next) => {
    const { email } = req.body;
    const existentUser = await User.findOne({ email });
    if (existentUser) next(createError(409, "Email in use"));
    const newUser = await User.create(req.body);
    res.status(201).json({
        user: {
            email: newUser.email,
            subscription: newUser.subscription
        }
    })
};

module.exports = register;

