const { Contact } = require('../models/contacts')
const createError = require('../helpers/createError')

const deleteById = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const result = await Contact.findByIdAndRemove(contactId);
        if (!result) next(createError(404, "Not found"));
        res.json({
            message: "contact deleted"
        })
    } catch (error) {
        next(error)
    }
}

module.exports = deleteById

