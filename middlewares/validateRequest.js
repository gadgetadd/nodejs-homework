const createError = require('../helpers/createError')

const validateRequest = (schema) => {
    return ((req, _, next) => {
        const { error } = schema.validate(req.body);
        if (error) next(createError(400, error.message));
        next();
    })
}

module.exports = validateRequest;