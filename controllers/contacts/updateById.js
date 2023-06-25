const { Contact } = require('../../models/contact');
const { createError } = require('../../helpers');

const updateById = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const result = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });
        if (!result) next(createError(404, "Not found"));
        res.json(result);
    } catch (error) {
        next(error)
    }
};

module.exports = updateById;


