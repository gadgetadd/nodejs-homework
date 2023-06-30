const { User } = require('../../models/user');
const { createError } = require('../../helpers');

const login = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !user.comparePassword(password)) next(createError(401, "Email or password is wrong"));
    const token = user.signToken();
    await User.findByIdAndUpdate(user._id, { token });
    res.json({
        token,
        user: {
            email: user.email,
            subscription: user.subscription
        }
    })
};

module.exports = login;

