const gravatar = require('gravatar');
const { nanoid } = require('nanoid');

const { User } = require('../../models/user');
const { sendMail } = require('../../helpers');

const register = async (req, res) => {
    const { email } = req.body;
    const existentUser = await User.findOne({ email });
    if (existentUser) {
        res.status(409);
        throw new Error("Email in use");
    };
    const avatarURL = gravatar.url(email, { s: '250' });
    const verificationToken = nanoid();
    const newUser = await User.create({ ...req.body, avatarURL, verificationToken });
    await sendMail({
        to: email,
        subject: "Verify your email",
        html: `<a target="_blank" href="${process.env.BASE_URL}/api/users/verify/${verificationToken}">
        Click to verify
        </a>`,
    })
    res.status(201).json({
        user: {
            email: newUser.email,
            subscription: newUser.subscription,
            avatarURL: newUser.avatarURL
        }
    });
};

module.exports = register;

