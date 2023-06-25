const jwt = require("jsonwebtoken");
const { createError } = require('../helpers');
const { User } = require("../models/user");

const { SECRET_KEY } = process.env;

const authMiddleware = async (req, res, next) => {
    const { authorization = '' } = req.headers;
    const [bearer, token] = authorization.split(' ');
    if (bearer !== "Bearer") next(createError(401));
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