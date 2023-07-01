const { User } = require('../../models/user');


const register = async (req, res) => {
    const { email } = req.body;
    const existentUser = await User.findOne({ email });
    if (existentUser) {
        res.status(409);
        throw new Error("Email in use");
    };
    const newUser = await User.create(req.body);
    res.status(201).json({
        user: {
            email: newUser.email,
            subscription: newUser.subscription
        }
    })
};

module.exports = register;

