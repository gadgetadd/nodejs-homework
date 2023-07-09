const { User } = require('../../models/user');

const verifyEmail = async (req, res) => {
    const { verificationToken } = req.params;
    const user = await User.findOne({ verificationToken });
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    };
    await User.findByIdAndUpdate(user._id, { verify: true, verificationToken: null });
    res.json({
        message: 'Verification successful'
    })
};

module.exports = verifyEmail;
