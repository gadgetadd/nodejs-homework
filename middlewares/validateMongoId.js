const { isValidObjectId } = require('mongoose');
const { createError } = require('../helpers');

const validateMongoId = (req, _, next) => {    
        const { contactId } = req.params;    
        if (!isValidObjectId(contactId)) next(createError(400, `${contactId} is not valid ID`));
        next();  
};

module.exports = validateMongoId;