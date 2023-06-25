const { Contact } = require('../../models/contact');
const { createError } = require('../../helpers');

const getById = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const result = await Contact.findById(contactId);
        if (!result) next(createError(404, "Not found"));
        res.json(result);
    } catch (error) {
        next(error)
    }
};

module.exports = getById;

