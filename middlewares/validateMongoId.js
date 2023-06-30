const { isValidObjectId } = require('mongoose');

const validateMongoId = (req, res, next) => {
        const { contactId } = req.params;
        if (!isValidObjectId(contactId)) {
                res.status(400);
                throw new Error(`${contactId} is not valid ID`);
        };
        next();
};

module.exports = validateMongoId;