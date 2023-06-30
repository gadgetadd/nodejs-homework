const { Contact } = require('../../models/contact');
const { createError } = require('../../helpers');

const deleteById = async (req, res, next) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndRemove(contactId);
    if (!result) next(createError(404, "Not found"));
    res.json({
        message: "contact deleted"
    })
};

module.exports = deleteById;

