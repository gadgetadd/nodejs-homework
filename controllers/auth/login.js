const { User } = require('../../models/user');

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !user.comparePassword(password)) {
        res.status(401);
        throw new Error("Email or password is wrong");
    };
    if (!user.verify ) {
        res.status(401);
        throw new Error("Email is not verified");
    };
    const token = user.signToken();
    await User.findByIdAndUpdate(user._id, { token });
    res.json({
        token,
        user: {
            email: user.email,
            subscription: user.subscription,
            avatarURL: user.avatarURL
        }
    })
};

module.exports = login;

