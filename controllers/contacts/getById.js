const { Contact } = require('../../models/contact');

const getById = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findById(contactId);
    if (!result) {
        res.status(404);
        throw new Error("Not found");
    };
    res.json(result);
};

module.exports = getById;

