const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { User } = require('../../models/user');

const { createError } = require('../../helpers');
const { SECRET_KEY } = process.env;

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) next(createError(401, "Email or password is wrong"));

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) next(createError(401, "Email or password is wrong"));

        const payload = { id: user._id };
        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1d' })
        await User.findByIdAndUpdate(user._id, { token });
        res.json({ token })

    } catch (error) {
        next(error)
    }
};

module.exports = login;

