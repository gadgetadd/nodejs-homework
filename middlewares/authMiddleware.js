const jwt = require("jsonwebtoken");
const { User } = require("../models/user");

const { SECRET_KEY } = process.env;

const authMiddleware = async (req, res, next) => {
    try {
        const { authorization = "" } = req.headers;
        const [bearer, token] = authorization.split(" ");
        if (bearer !== "Bearer") {
            res.status(401)
            throw new Error("Not authorized")
        };
        const { id } = jwt.verify(token, SECRET_KEY);
        const user = await User.findById(id);
        if (!user || !user.token || user.token !== token) {
            res.status(401)
            throw new Error("Not authorized")
        };
        req.user = user;
        next();
    }
    catch {
        res.status(401).json({ message: "Not authorized" })
    }
};

module.exports = authMiddleware;