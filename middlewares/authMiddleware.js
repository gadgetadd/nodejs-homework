const jwt = require("jsonwebtoken");
const { createError } = require('../helpers');
const { User } = require("../models/user");

const { SECRET_KEY } = process.env;

const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) next(createError(401));
    try {
        const { id } = jwt.verify(token, SECRET_KEY);
        const user = await User.findById(id);
        if (!user || !user.token || user.token !== token) next(createError(401));
        req.user = user;
        next();
    }
    catch {
        next(createError(401));
    }
};

module.exports = authMiddleware;