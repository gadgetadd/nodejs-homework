const { User } = require('../../models/user');
const { sendMail } = require('../../helpers');

const resendEmail = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    };
    if (user.verify) {
        res.status(400);
        throw new Error("Verification has already been passed");
    };
    await sendMail({
        to: email,
        subject: "Verify your email",
        html: `<a target="_blank" href="${process.env.BASE_URL}/api/users/verify/${user.verificationToken}">
        Click to verify
        </a>`,
    });
    res.json({
        "message": "Verification email sent"
    })
};

module.exports = resendEmail;
